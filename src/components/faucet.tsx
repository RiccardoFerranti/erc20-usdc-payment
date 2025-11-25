"use client";

import RecipientAddress from '@/components/recipient-address';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function Faucet() {
  return (
    <div className="flex flex-col items-center justify-between gap-3 border border-white/20 p-4 rounded-2xl">
      <div className='flex items-center justify-between gap-3 w-full'>
        <p>
          You can get up to <b>10 USDC</b> per hour to test the dApp by clicking the button which will open the faucet page
        </p>
        <a href="https://faucet.circle.com/" target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
            focus:ring-indigo-500 cursor-pointer"
          >
            Get USDC
          </Button>
        </a>
      </div>
      <Separator />
      <RecipientAddress />
    </div>
  );
}
