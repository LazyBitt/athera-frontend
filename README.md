# Athera

Decentralized inheritance protocol enabling automated crypto asset distribution to designated beneficiaries through time-locked vaults with proof-of-life verification.

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

**Notification Setup**

Configure Telegram notifications in the Notifications tab:
1. Create a Telegram bot via @BotFather
2. Obtain your chat ID from @userinfobot
3. Enter credentials in application settings
4. Test notification delivery

Alerts trigger at 24 hours and 1 hour before countdown expiry, plus distribution confirmations.

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

**Build Output**

Production builds generate static pages where possible, with dynamic routes for vault addresses. Typical build size is ~350KB First Load JS for main dashboard. API routes compile to serverless functions.

**Type Safety**

The project uses strict TypeScript configuration with no implicit any. Wagmi provides full type inference for contract interactions. Run `npm run type-check` before committing to catch type errors.

## Deployment

### Vercel (Recommended)

**Quick Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/athera-dashboard)

**Manual Deploy:**
1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and login
3. Click "Add New Project"
4. Import your repository
5. Add environment variables:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` (required)
   - `NEXT_PUBLIC_FACTORY_ADDRESS` (default provided)
   - `NEXT_PUBLIC_EXECUTOR_ADDRESS` (default provided)
   - Other optional variables from `.env.example`
6. Click "Deploy"
7. Wait 2-3 minutes for build to complete

**Post-Deploy:**
- Test wallet connection on live URL
- Verify contract interactions work
- Setup custom domain (optional)
- Enable Vercel Analytics (optional)

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- **Netlify**: Similar process, use Netlify CLI or dashboard
- **Railway**: Connect GitHub and deploy
- **AWS Amplify**: Use Amplify Console
- **Self-hosted**: Run `npm run build && npm start` on your server

## Security Considerations

**Protocol Security**
- Non-custodial architecture - users retain full control of funds
- No private key storage or transmission
- All operations transparent and verifiable on-chain
- Smart contract audit recommended before mainnet deployment

**User Responsibilities**
- Verify beneficiary addresses before vault creation (irreversible)
- Secure wallet seed phrases using industry best practices
- Test all functionality on testnet before mainnet use
- Maintain regular check-ins to prevent unintended distribution
- Use hardware wallets for large value vaults

**Known Limitations**
- Chainlink Automation requires active subscription and funding
- IPFS content persistence depends on pinning service reliability
- Telegram notifications require bot token security
- Gas price volatility may affect transaction costs

## Troubleshooting

**Wallet Connection Issues**

Problem: Wallet fails to connect or shows wrong network
- Verify Base Sepolia is added to wallet (Chain ID: 84532)
- Clear browser cache and wallet cache
- Try alternative wallet provider through RainbowKit
- Check browser console for specific error messages

**Transaction Failures**

Problem: Transactions revert or fail to confirm
- Ensure sufficient ETH balance for gas fees (typically 0.001-0.01 ETH)
- Verify vault has adequate balance for inheritance vault creation
- Confirm beneficiary addresses are valid Ethereum addresses
- Check BaseScan for specific revert reasons
- Increase gas limit if using custom gas settings

**IPFS Upload Failures**

Problem: File uploads timeout or fail
- Verify Pinata API credentials if configured
- Check file size (recommended maximum 10MB)
- Test network connectivity to IPFS gateways
- Try alternative IPFS provider
- Confirm browser allows IPFS gateway connections

**Notification Issues**

Problem: Telegram notifications not received
- Verify bot token from @BotFather is correct
- Confirm chat ID from @userinfobot matches configuration
- Ensure bot is not blocked or removed from chat
- Check API route logs in Vercel dashboard
- Test notification endpoint directly via API route

**Build Errors**

Problem: Production build fails
- Run `npm run type-check` to identify TypeScript errors
- Verify all environment variables are set
- Check Node.js version (18+ required)
- Clear `.next` directory and rebuild
- Review build logs for specific error messages

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
