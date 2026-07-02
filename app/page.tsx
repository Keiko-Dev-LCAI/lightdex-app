import SwapForm from "@/components/swap-form";
import SwapPoolsTabs from "@/components/swap-pools-tabs";

export default function Home() {
  return (
    <div className="container py-12 max-w-lg mx-auto space-y-4">
      <SwapPoolsTabs />
      <SwapForm />
    </div>
  );
}
