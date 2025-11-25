"use client";

import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';

import { Skeleton } from '@/components/ui/skeleton';
import useDecimals from '@/hooks/useDecimals';
import useSymbol from '@/hooks/useSymbol';
import useUserBalance from '@/hooks/useUserBalance';
import { USDC_TOKEN_ADDRESS } from '@/consts/usdc';

export default function Balance() {
  const { isConnected } = useAccount();

  const { decimals, isDecimalsLoading, isDecimalsError } = useDecimals(USDC_TOKEN_ADDRESS);
  const { balance, isBalanceLoading, isBalanceError} = useUserBalance(USDC_TOKEN_ADDRESS);
  const { symbol, isSymbolLoading, isSymbolError } = useSymbol(USDC_TOKEN_ADDRESS);

  if (!isConnected) return null;

  if (isDecimalsError || isBalanceError || isSymbolError)  {
    return (<div className='text-sm text-red-600 flex flex-col'>
      Unable to load your {symbol} balance.
    </div>);
  }

  let formattedAmount = '0';
  if (balance && decimals) {
    formattedAmount = formatUnits(balance, decimals); // 10000000n => 10 USDC
  }

  const isLoading = isDecimalsLoading || isBalanceLoading || isSymbolLoading;

  return (
    <div className='flex items-center gap-3'>
      <span className='text-sm text-indigo-100/80'>Balance:</span>
      {
        isLoading ?
          <Skeleton className="h-4 w-[150px]" />
        :
          <span className='text-md font-bold'>{formattedAmount} {symbol}</span>
      }
    </div>
  );
}
