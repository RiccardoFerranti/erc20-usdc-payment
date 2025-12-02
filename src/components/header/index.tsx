'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import WalletSection from './wallet-section';

import Balance from '@/components/balance';
import Address from '@/components/address';
import { Button } from '@/components/ui/button';
import Network from '@/components/network';
import { cn } from '@/lib/utils';

export default function Header() {
  const [menu, setMenu] = useState<'home' | 'transactions'>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openConnect, setOpenConnect] = useState(false);

  const pathname = usePathname();
  const { isConnected } = useAccount();

  // Sync menu state with path
  useEffect(() => {
    const normalizedPath = pathname?.split('/')[1] ?? '';
    setMenu(normalizedPath === 'transactions' ? 'transactions' : 'home');
  }, [pathname]);

  // Close wallet dialog on connect
  useEffect(() => {
    if (isConnected) setOpenConnect(false);
  }, [isConnected]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-black md:border-b border-gray-200 dark:border-gray-800">
      <div className="container min-h-[70px] mx-auto px-4 flex items-center gap-4 md:gap-8 md:justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/">
            <h1 className="text-xl text-foreground">USDC Payment Products</h1>
          </Link>
          <DesktopMenu menu={menu} setMenu={setMenu} />
        </div>
        <div className="flex md:flex-col items-end gap-2 ml-auto md:ml-0">
          <div className="flex gap-4">
            <Network />
            <WalletSection isConnected={isConnected} open={openConnect} setOpen={setOpenConnect} />
          </div>
          {/* Mobile Menu Button */}
          <Button
            className="md:hidden cursor-pointer bg-transparent hover:bg-white/20 text-white border border-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={26} />
          </Button>
        </div>
      </div>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} menu={menu} setMenu={setMenu} />
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        {isConnected && (
          <div
            className={cn(`mx-auto container px-4 py-4 flex justify-between ${isConnected ? 'flex-row-reverse' : 'flex-row'}`)}
          >
            <Address />
            <Balance />
          </div>
        )}
      </div>
    </header>
  );
}
