import Faucet from "@/components/faucet";
import ProductsList from "@/components/products-list";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center gap-4 container mx-auto px-4">
      <Faucet />
      <ProductsList />
    </main>
  );
}


