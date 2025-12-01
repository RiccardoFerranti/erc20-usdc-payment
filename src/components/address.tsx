import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { shortenAddress } from '@/utils/short-address';

export default function Address() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) return;

  const shortAddress = shortenAddress(address ?? '');

  return (
    <div className='flex items-left gap-3'>
      <div className='flex items-center gap-3'>
        <Badge
          className="p-2 rounded-md text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
        >
          {shortAddress}
        </Badge>
      </div>
      <Button
        onClick={() => disconnect()}
        className='cursor-pointer bg-transparent hover:bg-transparent text-white border dark:border-gray-800'
        type='button'
      >
        <LogOut className='h-5' />
      </Button>
    </div>
  );
}
