import axios from 'axios';

interface AcneResult {
  bounding_boxes: number[][]; 
  total_acnes: number;
  skin_type: string;
  recommended_compositions: string[];
}

export const claimNFT = async (result: AcneResult) => {
  try {
    const metadata = {
      name: "Acne Diagnosis NFT",
      description: "This NFT contains the result of an AI-powered acne skin diagnosis.",
      attributes: [
        {
          trait_type: "Total Acnes",
          value: result.total_acnes,
        },
        {
          trait_type: "Skin Type",
          value: result.skin_type,
        },
        {
          trait_type: "Recommended Compositions",
          value: result.recommended_compositions.join(', '),
        },
        {
          trait_type: "Bounding Boxes Count",
          value: result.bounding_boxes.length,
        }
      ],
      bounding_boxes: result.bounding_boxes,
    };

    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
    const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;
    const pinataUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    console.log('🚀 Bắt đầu quá trình đẩy metadata lên IPFS...');
    
    try {
      const response = await axios.post(pinataUrl, metadata, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      const ipfsHash = response.data.IpfsHash;
      console.log('✅ Metadata đã được đẩy lên IPFS thành công!');
      console.log('📦 IPFS Hash:', ipfsHash);
      console.log('🔗 IPFS URL:', `https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      console.log('📋 Metadata:', JSON.stringify(metadata, null, 2));
      
      // Alert user of success
      alert(`NFT claim thành công!\nIPFS Hash: ${ipfsHash}`);
      
      return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error: any) {
      console.error('❌ Lỗi khi gọi Pinata API:', error.response?.data || error.message);
      throw error;
    }
  } catch (error) {
    console.error('❌ Error claiming NFT:', error);
    alert('Không thể claim NFT. Vui lòng thử lại sau.');
    throw error;
  }
};