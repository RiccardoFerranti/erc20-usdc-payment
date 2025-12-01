"use client";

import Faucet from '@/components/faucet';
import ProductsList from '@/components/products-list';
import Balance from '@/components/balance';
import useIsDesktop from '@/hooks/use-is-desktop';

export default function HomePage() {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-end w-full">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl">Products</h1>
        {isDesktop && <Balance />}
      </div>
      <Faucet />
      <ProductsList />
    </div>
  );
}
