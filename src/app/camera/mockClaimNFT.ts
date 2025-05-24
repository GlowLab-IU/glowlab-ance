/**
 * Mock implementation for claiming NFTs without external API calls
 * Use this file when Pinata or Shyft APIs are experiencing issues
 */

interface AcneResult {
  bounding_boxes: number[][]; 
  total_acnes: number;
  skin_type: string;
  recommended_compositions: string[];
}

export const mockClaimNFT = async (result: AcneResult): Promise<string> => {
  try {
    console.log('🔄 Starting mock NFT claim process...');
    console.log('📋 Input data:', JSON.stringify(result));
    
    // Create a mock IPFS hash that looks realistic
    const randomString = Math.random().toString(36).substring(2, 15);
    const mockIpfsHash = `bafybeif${randomString}`;
    
    // Add artificial delay to simulate processing
    console.log('⏱️ Processing...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('✅ Mock IPFS upload "completed" successfully');
    console.log('📦 Mock IPFS Hash:', mockIpfsHash);
    
    // Add another delay to simulate NFT minting
    console.log('🎭 "Minting" mock NFT...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock Solana address for the NFT
    const mockNftAddress = `${randomString.substring(0, 6)}...${randomString.substring(6)}`;
    
    console.log('🎉 Mock NFT "created" successfully!');
    console.log('📝 Mock NFT Address:', mockNftAddress);
    
    // Display mock success message
    alert(`NFT claim thành công! (Testing Mode)\nIPFS Hash: ${mockIpfsHash}\nNFT Mint Address: ${mockNftAddress}`);
    
    return `https://example.com/mock/${mockIpfsHash}`;
  } catch (error: any) {
    console.error('❌ Error in mock NFT claim:', error);
    alert(`Không thể claim mock NFT. Lỗi: ${error.message}`);
    throw error;
  }
};

/**
 * How to use this mock implementation:
 * 
 * 1. Import the function in your component:
 *    import { mockClaimNFT } from './mockClaimNFT';
 * 
 * 2. Replace the claimNFT call with mockClaimNFT:
 *    // const result = await claimNFT(acneResult);
 *    const result = await mockClaimNFT(acneResult);
 * 
 * This allows testing the UI flow without relying on external services
 */
