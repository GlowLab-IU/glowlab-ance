// src/libs/shyft.ts

/**
 * Shyft SDK wrappers for decentralized storage and account writes
 */
import fetcher from "./fetcher";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { BaseResponse, UploadResult, UploadMetadataRequestBody } from "@/types";
import {
  CreateMerkleTreeRequestBody,
  CreateMerkleTreeResult,
  MintNFTRequestBody,
  MintNFTResult,
  TransferNFTRequestBody,
  TransferNFTResult,
  BurnNFTRequestBody,
  BurnNFTResult,
  Network,
  Nft,
} from "@/types";
import { SHYFT_API_ENDPOINT } from "@/config/api";

const API_KEY = process.env.NEXT_PUBLIC_SHYFT_API_KEY!;

// --- Storage Upload ---
export function upload(file: File) {
  const formdata = new FormData();
  formdata.append("file", file, file.name);
  return fetcher<BaseResponse<UploadResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/storage/upload`,
    {
      method: "POST",
      headers: { "x-api-key": API_KEY },
      body: formdata,
    }
  );
}

// --- Metadata Create ---
export function uploadMetadata(metadata: UploadMetadataRequestBody) {
  return fetcher<BaseResponse<UploadResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/metadata/create`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(metadata),
    }
  );
}

// --- Account Write ---
export function registerProductShyft(
  metadataCID: string,
  wallet: AnchorWallet
): Promise<string> {
  return fetcher<BaseResponse<{ address: string }>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/account/write`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        network: "devnet",
        programId: process.env.NEXT_PUBLIC_SHYFT_PROGRAM_ID!,
        payer: wallet.publicKey.toBase58(),
        isSigner: true,
        isPayer: true,
        data: metadataCID,
      }),
    }
  ).then((res) => res.result.address);
}

// --- Compressed NFT API Wrappers ---
export function createTree(body: CreateMerkleTreeRequestBody) {
  return fetcher<BaseResponse<CreateMerkleTreeResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/create_tree`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify(body),
    }
  );
}

export function mintNFT(body: MintNFTRequestBody) {
  return fetcher<BaseResponse<MintNFTResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/mint`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify(body),
    }
  );
}

export function transferNFT(body: TransferNFTRequestBody) {
  return fetcher<BaseResponse<TransferNFTResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/transfer`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify(body),
    }
  );
}

export function burnNFT(body: BurnNFTRequestBody) {
  return fetcher<BaseResponse<BurnNFTResult>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/burn`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
      body: JSON.stringify(body),
    }
  );
}

export function readAllNFTs(wallet: string, network: Network) {
  return fetcher<BaseResponse<{ nfts: Nft[] }>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/read_all?network=${network}&wallet_address=${wallet}`,
    {
      method: "GET",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
    }
  );
}

export function readNFT(nftAddress: string, network: Network) {
  return fetcher<BaseResponse<Nft>>(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/read?network=${network}&nft_address=${nftAddress}`,
    {
      method: "GET",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
    }
  );
}
