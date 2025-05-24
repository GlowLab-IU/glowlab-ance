"use client";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { uploadMetadataToPinata, AcneResult } from "@/app/Pinata/pinataUpload";
import { mintWithCrossmint } from "@/utils/crossmint";
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
      // 1) upload metadata JSON to Pinata
      const { uri } = await uploadMetadataToPinata(result);

      // 2) mint the NFT via Crossmint
      const mintResponse = await mintWithCrossmint(uri, publicKey.toBase58());

      console.log("Mint successful:", mintResponse);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Button onClick={handleClaim} disabled={!connected} size="lg">
      Claim NFT to View Full Report
    </Button>
  );
};
