"use client";

import { useState } from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { Keypair, SystemProgram, Connection, PublicKey } from "@solana/web3.js";
import idl from "@/idl/skincare_chain.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const programId = new PublicKey("Fg6PaFpoGXkYsidMpWxqSWNujL6jiXAYB44zF8qUjNqz");
const network = "https://api.devnet.solana.com";

export default function RegisterProductPage() {
  const anchorWallet = useAnchorWallet();
  const { connected } = useWallet();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [skinType, setSkinType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    if (!anchorWallet) {
      alert("Please connect wallet");
      return;
    }

    const connection = new Connection(network, "confirmed");
    const provider = new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
    });
    const program = new Program(idl as any, programId, provider);

    const productKeypair = Keypair.generate();

    try {
      await program.methods
        .registerProduct(
          name,
          brand,
          skinType,
          ingredients.split(",").map((i) => i.trim())
        )
        .accounts({
          product: productKeypair.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([productKeypair])
        .rpc();

      setStatus(
        "✅ Product registered on-chain: " + productKeypair.publicKey.toBase58()
      );
    } catch (err) {
      console.error(err);
      setStatus("❌ Registration failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 space-y-4">
      <h2 className="text-xl font-bold">Đăng sản phẩm chăm sóc da</h2>
      <Input
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Thương hiệu"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <Input
        placeholder="Loại da phù hợp (oily, dry,...)"
        value={skinType}
        onChange={(e) => setSkinType(e.target.value)}
      />
      <Input
        placeholder="Thành phần (cách nhau bằng dấu phẩy)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <Button onClick={handleRegister} disabled={!connected}>
        Đăng sản phẩm
      </Button>
      {status && <p className="text-muted-foreground text-sm mt-2">{status}</p>}
    </div>
  );
}
