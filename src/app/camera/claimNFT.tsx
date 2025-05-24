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
      "name":"Acne Diagnosis NFT",
      "symbol":"ACNE",
      "description": "This NFT contains the result of an AI-powered acne skin diagnosis.",
      "seller_fee_basis_points": 0,
      "image": "https://res.cloudinary.com/dlod5bte9/image/upload/v1747996083/product/sjers5tcm19oewahn0hc.webp",
      "properties":{
        "creators":[
          {
            "address": "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX",
            "share": 100
          }
        ],
      "attributes": [
        {
         "trait_type": "Total Acnes",
          "value": result.total_acnes,
        },
        {
          "trait_type": "Skin Type",
         "value": result.skin_type,
        },
        {
          "trait_type": "Recommended Compositions",
          "value": result.recommended_compositions.join(', '),
        },
        {
          "trait_type": "Bounding Boxes Count",
          "value": result.bounding_boxes.length,
        }
      ]
    }
};

    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY!;
    const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY!;
    const pinataUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    console.log('🚀 Bắt đầu quá trình đẩy metadata lên IPFS...');
    
    try {
      // Implement retry logic for Pinata API
      const maxRetries = 3;
      let retryCount = 0;
      let response;
      
      while (retryCount < maxRetries) {
        try {
          console.log(`🔄 Pinata API attempt ${retryCount + 1} of ${maxRetries}...`);
          console.log('🔑 Checking Pinata API keys:', {
            apiKey: pinataApiKey ? `${pinataApiKey.substring(0, 5)}...` : 'Missing',
            secretKey: pinataSecretApiKey ? 'Present (hidden)' : 'Missing'
          });
          
          const simplifiedMetadata = {
            name: metadata.name,
            symbol: metadata.symbol,
            description: metadata.description,
            seller_fee_basis_points: metadata.seller_fee_basis_points,
            image: metadata.image,
            properties: metadata.properties
          };
          
          console.log('📦 Simplified metadata size:', JSON.stringify(simplifiedMetadata).length, 'bytes');
          
          // Fix the check for valid metadata
          if (!simplifiedMetadata || !simplifiedMetadata.properties || !simplifiedMetadata.properties.attributes) {
            throw new Error('Invalid metadata structure');
          }
          
          response = await axios.post(pinataUrl, simplifiedMetadata, {
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
              'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 second timeout
          });
          
          console.log('✅ Pinata API call succeeded');
          // If successful, break out of retry loop
          break;
        } catch (retryError: any) {
          retryCount++;
          console.error(`❌ Pinata API attempt ${retryCount} failed:`, retryError.message);
          console.error('📄 Status code:', retryError.response?.status);
          console.error('📄 Response data:', JSON.stringify(retryError.response?.data || {}));
          
          if (retryCount >= maxRetries) {
            throw retryError;
          }
          
          // Wait before retrying
          const delay = retryCount * 2000; // Increasing delay: 2s, 4s, 6s
          console.log(`⏱️ Waiting ${delay}ms before retry ${retryCount + 1}...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      if (!response) {
        throw new Error('Failed to get response from Pinata API after multiple attempts');
      }

      console.log('📥 Full Pinata response:', JSON.stringify(response.data));
      
      const ipfsHash = response.data.IpfsHash;
      
      if (!ipfsHash) {
        console.error('❌ Missing IpfsHash in Pinata response:', response.data);
        throw new Error('Pinata response missing IpfsHash');
      }
      
      console.log('✅ Metadata đã được đẩy lên IPFS thành công!');
      console.log('📦 IPFS Hash:', ipfsHash);
      
      // Construct the metadata URI from the IPFS hash
      const metadata_uri = `https://teal-nearby-raccoon-816.mypinata.cloud/ipfs/${ipfsHash}`;
      console.log('🔗 Metadata URI:', metadata_uri);
      
      alert(`NFT metadata đã được đẩy lên IPFS thành công!\nIPFS Hash: ${ipfsHash}\nMetadata URI: ${metadata_uri}`);
      
      // Return the metadata URI for NFT creation
      return metadata_uri;
    } catch (error: any) {
      console.error('❌ Lỗi khi gọi Pinata API:', error);
      alert(`Lỗi khi đẩy metadata lên IPFS: ${error.message}`);
      throw error;
    }
  } catch (error: any) {
    console.error('❌ Error claiming NFT:', error);
    alert(`Error claiming NFT: ${error.message}`);
    throw error;
  }
};