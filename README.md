# Athera Dashboard

A production-grade Web3 inheritance vault dashboard built with Next.js, Wagmi v2, and TailwindCSS. Athera enables users to securely store crypto assets and automatically transfer them to designated heirs when a countdown expires.

## Features

### 🔐 Vault Management
- Deposit and withdraw ETH to/from your vault
- Real-time balance tracking
- Secure non-custodial storage

### 👨‍👩‍👧‍👦 Inheritance Vaults
- Create inheritance vaults with multiple beneficiaries
- Set custom countdown timers (7, 30, 90, 365 days or custom)
- Automatic distribution via Chainlink Automation
- Check-in system to reset countdown
- Edit beneficiaries and percentages
- Emergency withdrawal option

### 💬 IPFS Messages
- Upload text messages for heirs
- Store images and files on IPFS
- Permanent decentralized storage
- Preview and manage uploaded content

### 🔔 Telegram Notifications
- Real-time alerts for countdown warnings
- Inheritance distribution notifications
- Vault creation confirmations
- Easy setup with Telegram bot

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Web3**: Wagmi v2 + Ethers.js + RainbowKit
- **Styling**: TailwindCSS + Framer Motion
- **State Management**: Zustand
- **Storage**: IPFS (ipfs-http-client)
- **Notifications**: Telegram Bot API
- **Network**: Base Sepolia Testnet
- **Automation**: Chainlink Automation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or compatible Web3 wallet
- Base Sepolia testnet ETH ([Get from faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/athera-dashboard.git
cd athera-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Configure environment variables:
```env
# Required
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Contract addresses (already configured for Base Sepolia)
NEXT_PUBLIC_FACTORY_ADDRESS=0xcddc1af8Bb8484076C77090c0bE4443AaDAB389a
NEXT_PUBLIC_EXECUTOR_ADDRESS=0xD8b833aC3243dbBDf5A105B0EA37531d9279cC76

# Optional - Telegram notifications
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Optional - IPFS via Infura
NEXT_PUBLIC_INFURA_IPFS_ID=your_infura_id
NEXT_PUBLIC_INFURA_IPFS_SECRET=your_infura_secret
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" button
- Select your preferred wallet (MetaMask, Coinbase Wallet, etc.)
- Switch to Base Sepolia network if prompted

### 2. Deposit Funds
- Navigate to "Vault" tab
- Enter amount to deposit
- Confirm transaction in wallet
- Funds are now available for creating inheritance vaults

### 3. Create Inheritance Vault
- Go to "Inheritance" tab
- Click "Create Vault"
- Set amount to lock
- Choose countdown period (days)
- Add beneficiaries with wallet addresses and percentages
- Ensure percentages total 100%
- Confirm transaction

### 4. Manage Vaults
- **Check In**: Reset countdown timer to prevent distribution
- **View Details**: See beneficiaries, balance, and time remaining
- **Emergency Withdraw**: Withdraw funds if needed
- **Distribute**: Manually trigger distribution when countdown expires

### 5. Upload Messages (IPFS)
- Navigate to "Messages" tab
- Choose "Text Message" or "Upload File"
- Write message or select file
- Click "Upload to IPFS"
- Share CID with heirs or attach to vault

### 6. Setup Notifications
- Go to "Notifications" tab
- Click settings icon
- Get your Telegram chat ID from @userinfobot
- Enter chat ID and save
- Test notification to verify setup

## Smart Contract Addresses

### Base Sepolia Testnet
- **Factory Contract**: `0xcddc1af8Bb8484076C77090c0bE4443AaDAB389a`
- **Automation Contract**: `0xD8b833aC3243dbBDf5A105B0EA37531d9279cC76`

## Project Structure

```
athera-dashboard/
├── app/
│   ├── dashboard/          # Dashboard page
│   ├── api/               # API routes (Telegram)
│   └── layout.tsx         # Root layout
├── components/
│   ├── dashboard/         # Dashboard tab components
│   ├── ui/               # Reusable UI components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configs
│   ├── contracts.ts      # Contract ABIs and addresses
│   ├── ipfs.ts          # IPFS client
│   ├── telegram.ts      # Telegram notifications
│   └── wagmi.ts         # Wagmi configuration
├── store/               # Zustand state management
└── public/              # Static assets
```

## Key Features Explained

### Automatic Distribution
Athera uses Chainlink Automation to monitor vault countdowns. When a countdown reaches zero, the system automatically distributes funds to beneficiaries without manual intervention.

### Check-In System
Vault owners can "check in" to reset the countdown timer, proving they're still active. This prevents premature distribution while the owner is alive and active.

### Multi-Beneficiary Support
Create vaults with multiple heirs, each receiving a custom percentage of the inheritance. Percentages must total 100%.

### IPFS Integration
Store farewell messages, photos, or important documents on IPFS for permanent, decentralized storage. Share the CID with heirs.

### Telegram Alerts
Receive notifications 24 hours and 1 hour before countdown expiry, plus confirmation when inheritance is distributed.

## Development

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted

## Security Considerations

- ✅ Non-custodial: You always control your funds
- ✅ Smart contracts audited (recommended before mainnet)
- ✅ No private keys stored
- ✅ Transparent on-chain operations
- ⚠️ Test thoroughly on testnet before mainnet use
- ⚠️ Keep your wallet seed phrase secure
- ⚠️ Verify beneficiary addresses carefully

## Troubleshooting

### Wallet won't connect
- Ensure you're on Base Sepolia network
- Clear browser cache and try again
- Try different wallet provider

### Transaction fails
- Check you have enough ETH for gas
- Ensure vault has sufficient balance
- Verify beneficiary addresses are valid

### IPFS upload fails
- Check Infura credentials if using Infura
- Try again after a few moments
- Verify file size is reasonable (<10MB)

### Notifications not working
- Verify Telegram bot token is correct
- Ensure chat ID is accurate
- Test notification in settings

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Documentation: [docs.athera.io](https://docs.athera.io)
- Discord: [discord.gg/athera](https://discord.gg/athera)
- Twitter: [@AtheraProtocol](https://twitter.com/AtheraProtocol)

## Acknowledgments

- Built for ETHGlobal Hackathon
- Powered by Base, Chainlink, and IPFS
- Inspired by the need for secure digital inheritance

---

**⚠️ Disclaimer**: This is hackathon/demo software. Use at your own risk. Always test on testnet first. Not financial advice.
