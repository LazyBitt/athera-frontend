# Athera

**Automated crypto inheritance on Base**

> $140B+ in crypto is lost forever due to poor inheritance planning. Athera fixes this.

## 🎯 What Makes Athera Different

**Setup in 60 seconds. No custody. No lawyers. Just code.**

Unlike traditional inheritance solutions that require:
- ❌ Trusting third parties with your keys
- ❌ Weeks of legal paperwork
- ❌ Monthly subscription fees
- ❌ Complex technical setup

Athera offers:
- ✅ **Automated Distribution** - Smart contracts handle everything
- ✅ **60-Second Setup** - Create vault instantly
- ✅ **Non-Custodial** - You keep full control until distribution
- ✅ **Low Cost** - Only pay gas (powered by Base's low fees)
- ✅ **Telegram Notifications** - Real-time alerts for you and heirs
- ✅ **Proof-of-Life** - Simple check-in system to reset countdown

## 🎯 Perfect For

- **Crypto Investors** with $10K+ in digital assets
- **Early Adopters** protecting their Base ecosystem holdings
- **Families** planning for digital inheritance
- **DeFi Users** who want peace of mind

## Overview

Athera solves the critical problem of crypto asset inheritance by providing a trustless, automated system for transferring digital assets to heirs. The protocol uses smart contracts on Base network, Chainlink Automation for time-based execution, and IPFS for decentralized message storage.

## Core Features

**Vault Management**
- Non-custodial ETH deposits and withdrawals
- Real-time on-chain balance tracking
- Multi-vault support per address

**Inheritance Vaults**
- Multi-beneficiary distribution with percentage allocation
- Configurable countdown timers (7 to 365+ days)
- Automated distribution via Chainlink Automation
- Proof-of-life check-in system to reset timers
- Dynamic beneficiary management
- Emergency withdrawal mechanism

**Decentralized Storage**
- IPFS integration for farewell messages and documents
- Support for text, images, and file attachments
- Permanent content addressing via CID

**Notification System**
- Telegram bot integration for real-time alerts
- Countdown expiry warnings (24h and 1h)
- Distribution confirmation notifications
- Vault activity monitoring

## Technical Architecture

**Frontend Stack**
- Next.js 14 with App Router for server-side rendering and API routes
- Wagmi v2 for Ethereum interactions with type-safe hooks
- RainbowKit for wallet connection abstraction
- TailwindCSS for utility-first styling
- Framer Motion for declarative animations
- Zustand for lightweight state management

**Blockchain Layer**
- Base Sepolia testnet (production ready for Base mainnet)
- Factory pattern for vault deployment
- Chainlink Automation for trustless time-based execution
- ERC-20 compatible architecture

**Storage & Communication**
- IPFS via HTTP client for decentralized content storage
- Telegram Bot API for push notifications
- LocalStorage for client-side preferences

## Installation

**Prerequisites**
- Node.js 18.x or higher
- npm or yarn package manager
- Web3 wallet (MetaMask, Coinbase Wallet, WalletConnect compatible)
- Base Sepolia testnet ETH for gas fees

**Setup**

Clone and install dependencies:
```bash
git clone https://github.com/yourusername/athera-dashboard.git
cd athera-dashboard
npm install
```

Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Required - Get from https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Contract addresses (Base Sepolia - pre-configured)
NEXT_PUBLIC_FACTORY_ADDRESS=0xcddc1af8Bb8484076C77090c0bE4443AaDAB389a
NEXT_PUBLIC_EXECUTOR_ADDRESS=0xD8b833aC3243dbBDf5A105B0EA37531d9279cC76

# Optional - RPC endpoints (defaults provided)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org

# Optional - Telegram notifications
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id

# Optional - IPFS via Pinata (1GB free tier)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

Start development server:
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Usage

**Wallet Connection**

Connect your Web3 wallet through RainbowKit interface. The application will prompt network switching if not on Base Sepolia. Supported wallets include MeMask, Coinbase Wallet, WalletConnect, and Rainbow.

**Depositing Funds**

Navigate to Vault tab and deposit ETH to your personal vault contract. This creates a non-custodial storage that you control. Deposited funds can be allocated to inheritance vaults or withdrawn at any time.

**Creating Inheritance Vaults**

From the Inheritance tab, initiate vault creation with the following parameters:
- Lock amount (must not exceed available vault balance)
- Countdown duration in days (minimum 7 days recommended)
- Beneficiary addresses (Ethereum addresses only)
- Distribution percentages (must sum to exactly 100%)

The smart contract validates all parameters before deployment. Each vault operates independently with its own countdown timer.

**Proof-of-Life Check-ins**

Reset vault countdown timers through the check-in function. This proves continued activity and prevents premature distribution. Check-ins can be performed at any time before countdown expiry. Consider setting calendar reminders based on your countdown duration.

**Managing Beneficiaries**

Vault owners can modify beneficiary lists and percentages post-creation. Changes take effect immediately but do not reset the countdown timer. Emergency withdrawal option allows full fund recovery with vault termination.

**IPFS Message Storage**

Upload text messages, images, or documents to IPFS through the Messages tab. Each upload generates a unique Content Identifier (CID) for permanent retrieval. Share CIDs with beneficiaries through secure channels. Content remains accessible indefinitely through IPFS gateways.

## Smart Contracts

**Base Sepolia Testnet**
```
Factory Contract:    0xcddc1af8Bb8484076C77090c0bE4443AaDAB389a
Automation Contract: 0xD8b833aC3243dbBDf5A105B0EA37531d9279cC76
```

Contract source code and verification available on BaseScan. Factory implements EIP-1167 minimal proxy pattern for gas-efficient vault deployment.

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

## Architecture Details

**Automated Distribution**

Chainlink Automation monitors all active vaults through upkeep contracts. When countdown timers reach zero, the automation network triggers distribution transactions. This eliminates reliance on manual execution or centralized servers. Gas costs for automation are pre-funded through Chainlink subscription model.

**Security Model**

The protocol implements several security measures:
- Non-custodial architecture - users maintain full control until distribution
- Time-lock mechanisms prevent immediate withdrawals by unauthorized parties
- Percentage validation ensures accurate fund distribution
- Emergency withdrawal function for vault owners
- Immutable beneficiary records on-chain

**Gas Optimization**

Factory pattern with EIP-1167 minimal proxies reduces deployment costs by ~90% compared to full contract deployment. Vault operations use optimized storage patterns and batch operations where possible.

**IPFS Integration**

Content addressing through IPFS provides censorship-resistant storage for sensitive documents. The application supports multiple IPFS providers (Pinata, Infura, local nodes). CIDs are stored off-chaie gas costs while maintaining verifiability.

## Development

**Available Scripts**

```bash
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run start        # Serve production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking without emit
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments
- Powered by Base, Chainlink, and IPFS
- Inspired by the need for secure digital inheritance
