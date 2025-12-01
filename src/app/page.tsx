'use client';

import Faucet from '@/components/faucet';
import ProductsList from '@/components/products-list';
import Balance from '@/components/balance';
import useIsDesktop from '@/hooks/use-is-desktop';

export default function HomePage() {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center">
        <div className="flex-1" />
        <h1 className="flex-1 text-center text-xl md:text-2xl">Products</h1>
        <div className="flex-1 flex justify-end">{isDesktop && <Balance />}</div>
      </div>
      <Faucet />
      <ProductsList />
    </div>
  );
}
