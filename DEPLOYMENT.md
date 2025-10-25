# 🚀 Panduan Deploy ke Vercel

## Persiapan Sebelum Deploy

### 1. Pastikan Build Berhasil Lokal
```bash
npm run build
```

### 2. Siapkan Environment Variables

Anda perlu menyiapkan environment variables berikut di Vercel Dashboard:

#### **Wajib:**
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - Dapatkan dari [WalletConnect Cloud](https://cloud.walletconnect.com/)
- `NEXT_PUBLIC_FACTORY_ADDRESS` - Alamat contract factory (sudah ada default)
- `NEXT_PUBLIC_EXECUTOR_ADDRESS` - Alamat contract executor (sudah ada default)

#### **Opsional:**
- `NEXT_PUBLIC_BASE_RPC_URL` - RPC URL untuk Base Mainnet
- `NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL` - RPC URL untuk Base Sepolia
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` - Token bot Telegram untuk notifikasi
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` - Chat ID Telegram
- `NEXT_PUBLIC_PINATA_API_KEY` - API key Pinata untuk IPFS
- `NEXT_PUBLIC_PINATA_SECRET_KEY` - Secret key Pinata

## Cara Deploy

### Opsi 1: Deploy via Vercel Dashboard (Recommended)

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan GitHub/GitLab/Bitbucket

2. **Import Project**
   - Klik "Add New Project"
   - Pilih repository Anda
   - Vercel akan otomatis mendeteksi Next.js

3. **Configure Environment Variables**
   - Di halaman import, klik "Environment Variables"
   - Tambahkan semua variable dari `.env.example`
   - Minimal tambahkan `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (±2-3 menit)

### Opsi 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

## Setelah Deploy

### 1. Verifikasi Deployment
- Buka URL yang diberikan Vercel
- Test koneksi wallet
- Test fitur-fitur utama

### 2. Setup Custom Domain (Opsional)
- Di Vercel Dashboard → Settings → Domains
- Tambahkan domain custom Anda
- Update DNS records sesuai instruksi

### 3. Enable Analytics (Opsional)
- Di Vercel Dashboard → Analytics
- Enable Web Analytics untuk monitoring

## Troubleshooting

### Build Error: Missing Environment Variables
**Solusi:** Pastikan semua environment variables wajib sudah ditambahkan di Vercel Dashboard

### Error: WalletConnect Connection Failed
**Solusi:** Periksa `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` sudah benar

### Error: Contract Not Found
**Solusi:** Verifikasi `NEXT_PUBLIC_FACTORY_ADDRESS` dan `NEXT_PUBLIC_EXECUTOR_ADDRESS` sesuai dengan network yang digunakan

### Slow Loading
**Solusi:** 
- Enable Edge Functions di Vercel
- Gunakan Image Optimization
- Check bundle size dengan `npm run build`

## Update Deployment

Setiap push ke branch `main` akan otomatis trigger deployment baru di Vercel.

Untuk preview deployment (branch lain):
- Push ke branch apapun
- Vercel akan membuat preview URL

## Monitoring

- **Analytics:** Vercel Dashboard → Analytics
- **Logs:** Vercel Dashboard → Deployments → [pilih deployment] → Logs
- **Performance:** Vercel Dashboard → Speed Insights

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
