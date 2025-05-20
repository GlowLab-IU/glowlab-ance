"use client";

import { useState } from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, Idl } from "@project-serum/anchor";
import { Keypair, SystemProgram, Connection, PublicKey } from "@solana/web3.js";
import idlRaw from "@/idl/skincare_chain.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const programId = new PublicKey("Fg6PaFpoGXkYsidMpWxqSWNujL6jiXAYB44f8qUjNqz");
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
      setStatus("❌ Wallet not connected");
      return;
    }

    if (!name || !brand || !skinType || !ingredients) {
      setStatus("❗ Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      setStatus("🔄 Đang chuẩn bị giao dịch...");

      const connection = new Connection(network, "confirmed");
      const provider = new AnchorProvider(connection, anchorWallet, {
        commitment: "confirmed",
      });

      const idl = idlRaw as unknown as Idl;
      const program = new Program(idl, programId, provider);
      const ingredientList = ingredients.split(",").map((i) => i.trim());

      const [productPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("product"),
          anchorWallet.publicKey.toBuffer(),
          Buffer.from(name),
        ],
        programId
      );

      setStatus("📝 Đang ký và gửi giao dịch...");

      const tx = await program.methods
        .registerProduct(name, brand, skinType, ingredientList)
        .accounts({
          product: productPDA,
          user: anchorWallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("✅ Giao dịch thành công:", tx);
      setStatus("✅ Đã đăng sản phẩm! Giao dịch: " + tx);
    } catch (err: any) {
      console.error("❌ Giao dịch thất bại:", err);
      setStatus(
        "❌ Đăng sản phẩm thất bại: " + (err.message || "Unknown error")
      );
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
      {status && (
        <div className="mt-3 p-3 bg-gray-100 rounded text-sm text-gray-800">
          {status}
        </div>
      )}
    </div>
  );
}
