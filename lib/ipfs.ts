// Real IPFS integration using Pinata (Free 1GB)
// Sign up at https://www.pinata.cloud/ to get API keys

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    // Check if Pinata credentials are configured
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured, using demo mode')
      // Return mock CID for demo
      const mockCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      return mockCid
    }

    // Upload to Pinata
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('File uploaded to IPFS:', data.IpfsHash)
    return data.IpfsHash
  } catch (error) {
    console.error('IPFS upload error:', error)
    throw new Error('Failed to upload to IPFS')
  }
}

export async function uploadTextToIPFS(text: string): Promise<string> {
  try {
    // Check if Pinata credentials are configured
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata credentials not configured, using demo mode')
      // Return mock CID for demo
      const mockCid = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      return mockCid
    }

    // Upload to Pinata as JSON
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: JSON.stringify({
        pinataContent: { text },
        pinataMetadata: {
          name: 'message.txt',
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Text uploaded to IPFS:', data.IpfsHash)
    return data.IpfsHash
  } catch (error) {
    console.error('IPFS text upload error:', error)
    throw new Error('Failed to upload text to IPFS')
  }
}

export function getIPFSUrl(cid: string): string {
  return `https://gateway.pinata.cloud/ipfs/${cid}`
}

export async function fetchFromIPFS(cid: string): Promise<string> {
  try {
    const response = await fetch(getIPFSUrl(cid))
    return await response.text()
  } catch (error) {
    console.error('IPFS fetch error:', error)
    throw new Error('Failed to fetch from IPFS')
  }
}

// Check if Pinata is configured
export function isPinataConfigured(): boolean {
  return !!(PINATA_API_KEY && PINATA_SECRET_KEY)
}

