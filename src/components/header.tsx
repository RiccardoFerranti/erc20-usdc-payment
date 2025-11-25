"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";

import { Button } from '@/components/ui/button';
import Balance from "@/components/balance";
import Address from "@/components/address";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import WalletInfo from "@/components/wallet-info";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) setOpen(false);
  }, [isConnected]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container min-h-[90px] mx-auto px-4 py-4 h-full flex items-center justify-between">
        <h1 className="text-xl font-semibold text-foreground">
          USDC Payment Products
        </h1>
        {!isConnected ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="max-w-50 px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                cursor-pointer">
                Connect wallet
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
          <div className="flex flex-col gap-1">
            <Address />
            <Separator className="h-px bg-gray-400/30"/>
            <Balance />
          </div>
        )}
      </div>
    </header>
  );
}
