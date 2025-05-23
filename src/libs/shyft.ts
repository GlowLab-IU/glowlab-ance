// src/libs/shyft.ts
import {
  BaseResponse,
  BurnNFTRequestBody,
  BurnNFTResult,
  CreateMerkleTreeRequestBody,
  CreateMerkleTreeResult,
  MintNFTRequestBody,
  MintNFTResult,
  Network,
  Nft,
  TransferNFTRequestBody,
  TransferNFTResult,
  UploadMetadataRequestBody,
  UploadResult,
} from "@/types";
import fetcher from "./fetcher";
import { SHYFT_API_ENDPOINT } from "@/config/api";

const API_KEY = process.env.NEXT_PUBLIC_SHYFT_API_KEY!;

/**
 * Create a compressed Merkle tree.
 */
export function createTree(
  body: CreateMerkleTreeRequestBody
): Promise<BaseResponse<CreateMerkleTreeResult>> {
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/create_tree`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
  });
}

/**
 * Mint a compressed NFT to a Merkle tree.
 */
export function mintNFT(
  body: MintNFTRequestBody
): Promise<BaseResponse<MintNFTResult>> {
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/mint`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
  });
}

/**
 * Transfer a compressed NFT from one wallet to another.
 */
export function transferNFT(
  body: TransferNFTRequestBody
): Promise<BaseResponse<TransferNFTResult>> {
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/transfer`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
  });
}

/**
 * Burn a compressed NFT.
 */
export function burnNFT(
  body: BurnNFTRequestBody
): Promise<BaseResponse<BurnNFTResult>> {
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/burn`, {
    method: "DELETE",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(body),
  });
}

/**
 * Read all compressed NFTs owned by a wallet.
 */
export function readAllNFTs(
  walletAddress: string,
  network: Network
): Promise<BaseResponse<{ nfts: Nft[] }>> {
  return fetcher(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/read_all?network=${network}&wallet_address=${walletAddress}`,
    {
      method: "GET",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
    }
  );
}

/**
 * Read a single compressed NFT by its mint address.
 */
export function readNFT(
  nftAddress: string,
  network: Network
): Promise<BaseResponse<Nft>> {
  return fetcher(
    `${SHYFT_API_ENDPOINT}/sol/v1/nft/compressed/read?network=${network}&nft_address=${nftAddress}`,
    {
      method: "GET",
      headers: { "content-type": "application/json", "x-api-key": API_KEY },
    }
  );
}

/**
 * Upload a file (image) to Shyft storage (IPFS).
 */
export function upload(file: File): Promise<BaseResponse<UploadResult>> {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/storage/upload`, {
    method: "POST",
    headers: { "x-api-key": API_KEY },
    body: formData,
  });
}

/**
 * Upload metadata JSON for NFT.
 */
export function uploadMetadata(
  metadata: UploadMetadataRequestBody
): Promise<BaseResponse<UploadResult>> {
  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v1/metadata/create`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(metadata),
  });
}

/**
 * Request shape for detached NFT creation (v2 endpoint).
 */
export interface CreateDetachedRequest {
  file: File;
  network: Network;
  creator_wallet: string;
  name: string;
  symbol: string;
  description?: string;
  external_url?: string;
  collection_address?: string;
  attributes?: Array<{ trait_type: string; value: any }>;
  max_supply?: number;
  royalty?: number;
  receiver?: string;
  fee_payer?: string;
  service_charge?: { receiver: string; amount: number };
  priority_fee?: number;
}

/**
 * Create and mint NFT in one request (v2).
 */
export function createDetachedNFT(
  params: CreateDetachedRequest
): Promise<BaseResponse<MintNFTResult>> {
  const formData = new FormData();
  formData.append("file", params.file, params.file.name);
  formData.append("network", params.network);
  formData.append("creator_wallet", params.creator_wallet);
  formData.append("name", params.name);
  formData.append("symbol", params.symbol);
  if (params.description) formData.append("description", params.description);
  if (params.external_url) formData.append("external_url", params.external_url);
  if (params.collection_address)
    formData.append("collection_address", params.collection_address);
  if (params.attributes)
    formData.append("attributes", JSON.stringify(params.attributes));
  if (params.max_supply !== undefined)
    formData.append("max_supply", `${params.max_supply}`);
  if (params.royalty !== undefined)
    formData.append("royalty", `${params.royalty}`);
  if (params.receiver) formData.append("receiver", params.receiver);
  if (params.fee_payer) formData.append("fee_payer", params.fee_payer);
  if (params.service_charge)
    formData.append("service_charge", JSON.stringify(params.service_charge));
  if (params.priority_fee !== undefined)
    formData.append("priority_fee", `${params.priority_fee}`);

  return fetcher(`${SHYFT_API_ENDPOINT}/sol/v2/nft/create`, {
    method: "POST",
    headers: { "x-api-key": API_KEY },
    body: formData,
  });
}
