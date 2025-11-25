'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePay } from '@/components/hooks/use-pay';

interface IPayButtonProps {
  price: number;
  name: string;
  calculateTotalAmount: (price: number, add?: boolean) => void;
  isDisabledBuy: boolean;
  registerToastId: (id: string | number) => void;
}

export default function PayButton(props: IPayButtonProps) {
  const { price, name, calculateTotalAmount, isDisabledBuy, registerToastId } = props;

  const { handlePayment, isTxPending } = usePay({
    price,
    name,
    calculateTotalAmount,
    registerToastId,
  });

  return (
    <Button
      type="button"
      disabled={isTxPending || isDisabledBuy}
      className={cn(
        `mt-auto max-w-35 px-4 py-2 text-sm font-medium rounded-md text-white cursor-pointer
        ${(isTxPending || isDisabledBuy) ? 'bg-gray-400 hover:bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`
      )}
      onClick={handlePayment}
    >
      {isTxPending ? 'Confirming...' : 'BUY'}
    </Button>
  );
}
