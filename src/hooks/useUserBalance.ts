import { erc20Abi } from 'viem';
import { useAccount, useChainId, useReadContract } from 'wagmi';

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
      enabled: Boolean(address && chainId),
    },
  });

  return {
    balance,
    isBalanceLoading,
    isBalanceError,
    refetchBalance
  };
}
