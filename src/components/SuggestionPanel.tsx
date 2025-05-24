import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { inferSkinType } from "@/app/suggestions/skintypeMock";

const supabaseUrl = "https://rvyutrqbdhqktjgenvkt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXV0cnFiZGhxa3RqZ2Vudmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMTQ0ODIsImV4cCI6MjA2MzU5MDQ4Mn0.3ppdtSlO_HU1fiq1FL3tPVLKSzKELwUX_ewYusOfGTE";
const supabase = createClient(supabaseUrl, supabaseKey);

const CATEGORIES = [
  "All",
  "Cleanser",
  "Treatment",
  "Moisturizer",
  "Toner",
  "Sunscreen",
];

export default function SuggestionPanel({
  skinType,
  acneTypes,
  acneCounts,
}: {
  skinType: string;
  acneTypes: string[];
  acneCounts: number[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Xác định loại da dựa trên loại mụn nếu có
  let effectiveSkinType = skinType;
  if (acneTypes.length > 0 && acneCounts.length > 0) {
    const acneStats: Record<string, number> = {};
    acneTypes.forEach((type, index) => {
      if (acneCounts[index]) {
        acneStats[type] = acneCounts[index];
      }
    });
    const inferredSkinType = inferSkinType(acneStats);
    if (inferredSkinType) effectiveSkinType = inferredSkinType;
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        if (!data) return;
        let products = data.filter((product: any) =>
          product.for_skin_type?.includes(effectiveSkinType)
        );
        let filtered = products;
        if (selectedCategory !== "All") {
          filtered = filtered.filter(
            (product: any) => product.category === selectedCategory
          );
        }
        setFilteredProducts(filtered);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveSkinType, selectedCategory]);

  return (
    <Card className="max-w-3xl w-full mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Personalized Cosmetic Recommendations
        </CardTitle>
        <p className="text-muted-foreground max-w-2xl mx-auto text-center mt-2">
          Based on your AI skin analysis, we've curated the best products for
          your skin type.
        </p>
      </CardHeader>
      <CardContent>
        <Alert className="flex flex-col items-center justify-center text-center bg-primary/5 border-primary/20 mb-6">
          <AlertTitle>Your Skin Profile</AlertTitle>
          <AlertDescription>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <div className="flex items-center gap-2 justify-center">
                <span className="font-medium">Skin Type:</span>
                <Badge className="capitalize">{effectiveSkinType}</Badge>
              </div>
            </div>
          </AlertDescription>
        </Alert>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Recommended{" "}
              {selectedCategory === "All" ? "Products" : selectedCategory}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2 text-red-500">{error}</h3>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <Button onClick={() => setSelectedCategory("All")}>
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.img || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      <span className="font-semibold">Type of skin:</span>{" "}
                      {product.for_skin_type.join(", ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Ingredients:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.composition.map((ingredient: string) => (
                          <Badge key={ingredient} className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Brand Store
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
