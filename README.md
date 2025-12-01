# Web3 Demo Store — USDC Payments (Sepolia)

A demo **Web3 e-commerce app** built with **Next.js**, **Wagmi**, **viem**, **Tailwind CSS**, and **shadcn/ui**.

Users can **connect a wallet**, **claim testnet USDC** from a faucet, and **purchase demo products** using **ERC-20 USDC on Sepolia** by sending tokens to a chosen recipient address.

---

## Live Demo

Try the DApp here:  
[https://erc20-usdc-payment.vercel.app/](https://erc20-usdc-payment.vercel.app/)

## What This Project Does

This project is a technical showcase demonstrating how to build a basic Web3 payment flow.

It showcases how to:

* **Connect a crypto wallet** (MetaMask, WalletConnect, etc.).
* **Validate Ethereum recipient addresses**.
* **Claim ERC-20 USDC (testnet)** from a faucet.
* **Buy products** using USDC on Sepolia.
* Dynamically choose the **recipient address** that receives the payment.
* Handle all transaction states: **loading, errors, and confirmations**.
* **Track and display the latest transactions** in a dedicated page with pending, success, and failed statuses.

> **Note:** This is a technical showcase, **not a production store**.

---

## Environment Variable

The app loads a default recipient address from your environment:

`NEXT_PUBLIC_RECIPIENT_ADDRESS`

> This is the wallet that will receive the USDC if the user doesn't override it.
>
> **UI Explanation:** *“This is the default recipient address (Sepolia only). You can replace it with your own wallet below. All purchased USDC will be sent to this address.”*

---

## Tech Stack

* **Next.js 14** (App Router)
* **React 19**
* **TypeScript**
* **Wagmi** + **Viem** (for Web3 interaction)
* **Tailwind CSS**
* **shadcn/ui**
* **Zustand** (state management for transactions)
* **Etherscan Sepolia** for transaction confirmations

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables
Create a .env.local file by copying the .env.example in the root of your project and filling in the details:
```bash
# USDC TOKEN ADDRESS (Sepolia contract address)
NEXT_PUBLIC_USDC_TOKEN_ADDRESS=0x...

# USDC RECIPIENT ADDRESS
NEXT_PUBLIC_RECIPIENT_ADDRESS=0x...

# ETHERSCAN SEPOLIA (for transaction inspecting)
NEXT_PUBLIC_ETHERSCAN_URL=https://sepolia.etherscan.io/tx/
```

### 3. Run the app
First, run the development server:

```npm run dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
