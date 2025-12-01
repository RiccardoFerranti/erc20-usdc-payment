'use client';

import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IDesktopMenuProps {
  menu: 'home' | 'transactions';
  setMenu: Dispatch<SetStateAction<'home' | 'transactions'>>;
}

export default function DesktopMenu(props: IDesktopMenuProps) {
  const { menu, setMenu } = props;

  return (
    <nav
      className="hidden md:flex items-center gap-4 *:hover:text-indigo-500 *:bg-transparent *:hover:bg-transparent
  *:text-base"
    >
      <Button
        asChild
        onClick={() => setMenu('home')}
        className={cn(menu === 'home' ? 'text-indigo-400 font-bold' : 'text-white')}
      >
        <Link href="/">Products</Link>
      </Button>
      |
      <Button
        asChild
        onClick={() => setMenu('transactions')}
        className={cn(menu === 'transactions' ? 'text-indigo-400 font-bold' : 'text-white')}
      >
        <Link href="/transactions">Latest Tx</Link>
      </Button>
    </nav>
  );
}
