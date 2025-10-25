# IPFS Integration Guide

The current implementation uses simulated IPFS uploads for demo purposes. For production, integrate with a real IPFS service.

## Current Implementation (Demo)

The dashboard currently simulates IPFS uploads by generating mock CIDs. This allows you to test the UI/UX without requiring IPFS credentials.

```typescript
// lib/ipfs.ts
export async function uploadToIPFS(file: File): Promise<string> {
  // Returns mock CID for demo
  const mockCid = `Qm${Math.random().toString(36).substring(2, 15)}`
  return mockCid
}
```

## Production Integration Options

### Option 1: Pinata (Recommended)

Pinata is the easiest way to upload to IPFS.

#### Setup:
1. Sign up at https://www.pinata.cloud/
2. Get API Key and Secret
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_PINATA_API_KEY=your_api_key
   NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key
   ```

#### Implementation:
```typescript
// lib/ipfs.ts
export async function uploadToIPFS(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY!,
      'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY!,
    },
    body: formData,
  })
  
  const data = await response.json()
  return data.IpfsHash
}

export async function uploadTextToIPFS(text: string): Promise<string> {
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY!,
      'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY!,
    },
    body: JSON.stringify({
      pinataContent: { text },
      pinataMetadata: { name: 'message.txt' },
    }),
  })
  
  const data = await response.json()
  return data.IpfsHash
}
```

---

### Option 2: Web3.Storage

Free and easy to use, backed by Protocol Labs.

#### Setup:
1. Sign up at https://web3.storage/
2. Get API token
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_WEB3_STORAGE_TOKEN=your_token
   ```

#### Implementation:
```typescript
import { Web3Storage } from 'web3.storage'

const client = new Web3Storage({ 
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN! 
})

export async function uploadToIPFS(file: File): Promise<string> {
  const cid = await client.put([file])
  return cid
}

export async function uploadTextToIPFS(text: string): Promise<string> {
  const blob = new Blob([text], { type: 'text/plain' })
  const file = new File([blob], 'message.txt')
  const cid = await client.put([file])
  return cid
}
```

---

### Option 3: Infura IPFS

Enterprise-grade IPFS service.

#### Setup:
1. Sign up at https://infura.io/
2. Create IPFS project
3. Get Project ID and Secret
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_INFURA_IPFS_ID=your_project_id
   NEXT_PUBLIC_INFURA_IPFS_SECRET=your_project_secret
   ```

#### Implementation:
```typescript
export async function uploadToIPFS(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  
  const auth = 'Basic ' + Buffer.from(
    `${process.env.NEXT_PUBLIC_INFURA_IPFS_ID}:${process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET}`
  ).toString('base64')
  
  const response = await fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'POST',
    headers: { Authorization: auth },
    body: formData,
  })
  
  const data = await response.json()
  return data.Hash
}
```

---

### Option 4: NFT.Storage

Free IPFS storage for NFTs and metadata.

#### Setup:
1. Sign up at https://nft.storage/
2. Get API token
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_NFT_STORAGE_TOKEN=your_token
   ```

#### Implementation:
```typescript
import { NFTStorage } from 'nft.storage'

const client = new NFTStorage({ 
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN! 
})

export async function uploadToIPFS(file: File): Promise<string> {
  const cid = await client.storeBlob(file)
  return cid
}
```

---

## Comparison

| Service | Free Tier | Ease of Use | Speed | Best For |
|---------|-----------|-------------|-------|----------|
| **Pinata** | 1GB | ⭐⭐⭐⭐⭐ | Fast | Production apps |
| **Web3.Storage** | Unlimited | ⭐⭐⭐⭐ | Fast | Open source projects |
| **Infura** | 5GB | ⭐⭐⭐ | Fast | Enterprise |
| **NFT.Storage** | Unlimited | ⭐⭐⭐⭐ | Medium | NFT projects |

---

## Installation

### Pinata
```bash
# No additional packages needed
```

### Web3.Storage
```bash
npm install web3.storage
```

### Infura
```bash
# No additional packages needed
```

### NFT.Storage
```bash
npm install nft.storage
```

---

## Testing

After implementing, test with:

1. **Upload Text**
   - Go to Messages tab
   - Write a test message
   - Click "Upload to IPFS"
   - Verify CID is returned

2. **Upload File**
   - Select an image or document
   - Upload to IPFS
   - Verify CID is returned
   - Test IPFS gateway link

3. **Retrieve Content**
   - Use CID to fetch content
   - Verify content matches original

---

## Gateway URLs

After uploading, files can be accessed via:

- `https://ipfs.io/ipfs/{CID}`
- `https://gateway.pinata.cloud/ipfs/{CID}`
- `https://{CID}.ipfs.dweb.link/`
- `https://cloudflare-ipfs.com/ipfs/{CID}`

---

## Best Practices

1. **Pin Important Files**
   - Use pinning services to ensure files stay available
   - Pinata and Web3.Storage pin automatically

2. **Validate CIDs**
   - Check CID format before storing
   - Verify content can be retrieved

3. **Handle Errors**
   - Implement retry logic
   - Show user-friendly error messages
   - Log errors for debugging

4. **Optimize File Sizes**
   - Compress images before upload
   - Limit file sizes (e.g., 10MB max)
   - Show upload progress

5. **Security**
   - Never expose API keys in client code
   - Use environment variables
   - Validate file types before upload

---

## Migration from Demo

To migrate from demo to production:

1. Choose an IPFS service (Pinata recommended)
2. Sign up and get credentials
3. Add credentials to `.env.local`
4. Replace `lib/ipfs.ts` with production code
5. Test thoroughly
6. Deploy

---

## Support

- **Pinata**: https://docs.pinata.cloud/
- **Web3.Storage**: https://web3.storage/docs/
- **Infura**: https://docs.infura.io/infura/networks/ipfs
- **NFT.Storage**: https://nft.storage/docs/

---

**Current Status:** Demo mode with simulated uploads

**Recommended for Production:** Pinata (easiest) or Web3.Storage (free unlimited)
