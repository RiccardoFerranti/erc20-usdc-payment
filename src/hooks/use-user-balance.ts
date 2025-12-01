import { erc20Abi } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';

/**
 * React hook to fetch the connected user's ERC20 token balance.
 *
 * @param {string} tokenContract - The address of the ERC20 token contract.
 * @returns {{
 *   balance: bigint | undefined,
 *   isBalanceLoading: boolean,
 *   isBalanceError: boolean,
 *   refetchBalance: () => void
 * }} An object containing the user's balance, loading state, error state, and a refetch function.
 */

export default function useUserBalance(tokenContract: string) {
  const { address } = useAccount();
  const chainId = useChainId();

  const { data: balance, isLoading: isBalanceLoading, isError: isBalanceError, refetch: refetchBalance } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId,
    query: {
      enabled: Boolean(address),
    },
  });

  return {
    balance,
    isBalanceLoading,
    isBalanceError,
    refetchBalance
  };
}
