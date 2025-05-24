import { mintNFT } from "@/libs/shyft";
import type { MintNFTRequestBody } from "@/types";
import { useWallet } from "@solana/wallet-adapter-react";
import router from "next/router";

const { publicKey } = useWallet();
const toPubkey = publicKey?.toBase58() || "";

// URI metadata IPFS (thường sẽ có dạng ipfs://<hash>)
const metadataUri =
  "https://teal-nearby-raccoon-816.mypinata.cloud/ipfs/bafkreihjng5tav243oii6lk4pqgqdcs4sasuiug3c6ojilodyqpatoco5i";

async function claimAcneNFT() {
  try {
    const body: MintNFTRequestBody = {
      network: "devnet", // hoặc "mainnet-beta"
      receiver: toPubkey, // ví sẽ nhận NFT
      uri: metadataUri, // trỏ đến JSON metadata Pinata
      max_supply: 1, // chỉ mint 1 bản
      seller_fee_basis_points: 0, // phí royalties 0%
      creators: [
        // (tuỳ chọn) giữ nguyên creator
        {
          address: "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX",
          share: 100,
        },
      ],
    };

    const res = await mintNFT(body);
    console.log("Mint success:", res);
    alert("🎉 NFT minted! Check your wallet for the Acne Diagnosis NFT.");
    // sau khi mint xong, chuyển sang /result-medical
    router.push("/result-medical");
  } catch (err: any) {
    console.error("Mint failed:", err);
    alert("Mint NFT thất bại: " + err.message);
  }
}
