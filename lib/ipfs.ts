// IPFS integration using Pinata
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    if (!PINATA_JWT) {
      console.error('Pinata JWT is not configured')
      throw new Error('Pinata JWT not configured. Please add NEXT_PUBLIC_PINATA_JWT to your .env.local file.')
    }

    console.log('Uploading to IPFS:', {
      name: file.name,
      type: file.type,
      size: file.size,
    })

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    })

    console.log('Pinata response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Pinata error response:', errorText)
      throw new Error(`Pinata upload failed (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    console.log('File uploaded to IPFS successfully:', data.IpfsHash)
    return data.IpfsHash
  } catch (error: any) {
    console.error('IPFS upload error:', error)
    throw new Error(error.message || 'Failed to upload to IPFS')
  }
}

export async function uploadTextToIPFS(text: string): Promise<string> {
  try {
    if (!PINATA_JWT) {
      throw new Error('Pinata JWT not configured')
    }

    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
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
  return !!PINATA_JWT
}

