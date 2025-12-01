import { erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export default function useDecimals(tokenContract: string) {
  const { data: decimals, isLoading: isDecimalsLoading, isError: isDecimalsError } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  return {
    decimals,
    isDecimalsLoading,
    isDecimalsError
  };
}
