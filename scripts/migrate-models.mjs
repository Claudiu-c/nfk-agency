import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PROJECT_ROOT = process.cwd();

const SOURCE_DATA_FILE = path.join(
  PROJECT_ROOT,
  "scripts",
  "data",
  "nfk-models-draft.json",
);

const MODEL_GENDERS_FILE = path.join(
  PROJECT_ROOT,
  "scripts",
  "data",
  "model-genders.json",
);

const SOURCE_IMAGES_DIR = path.resolve(PROJECT_ROOT, "../images-original");

const OUTPUT_IMAGES_DIR = path.join(PROJECT_ROOT, "public", "images", "models");

const OUTPUT_DATA_FILE = path.join(
  PROJECT_ROOT,
  "src",
  "data",
  "models.generated.ts",
);

const onlySlug = process.argv[2];

const rawModels = JSON.parse(await fs.readFile(SOURCE_DATA_FILE, "utf8"));

const modelGenders = JSON.parse(await fs.readFile(MODEL_GENDERS_FILE, "utf8"));

const validModels = rawModels.filter((model) => {
  const hasName =
    typeof model.name === "string" && model.name.trim().length > 0;

  const hasSlug =
    typeof model.slug === "string" && model.slug.trim().length > 0;

  if (!hasName || !hasSlug) {
    console.warn(
      `Skipping invalid model: ${model.legacyFile ?? "unknown source"}`,
    );

    return false;
  }

  return true;
});

const modelsToProcess = onlySlug
  ? validModels.filter((model) => model.slug === onlySlug)
  : validModels;

if (onlySlug && modelsToProcess.length === 0) {
  throw new Error(`Model "${onlySlug}" was not found.`);
}

for (const model of modelsToProcess) {
  const gender = modelGenders[model.slug];

  if (gender !== "women" && gender !== "men") {
    throw new Error(`Missing or invalid gender for "${model.slug}".`);
  }
}

const generatedModels = [];
const failedImages = [];

let convertedImages = 0;
let skippedImages = 0;

async function getImageDimensions(filePath) {
  const metadata = await sharp(filePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not determine dimensions for ${filePath}`);
  }

  return {
    width: metadata.width,
    height: metadata.height,
  };
}

for (const model of modelsToProcess) {
  console.log(`\nProcessing ${model.name}...`);

  const outputModelDirectory = path.join(OUTPUT_IMAGES_DIR, model.slug);

  await fs.mkdir(outputModelDirectory, {
    recursive: true,
  });

  const gallery = [];

  for (const [index, legacyImagePath] of model.images.entries()) {
    const normalizedPath = legacyImagePath.replaceAll("\\", "/");

    const relativeImagePath = normalizedPath.replace(/^(\.\.\/)+images\//i, "");

    const inputPath = path.join(
      SOURCE_IMAGES_DIR,
      ...relativeImagePath.split("/"),
    );

    const outputFileName = `${String(index + 1).padStart(2, "0")}.webp`;

    const outputPath = path.join(outputModelDirectory, outputFileName);

    const publicImagePath = `/images/models/${model.slug}/${outputFileName}`;

    // ---------------------------
    // EXISTING WEBP
    // ---------------------------

    let outputFileExists = false;

    try {
      const stats = await fs.stat(outputPath);

      outputFileExists = stats.isFile() && stats.size > 0;
    } catch {
      outputFileExists = false;
    }

    if (outputFileExists) {
      try {
        const { width, height } = await getImageDimensions(outputPath);

        gallery.push({
          src: publicImagePath,
          width,
          height,
        });

        skippedImages++;

        console.log(
          `  ↷ Skipped existing: ${outputFileName} (${width}x${height})`,
        );

        continue;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.warn(`  ⚠ Existing WebP is invalid: ${outputPath}`);

        console.warn(`    ${errorMessage}`);

        // Dacă WebP-ul existent este corupt,
        // îl ștergem și încercăm să-l regenerăm.
        await fs.rm(outputPath, {
          force: true,
        });
      }
    }

    // ---------------------------
    // ORIGINAL FILE
    // ---------------------------

    try {
      await fs.access(inputPath);
    } catch {
      console.warn(`  ✗ Missing: ${inputPath}`);

      failedImages.push({
        model: model.name,
        image: legacyImagePath,
        error: "Input file missing",
      });

      continue;
    }

    // ---------------------------
    // CONVERSION
    // ---------------------------

    try {
      await sharp(inputPath, {
        failOn: "none",
      })
        .autoOrient()
        .resize({
          width: 2200,
          height: 3000,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 82,
        })
        .toFile(outputPath);

      const { width, height } = await getImageDimensions(outputPath);

      gallery.push({
        src: publicImagePath,
        width,
        height,
      });

      convertedImages++;

      console.log(`  ✓ ${outputFileName} (${width}x${height})`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      console.warn(`  ✗ Failed: ${inputPath}`);

      console.warn(`    ${errorMessage}`);

      failedImages.push({
        model: model.name,
        image: legacyImagePath,
        error: errorMessage,
      });

      continue;
    }
  }

  if (gallery.length === 0) {
    console.warn(`Skipping ${model.name}: no usable images found.`);

    continue;
  }

  generatedModels.push({
    id: model.slug,
    name: model.name,
    slug: model.slug,
    category: model.category,
    gender: modelGenders[model.slug],

    // Prima fotografie rămâne fotografia principală.
    coverImage: gallery[0].src,

    gallery,

    measurements: model.measurements ?? {},
  });
}

// models.generated.ts este rescris doar când
// procesăm baza completă.
if (!onlySlug) {
  const generatedFile = `import type { Model } from "@/types/model";

export const models = ${JSON.stringify(
    generatedModels,
    null,
    2,
  )} satisfies Model[];
`;

  await fs.mkdir(path.dirname(OUTPUT_DATA_FILE), {
    recursive: true,
  });

  await fs.writeFile(OUTPUT_DATA_FILE, generatedFile, "utf8");

  console.log(`\nGenerated data file: ${OUTPUT_DATA_FILE}`);
}

console.log("\n--------------------------------");
console.log(`Models processed: ${modelsToProcess.length}`);
console.log(`Models with images: ${generatedModels.length}`);
console.log(`Images converted: ${convertedImages}`);
console.log(`Images skipped: ${skippedImages}`);
console.log(`Failed images: ${failedImages.length}`);
console.log("--------------------------------");

if (failedImages.length > 0) {
  console.log("\nFailed images:");

  for (const item of failedImages) {
    console.log(`- ${item.model}: ${item.image}`);

    if (item.error) {
      console.log(`  ${item.error}`);
    }
  }
}

if (onlySlug) {
  console.log("\nSingle-model mode: models.generated.ts was not modified.");
}
