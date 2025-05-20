"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "@/idl/skincare_chain.json";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const programId = new PublicKey("Fg6PaFpoGXkYsidMpWxqSWNujL6jiXAYB44f8qUjNqz");
const network = "https://api.devnet.solana.com";

type ProductAccount = {
  name: string;
  brand: string;
  skin_type: string;
  ingredients: string[];
  authority: PublicKey;
};

export default function SuggestionsPage() {
  const searchParams = useSearchParams();
  const skinType = searchParams?.get("skin");
  const anchorWallet = useAnchorWallet();
  const [products, setProducts] = useState<ProductAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!anchorWallet) return;

    const fetchProducts = async () => {
      try {
        const connection = new Connection(network, "confirmed");
        const provider = new AnchorProvider(connection, anchorWallet, {
          commitment: "confirmed",
        });
        const program = new Program(idl as any, programId, provider);

        const allAccounts = await program.account.product.all();

        const filtered = skinType
          ? allAccounts
              .filter(
                ({ account }) =>
                  (account as ProductAccount).skin_type.toLowerCase() ===
                  skinType.toLowerCase()
              )
              .map(({ account }) => account as ProductAccount)
          : allAccounts.map(({ account }) => account as ProductAccount);

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [anchorWallet, skinType]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Suggested Products
      </h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No products found for this skin type.
        </p>
      ) : (
        <div className="grid gap-4">
          {products.map((product, index) => (
            <Card key={index}>
              <CardHeader>
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Brand: {product.brand} | Skin: {product.skin_type}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ingredients: {product.ingredients.join(", ")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
