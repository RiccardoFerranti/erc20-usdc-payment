'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface IMobileMenuProps {
  menu: 'home' | 'transactions';
  setMenu: (menu: 'home' | 'transactions') => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function MobileMenu(props: IMobileMenuProps) {
  const { menu, setMenu, menuOpen, setMenuOpen } = props;

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <nav
            className="flex flex-col gap-2 *:hover:text-indigo-500 *:bg-transparent *:hover:bg-transparent *:text-base py-2
              border-t border-gray-200 dark:border-gray-800"
          >
            <Button
              asChild
              onClick={() => {
                setMenu('home');
                setMenuOpen(false);
              }}
              className={cn(menu === 'home' ? 'text-indigo-400 font-bold' : 'text-white')}
            >
              <Link href="/">Products</Link>
            </Button>
            <Separator className="h-px bg-gray-200! dark:bg-gray-800!" />
            <Button
              asChild
              onClick={() => {
                setMenu('transactions');
                setMenuOpen(false);
              }}
              className={cn(menu === 'transactions' ? 'text-indigo-400 font-bold' : 'text-white')}
            >
              <Link href="/transactions">Latest Tx</Link>
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
