"use server";

import { Buffer } from "node:buffer";
import { Resend } from "resend";

export type JoinFormState = {
  success: boolean;
  message: string;
  invalidFields?: string[];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedGenders = ["female", "male", "other", "prefer-not-to-say"];

function getString(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function cleanSingleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function safeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._() -]/g, "_");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(day: number, month: number, year: number) {
  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return false;
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));

  const matches =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return matches && date <= new Date();
}

function isPdf(buffer: Buffer) {
  if (buffer.length < 5) {
    return false;
  }

  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

export async function submitApplication(
  _previousState: JoinFormState,
  formData: FormData,
): Promise<JoinFormState> {
  const firstName = getString(formData, "firstName");

  const lastName = getString(formData, "lastName");

  const email = getString(formData, "email");

  const phone = getString(formData, "phone");

  const country = getString(formData, "country");

  const instagram = getString(formData, "instagram");

  const birthDay = Number(getString(formData, "birthDay"));

  const birthMonth = Number(getString(formData, "birthMonth"));

  const birthYear = Number(getString(formData, "birthYear"));

  const gender = getString(formData, "gender");

  const height = Number(getString(formData, "height"));

  const experience = getString(formData, "experience");

  const message = getString(formData, "message");

  const portfolio = formData.get("portfolio");

  const resume = formData.get("resume");

  if (!firstName || !lastName || !email || !phone || !country || !experience) {
    return {
      success: false,
      message: "Please complete all required fields.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      invalidFields: ["email"],
    };
  }

  if (!isValidDate(birthDay, birthMonth, birthYear)) {
    return {
      success: false,
      message: "Please select a valid date of birth.",
      invalidFields: ["birthDay", "birthMonth", "birthYear"],
    };
  }

  if (!allowedGenders.includes(gender)) {
    return {
      success: false,
      message: "Please select a valid gender option.",
      invalidFields: ["gender"],
    };
  }

  if (!Number.isFinite(height) || height < 100 || height > 230) {
    return {
      success: false,
      message: "Please enter a valid height.",
      invalidFields: ["height"],
    };
  }

  if (!(portfolio instanceof File) || portfolio.size === 0) {
    return {
      success: false,
      message: "Please upload your portfolio.",
    };
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return {
      success: false,
      message: "Please upload your resume.",
    };
  }

  if (portfolio.size > MAX_FILE_SIZE || resume.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: "Portfolio and resume must each be 5 MB or smaller.",
    };
  }

  if (
    !portfolio.name.toLowerCase().endsWith(".pdf") ||
    !resume.name.toLowerCase().endsWith(".pdf")
  ) {
    return {
      success: false,
      message: "Portfolio and resume must be PDF files.",
    };
  }

  const portfolioBuffer = Buffer.from(await portfolio.arrayBuffer());

  const resumeBuffer = Buffer.from(await resume.arrayBuffer());

  // Don't rely only on the filename.
  if (!isPdf(portfolioBuffer) || !isPdf(resumeBuffer)) {
    return {
      success: false,
      message: "One of the uploaded documents is not a valid PDF.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  const applicationEmail = process.env.NFK_APPLICATION_EMAIL;

  const fromEmail = process.env.NFK_FROM_EMAIL;

  if (!apiKey || !applicationEmail || !fromEmail) {
    console.error("Missing Resend environment variables.");

    return {
      success: false,
      message: "The application service is not configured yet.",
    };
  }

  const resend = new Resend(apiKey);

  const dateOfBirth =
    `${String(birthDay).padStart(2, "0")}/` +
    `${String(birthMonth).padStart(2, "0")}/` +
    `${birthYear}`;

  const applicantName = cleanSingleLine(`${firstName} ${lastName}`);

  const emailBody = [
    "NEW NFK APPLICATION",
    "",
    `Name: ${applicantName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Country: ${country}`,
    `Instagram: ${instagram || "Not provided"}`,
    `Date of birth: ${dateOfBirth}`,
    `Gender: ${gender}`,
    `Height: ${height} cm`,
    "",
    "EXPERIENCE",
    experience,
    "",
    "ABOUT",
    message || "Not provided",
    "",
    "Portfolio and resume are attached.",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [applicationEmail],
      subject: `New NFK application — ${applicantName}`,
      text: emailBody,
      attachments: [
        {
          filename: safeFilename(portfolio.name),
          content: portfolioBuffer,
        },
        {
          filename: safeFilename(resume.name),
          content: resumeBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        success: false,
        message: "We couldn't send your application. Please try again.",
      };
    }

    return {
      success: true,
      message:
        "Application submitted successfully. Thank you for contacting NFK.",
    };
  } catch (error) {
    console.error("Application error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
