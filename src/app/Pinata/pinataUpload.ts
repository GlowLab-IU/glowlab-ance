import axios from "axios";

export interface AcneResult {
  bounding_boxes: number[][];
  total_acnes: number;
  skin_type: string;
  recommended_compositions: string[];
  raw_output_image?: string; // base64 or URL of AI output image
}

/**
 * Upload metadata JSON (including attributes) to Pinata and return a gateway URI.
 */
export async function uploadMetadataToPinata(
  result: AcneResult
): Promise<string> {
  // Load env vars
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;
  const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
  if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY || !PINATA_GATEWAY) {
    throw new Error(
      "Missing Pinata configuration: please set NEXT_PUBLIC_PINATA_API_KEY, NEXT_PUBLIC_PINATA_SECRET_API_KEY, and NEXT_PUBLIC_PINATA_GATEWAY in your .env"
    );
  }

  const metadata = {
    name: "Acne Diagnosis NFT",
    symbol: "ACNE",
    description:
      "This NFT contains the result of an AI-powered acne skin diagnosis.",
    seller_fee_basis_points: 0,
    image: result.raw_output_image || result.recommended_compositions[0] || "",
    properties: {
      creators: [
        { address: "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX", share: 100 },
      ],
      attributes: [
        { trait_type: "Total Acnes", value: result.total_acnes },
        { trait_type: "Skin Type", value: result.skin_type },
        {
          trait_type: "Recommended Compositions",
          value: result.recommended_compositions.join(", "),
        },
        {
          trait_type: "Bounding Boxes Count",
          value: result.bounding_boxes.length,
        },
      ],
    },
  };

  const pinataUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const headers = {
    pinata_api_key: PINATA_API_KEY,
    pinata_secret_api_key: PINATA_SECRET_API_KEY,
    "Content-Type": "application/json",
  };

  let lastError: any;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const resp = await axios.post(pinataUrl, metadata, {
        headers,
        timeout: 30000,
      });
      const ipfsHash = resp.data.IpfsHash;
      if (!ipfsHash) throw new Error("Pinata response missing IpfsHash");
      return `https://${PINATA_GATEWAY}/ipfs/${ipfsHash}`;
    } catch (e: any) {
      lastError = e;
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 2000));
      }
    }
  }
  throw lastError;
}
