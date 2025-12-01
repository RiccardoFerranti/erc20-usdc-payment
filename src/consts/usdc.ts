export const USDC_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS as `0x${string}`;
export const RECIPIENT_ADDRESS = process.env.NEXT_PUBLIC_RECIPIENT_ADDRESS as `0x${string}`;
export const ETHERSCAN_SEPOLIA = process.env.NEXT_PUBLIC_ETHERSCAN_URL as `0x${string}`;
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!USDC_TOKEN_ADDRESS) {
  throw new Error("NEXT_PUBLIC_USDC_TOKEN_ADDRESS is not defined");
}

if (!RECIPIENT_ADDRESS) {
  throw new Error("NEXT_PUBLIC_RECIPIENT_ADDRESS is not defined");
}

if (!ETHERSCAN_SEPOLIA) {
  throw new Error("NEXT_PUBLIC_ETHERSCAN_URL is not defined");
}

if (!PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
}
