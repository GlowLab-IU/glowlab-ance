"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  forSkinType: ("oily" | "dry" | "sensitive" | "combination")[];
  description: string;
  link: string;
}

// Mock Data
const products: Product[] = [
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

export default function SuggestionPage() {
  const searchParams = useSearchParams();
  const skinType = searchParams?.get("acneType") ?? "oily";

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const result = products.filter((p) =>
      p.forSkinType.includes(skinType as any)
    );
    setFilteredProducts(result);
  }, [skinType]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recommended Products for{" "}
        <span className="text-blue-500">{skinType}</span> Skin
      </h1>
      <Separator className="my-6" />
      {filteredProducts.length == 0 ? (
        <p className="text-center text-muted-foreground">
          No products found for this skin type.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <CardHeader className="text-center">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2"
                >
                  View Product
                </a>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
