"use client";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { uploadMetadataToPinata, AcneResult } from "@/app/Pinata/pinataUpload";
import { mintNFT } from "@/libs/shyft";
import type { MintNFTRequestBody } from "@/types";
import { Button } from "@/components/ui/button";

interface ClaimButtonProps {
  result: AcneResult;
  onSuccess: () => void;
}

/**
 * Button to claim (mint) the Acne Diagnosis NFT and then call onSuccess.
 */
export const ClaimButton: React.FC<ClaimButtonProps> = ({
  result,
  onSuccess,
}) => {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  const handleClaim = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      // 1. Upload metadata to IPFS via Pinata
      const uri = await uploadMetadataToPinata(result);
      // 2. Mint NFT to user's wallet
      const body: MintNFTRequestBody = {
        network: "devnet", // or "mainnet-beta"
        receiver: publicKey.toBase58(), // recipient wallet address
        uri, // metadata URI
        max_supply: 1,
        seller_fee_basis_points: 0,
        creators: [
          {
            address: "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX",
            share: 100,
          },
        ],
      };
      await mintNFT(body);
      alert("🎉 NFT minted successfully!");
      onSuccess();
      router.push("/result-medical");
    } catch (err: any) {
      console.error("Mint failed:", err);
      alert("Mint NFT failed: " + err.message);
    }
  };

  return (
    <Button onClick={handleClaim} disabled={!connected} size="lg">
      Claim NFT to View Full Report
    </Button>
  );
};
