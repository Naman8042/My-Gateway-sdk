Crypto Payment Gateway SDK

A simple way for merchants to **accept crypto payments** on-chain using **Next.js, wagmi, viem, react-query, and Solidity smart contracts**.  
This SDK provides ready-to-use hooks like `usePay`, `useWithdraw`, and `useMerchantBalance` for quick integration.

---

## 📦 Installation

```bash
# Step 1: Create a Vite project
npm create vite@latest my-cryptoproject
cd my-cryptoproject

# Step 2: Install dependencies
npm install wagmi viem @tanstack/react-query my-gateway-sdk


⚙️ Setup

In your main entry file (main.tsx or index.tsx):

import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http() // Replace with your Alchemy/Infura URL for reliability
  }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

🔑 Wallet Connection

Use wagmi to connect/disconnect wallets.

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function ConnectButton() {
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}

💰 Merchant Balance

Fetch merchant balance using the SDK.

import { useMerchantBalance } from "my-gateway-sdk";

function MerchantDashboard({ merchant }: { merchant: `0x${string}` }) {
  const { balance, isLoading, refetch } = useMerchantBalance(merchant);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <p>Merchant Balance: {balance?.toString()} wei</p>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}

💸 Accept Payments

Use the usePay hook to send payments to a merchant.

import { usePay } from "my-gateway-sdk";

export function PayButton() {
  const { pay, isPending, isConfirming } = usePay();

  const handlePay = async () => {
    try {
      // Pay 0.01 ETH (in wei)
      await pay("0xMerchantRegisteredWalletAddress", BigInt("10000000000000000"));
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  return (
    <button onClick={handlePay} disabled={isPending || isConfirming}>
      {isPending ? "Sending..." : isConfirming ? "Confirming..." : "Pay"}
    </button>
  );
}

🏦 Withdraw Funds

Merchants can withdraw their funds with the useWithdraw hook.

import { useWithdraw } from "my-gateway-sdk";

export function WithdrawButton() {
  const { withdraw, isPending, isConfirming } = useWithdraw();

  const handleWithdraw = async () => {
    try {
      // Withdraw 0.05 ETH (in wei)
      await withdraw(BigInt("50000000000000000"));
    } catch (error) {
      console.error("Withdraw failed:", error);
    }
  };

  return (
    <button onClick={handleWithdraw} disabled={isPending || isConfirming}>
      {isPending ? "Withdrawing..." : isConfirming ? "Confirming..." : "Withdraw"}
    </button>
  );
}

📂 Example App
import { ConnectButton } from "./ConnectButton";
import MerchantDashboard from "./MerchantDashboard";
import { PayButton } from "./Pay";
import { WithdrawButton } from "./Withdraw";

function App() {
  return (
    <div>
      <h1>Crypto Payment Gateway</h1>
      <ConnectButton />
      <MerchantDashboard merchant="0x1234...abcd" />
      <PayButton />
      <WithdrawButton />
    </div>
  );
}

export default App;
