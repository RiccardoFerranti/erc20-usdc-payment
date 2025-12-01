import { erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

/**
 * Custom hook to fetch ERC20 token info (decimals, symbol, and optional balance) for a given contract and user.
 *
 * Uses multicall via useReadContracts for efficient fetch of:
 * - decimals (token divisibility)
 * - symbol (token ticker)
 * - user's balance (if userAddress is provided)
 *
 * @param tokenContract - The contract address of the token (as 0x-prefixed string)
 * @param chainId - The chain ID to query against
 * @param userAddress - (Optional) The user's address to fetch their token balance
 *
 * @returns An object containing:
 *  - decimals: number|null
 *  - symbol: string|null
 *  - balance: bigint|null
 *  - isLoading: boolean
 *  - isError: boolean
 */

export function useTokenInfo(tokenContract: `0x${string}`, chainId: number, userAddress?: `0x${string}`) {
  const baseContracts = [
    {
      address: tokenContract,
      abi: erc20Abi,
      functionName: "decimals",
      chainId,
    },
    {
      address: tokenContract,
      abi: erc20Abi,
      functionName: "symbol",
      chainId,
    },
  ];

  const contracts = userAddress
    ? [
        ...baseContracts,
        {
          address: tokenContract,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [userAddress],
          chainId,
        },
      ]
    : baseContracts;

  const { data, isLoading, isError } = useReadContracts({
    contracts,
  });

  const decimals = data?.[0]?.result ? Number(data?.[0]?.result) : null;
  const symbol = data?.[1]?.result ? String(data?.[1]?.result) : null;
  const balance = data?.[2]?.result ? BigInt(data?.[2]?.result) : null;

  return {
    decimals,
    symbol,
    balance,
    isLoading,
    isError
  };
}
