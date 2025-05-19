export interface Product {
  id: string;
  name: string;
  forSkinType: string[];
  description: string;
  link: string;
}

export const products: Product[] = [
  {
    id: "effaclar-gel",
    name: "Effaclar Purifying Foaming Gel",
    forSkinType: ["oily", "combination"],
    description: "Cleanser for oily and acne-prone skin",
    link: "https://www.laroche-posay.us/effaclar-gel",
  },
  {
    id: "toleriane-dermo",
    name: "Toleriane Dermo-Cleanser",
    forSkinType: ["sensitive", "dry"],
    description: "Gentle cleanser for sensitive skin",
    link: "https://www.laroche-posay.us/toleriane-dermo-cleanser",
  },
  {
    id: "lipikar-syndet",
    name: "Lipikar Syndet AP+ Wash Cream",
    forSkinType: ["dry", "sensitive"],
    description: "Cream wash for dry and irritated skin",
    link: "https://www.laroche-posay.us/lipikar-syndet",
  },
  {
    id: "effaclar-medicated",
    name: "Effaclar Medicated Gel Cleanser",
    forSkinType: ["oily"],
    description: "Acne treatment gel cleanser",
    link: "https://www.laroche-posay.us/effaclar-medicated",
  },
];
