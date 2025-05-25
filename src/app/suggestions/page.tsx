"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { Product, products } from "./mock-products";

function SuggestionContent() {
  const searchParams = useSearchParams();
  const skinType = (searchParams?.get("skinType") ?? "oily") as
    | "oily"
    | "dry"
    | "sensitive"
    | "combination";

  const compositionParam = searchParams?.get("composition") ?? "[]";
  const validCompositions = JSON.parse(compositionParam) as string[];

  const [prioritizedProducts, setPrioritizedProducts] = useState<Product[]>([]);
  const [nonPrioritizedProducts, setNonPrioritizedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filteredBySkin = products.filter((p) => p.forSkinType.includes(skinType));

    const prioritized: Product[] = [];
    const nonPrioritized: Product[] = [];

    filteredBySkin.forEach((product) => {
      if (product.composition.some((comp) => validCompositions.includes(comp))) {
        prioritized.push(product);
      } else {
        nonPrioritized.push(product);
      }
    });

    setPrioritizedProducts(prioritized);
    setNonPrioritizedProducts(nonPrioritized);
  }, [skinType, validCompositions]);

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={product.img}
          alt={product.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
          }}
        />
      </div>
      <CardHeader>
        <h2 className="text-xl font-semibold">{product.name}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <p className="text-xs font-medium mb-2">
          Composition: {product.composition.join(", ")}
        </p>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-2 block"
        >
          View Product
        </a>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recommended Products for{" "}
        <span className="text-blue-500">{skinType}</span> Skin
      </h1>

      {prioritizedProducts.length === 0 && nonPrioritizedProducts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No products found for this skin type.
        </p>
      ) : (
        <>
          {prioritizedProducts.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Recommended Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {prioritizedProducts.map(renderProductCard)}
              </div>
            </>
          )}

          {nonPrioritizedProducts.length > 0 && (
            <>
              <Separator className="my-8" />
              <h2 className="text-2xl font-semibold mb-4">Other Compatible Products</h2>
              <p className="text-sm text-muted-foreground mb-6">
                These products match your skin type but may not contain the optimal ingredients for your specific concerns.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {nonPrioritizedProducts.map(renderProductCard)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function SuggestionPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <SuggestionContent />
    </Suspense>
  );
}
