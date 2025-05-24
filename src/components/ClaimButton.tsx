"use client";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { mintNFT } from "@/libs/shyft";
import type { MintNFTRequestBody } from "@/types";
import { uploadMetadataToPinata, AcneResult } from "@/app/Pinata/pinataUpload";
import { Button } from "@/components/ui/button";

interface ClaimButtonProps {
  result: AcneResult;
  onSuccess: () => void;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({
  result,
  onSuccess,
}) => {
  const { publicKey, connected } = useWallet();

  const handleClaim = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      // 1) Pin metadata via API
      const { uri, ipfsHash } = await uploadMetadataToPinata(result);
      console.log("Pinata URI:", uri, "Hash:", ipfsHash);

      // 2) Mint using ipfs://<hash>
      const body: MintNFTRequestBody = {
        network: "devnet",
        receiver: publicKey.toBase58(),
        uri: `ipfs://${ipfsHash}`,
        max_supply: 1,
        seller_fee_basis_points: 0,
        creators: [
          {
            address: "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX",
            share: 100,
          },
        ],
      };
      console.log("Mint body:", body);

      const res = await mintNFT(body);
      console.log("Mint success:", res);
      alert("🎉 NFT minted!");
      onSuccess();
    } catch (err: any) {
      console.error("Claim failed:", err);
      alert("Mint NFT failed: " + err.message);
    }
  };

  return (
    <Button onClick={handleClaim} disabled={!connected} size="lg">
      Claim NFT to View Full Report
    </Button>
  );
};
