export type ModelCategory = "new-faces" | "in-town" | "direct-booking";

export type ModelGender = "women" | "men";

export type ModelImage = {
  src: string;
  width: number;
  height: number;
};

export type Model = {
  id: string;
  name: string;
  slug: string;
  category: ModelCategory;
  gender: ModelGender;

  coverImage: string;
  gallery: ModelImage[];

  measurements?: {
    height?: string;
    bust?: string;
    waist?: string;
    hips?: string;
  };
};
