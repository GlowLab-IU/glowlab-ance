"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { mintNFT } from "@/libs/shyft";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductMeta {
  id: string;
  name: string;
  image: string;
  metadata_uri: string;
  merkle_tree: string;
  creator: string;
}

export default function SuggestionsPage() {
  const searchParams = useSearchParams();
  const skinType = searchParams?.get("skin") || "";
  const { publicKey, connected, sendTransaction } = useWallet();
  const connection = new Connection("https://api.devnet.solana.com");
  const [products, setProducts] = useState<ProductMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?skin=${encodeURIComponent(skinType)}`
        );
        if (!res.ok) throw new Error("Failed to load products");
        const list: ProductMeta[] = await res.json();
        setProducts(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [skinType]);

  const claim = async (product: ProductMeta) => {
    if (!publicKey) return;
    try {
      const response = await mintNFT({
        network: "devnet",
        creator_wallet: product.creator,
        metadata_uri: product.metadata_uri,
        merkle_tree: product.merkle_tree,
        receiver: publicKey.toBase58(),
        is_delegate_authority: false,
      });
      // Use response.value instead of response.result
      const encodedTx = response.value.encoded_transaction;
      const tx = Transaction.from(Buffer.from(encodedTx, "base64"));
      const sig = await sendTransaction(tx, connection);
      await connection.confirmTransaction(sig, "confirmed");
      alert("NFT claimed successfully!");
    } catch (err: any) {
      console.error(err);
      alert("Claim failed: " + err.message);
    }
  };

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
          {products.map((p) => (
            <Card key={p.id} className="p-4">
              <img
                src={p.image}
                alt={p.name}
                className="rounded mb-2 w-full object-cover h-48"
              />
              <CardHeader className="p-0">
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Ingredients: {p.image ? p.image : ""}
                </p>
                <Button disabled={!connected} onClick={() => claim(p)}>
                  Claim NFT
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
