'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IBackButtonProps {
  className: string;
}

export default function BackButton(props: IBackButtonProps) {
  const { className } = props;

  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={cn(`cursor-pointer bg-transparent hover:bg-transparent text-white border dark:border-gray-800 ${className}`)}
    >
      <ArrowLeft />
      Back
    </Button>
  );
}
