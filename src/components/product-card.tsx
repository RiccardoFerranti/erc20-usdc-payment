'use client';

import Image from 'next/image';

import PayButton  from '@/components/pay-button';
import type { IProductRecord } from '@/consts/products';

interface IProductCardProps {
  product: IProductRecord;
  calculateTotalAmount: (price: number, add?: boolean) => void;
  isDisabledBuy: boolean;
  registerToastId: (id: string | number) => void;
};

export default function ProductCard(props: IProductCardProps) {
  const { product, calculateTotalAmount, isDisabledBuy, registerToastId } = props;

  return (
    <div className="bg-white rounded-xl overflow-hidden flex border-4 hover:border-indigo-600">
      <div className="relative w-40 h-full shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2"
          sizes="160px"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="uppercase tracking-wide text-md text-indigo-500 font-bold">{product.name}</div>
        <div className="tracking-wide text-sm text-indigo-400 font-semibold">{product.description}</div>
        <p className="text-gray-500">Price: ${product.price}</p>
        <PayButton
          price={product.price}
          name={product.name}
          calculateTotalAmount={calculateTotalAmount}
          isDisabledBuy={isDisabledBuy}
          registerToastId={registerToastId}
        />
      </div>
    </div>
  );
};
