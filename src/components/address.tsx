import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/utils/short-address';

export default function Address() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) return;

  const shortAddress = shortenAddress(address ?? '');

  return (
    <div className='flex items-left gap-3'>
      <div className='flex items-center gap-3'>
        <span className='text-sm text-indigo-100/80'>Address:</span>
        <span className='text-mf font-bold'>{shortAddress}</span>
      </div>
      <Button
        onClick={() => disconnect()}
        className='cursor-pointer bg-transparent hover:bg-transparent text-white'
        type='button'
      >
        <LogOut className='h-5' />
      </Button>
    </div>
  );
}
