UI for Axelar powered bridge for RMRK tokens

## Tech Stack

This application is built using a modern Web3 development stack:

- **[Next.js](https://nextjs.org/)** - React framework for production-grade applications
- **[RainbowKit](https://rainbowkit.com)** - Best-in-class React library for wallet connection
- **[wagmi](https://wagmi.sh)** - React hooks library for Ethereum
- **[Viem](https://viem.sh/)** - TypeScript interface for Ethereum interaction
- **[Chakra-UI](https://chakra-ui.com/)** - Modular and accessible component library
- **[Axelar](https://axelar.network/)** - Cross-chain infrastructure for token bridging

## Getting Started

Follow these steps to run the application locally:

### Prerequisites

- **Node.js** (v16 or higher)
- **Yarn** package manager
- **Web3 wallet** (MetaMask, WalletConnect, etc.) for testing

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rmrk-token-bridge-app
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up environment variables** (if applicable):
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

### Running the Development Server

1. **Start the development server:**
   ```bash
   yarn dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

3. **Connect your wallet:**
   - Make sure you have a Web3 wallet extension installed
   - Connect your wallet through the application interface
   - Ensure you have test tokens on supported networks

### Development

- Edit pages in `pages/` directory - changes will auto-reload
- Modify components in `components/` directory
- Update styles using Chakra-UI components and theming
- The application will hot-reload as you make changes

## Learn More

To learn more about this stack, take a look at the following resources:

- [RainbowKit Documentation](https://rainbowkit.com) - Learn how to customize your wallet connection flow.
- [Viem Documentation](https://viem.sh/) - Learn to interact with the Ethereum Blockchain and its ecosystem.
- [wagmi Documentation](https://wagmi.sh) - Learn how to create calls and react hooks for EVM with ease.
- [Next.js Documentation](https://nextjs.org/docs) - Learn how to build a Next.js application.
- [Chakra-UI Documentation](https://chakra-ui.com/) - Learn how to build UI with a modular and accessible components library based on [Emotion](https://emotion.sh/docs/introduction)


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
