'use client';

import type { Dispatch, SetStateAction } from 'react';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Address from '@/components/address';
import WalletInfo from '@/components/wallet-info';

interface IWalletSectionProps {
  isConnected: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function WalletSection(props: IWalletSectionProps) {
  const { isConnected, open, setOpen } = props;

  return (
    <>
      {!isConnected ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="max-w-50 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600
            hover:bg-indigo-700 cursor-pointer">
              <span className="hidden md:inline">Connect Wallet</span>
              <span className="md:hidden">Connect</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect the wallet</DialogTitle>
            </DialogHeader>
            <WalletInfo />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="hidden md:flex flex-col gap-1">
          <Address />
        </div>
      )}
    </>
  );
}
