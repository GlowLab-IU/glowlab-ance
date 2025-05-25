"use client";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { upload, registerProductShyft } from "@/libs/shyft";

export default function RegisterProductForm() {
  const wallet = useAnchorWallet();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    ingredients: [{ name: "", concentration: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [txAddress, setTxAddress] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "name" | "concentration"
  ) => {
    const updated = [...product.ingredients];
    updated[index] = { ...updated[index], [field]: e.target.value };
    setProduct((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () =>
    setProduct((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", concentration: "" }],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet?.publicKey) return alert("Please connect your wallet");

    setLoading(true);
    setTxAddress(null);

    try {
      // 1. Build metadata object
      const metadata = {
        name: product.name,
        brand: product.brand,
        ingredients: product.ingredients.map((i) => i.name),
        concentrations: product.ingredients.map((i) =>
          parseFloat(i.concentration)
        ),
      };

      // 2. Upload metadata JSON file to IPFS
      const blob = new Blob([JSON.stringify(metadata)], {
        type: "application/json",
      });
      const file = new File([blob], "product-metadata.json", {
        type: "application/json",
      });
      const uploadRes = await upload(file);
      const cid = uploadRes.result.cid;

      // 3. Write CID on-chain via Shyft
      const address = await registerProductShyft(cid, wallet);
      setTxAddress(address);
    } catch (err) {
      console.error(err);
      alert("Error: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            className="input w-full"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <label className="block font-medium">Brand</label>
          <input
            type="text"
            className="input w-full"
            value={product.brand}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, brand: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <label className="block font-medium">Ingredients</label>
          {product.ingredients.map((ing, idx) => (
            <div key={idx} className="flex space-x-2 mt-2">
              <input
                type="text"
                placeholder="Ingredient"
                className="input flex-1"
                value={ing.name}
                onChange={(e) => handleInputChange(e, idx, "name")}
                required
              />
              <input
                type="number"
                placeholder="%"
                step="0.1"
                className="input w-24"
                value={ing.concentration}
                onChange={(e) => handleInputChange(e, idx, "concentration")}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="mt-2 button">
            Add Ingredient
          </button>
        </div>

        <button type="submit" className="w-full button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {txAddress && (
        <div className="mt-4 bg-green-100 p-3 rounded">
          <p className="font-medium">Data written on-chain at:</p>
          <a
            href={`https://explorer.solana.com/address/${txAddress}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 break-all"
          >
            {txAddress}
          </a>
        </div>
      )}
    </div>
  );
}
