import { erc20Abi } from 'viem';
import { useReadContract } from 'wagmi';

export default function useSymbol(tokenContract: string, chainId: number) {
  const { data: symbol, isLoading: isSymbolLoading, isError: isSymbolError } = useReadContract({
    address: tokenContract as `0x${string}`,
    abi: erc20Abi,
    functionName: 'symbol',
    chainId
  });

  return {
    symbol,
    isSymbolLoading,
    isSymbolError
  };
}
