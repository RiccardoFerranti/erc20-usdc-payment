'use client';

import { useAccount, useChainId } from 'wagmi';
import { formatUnits } from 'viem';

import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { USDC_TOKEN_ADDRESS } from '@/consts/usdc';
import { useTokenInfo } from '@/hooks/use-token-info';

export default function Balance() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();

  const {
    decimals,
    symbol,
    balance,
    isLoading,
    isError
  } = useTokenInfo(USDC_TOKEN_ADDRESS, chainId, address);

  if (!isConnected) return null;

  if (isError) {
    return <div className="text-sm text-red-600 flex flex-col">Unable to load your {symbol} balance.</div>;
  }

  let formattedAmount = '0';
  if (balance && decimals) {
    formattedAmount = formatUnits(balance, decimals); // 10000000n => 10 USDC
  }

  return (
    <Badge
      className="flex items-center self-end bg-transparent hover:bg-transparent gap-3 p-2 rounded-md text-sm text-white border
        dark:border-gray-800"
    >
      <span className="text-sm text-indigo-100/80">Balance:</span>
      {isLoading ? (
        <Skeleton className="h-4 w-[150px]" />
      ) : (
        <span className="text-sm font-bold">
          {formattedAmount} {symbol}
        </span>
      )}
    </Badge>
  );
}
