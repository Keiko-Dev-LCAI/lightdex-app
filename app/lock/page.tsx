"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import pairAbi from "@/contracts/pairAbi";
import useWeb3Clients from "@/hooks/useWeb3Clients";
import { cn, formatNumber } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { formatEther, getContract, isAddress } from "viem";
import { useAccount } from "wagmi";

type Tab = "lock" | "burn";

const DATE_PRESETS = [
  { label: "1 Month", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "1 Year", days: 365 },
];

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString([], { dateStyle: "medium" });
}

function toDateInputValue(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function LockPage() {
  const [tab, setTab] = useState<Tab>("lock");
  const [lockPoolAddr, setLockPoolAddr] = useState("");
  const [burnPoolAddr, setBurnPoolAddr] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [lockDays, setLockDays] = useState(30);
  const [unlockDate, setUnlockDate] = useState(addDays(30));
  const [lockLpBal, setLockLpBal] = useState<bigint>(0n);
  const [burnLpBal, setBurnLpBal] = useState<bigint>(0n);

  const { address } = useAccount();
  const { publicClient } = useWeb3Clients();

  const lockBalDisplay = useMemo(
    () => (lockLpBal > 0n ? formatNumber(formatEther(lockLpBal)) : ""),
    [lockLpBal]
  );
  const burnBalDisplay = useMemo(
    () => (burnLpBal > 0n ? formatNumber(formatEther(burnLpBal)) : ""),
    [burnLpBal]
  );

  useEffect(() => {
    if (!address || !publicClient || !isAddress(lockPoolAddr)) {
      setLockLpBal(0n);
      return;
    }
    const pair = getContract({
      address: lockPoolAddr as `0x${string}`,
      abi: pairAbi,
      client: publicClient,
    });
    pair.read
      .balanceOf([address])
      .then(setLockLpBal)
      .catch(() => setLockLpBal(0n));
  }, [address, publicClient, lockPoolAddr]);

  useEffect(() => {
    if (!address || !publicClient || !isAddress(burnPoolAddr)) {
      setBurnLpBal(0n);
      return;
    }
    const pair = getContract({
      address: burnPoolAddr as `0x${string}`,
      abi: pairAbi,
      client: publicClient,
    });
    pair.read
      .balanceOf([address])
      .then(setBurnLpBal)
      .catch(() => setBurnLpBal(0n));
  }, [address, publicClient, burnPoolAddr]);

  const setLockPreset = (days: number) => {
    setLockDays(days);
    setUnlockDate(addDays(days));
  };

  const setLockPct = (pct: number) => {
    if (lockLpBal <= 0n) return;
    const full = parseFloat(formatEther(lockLpBal));
    setLockAmount((full * (pct / 100)).toFixed(8));
  };

  const setBurnPct = (pct: number) => {
    if (burnLpBal <= 0n) return;
    const full = parseFloat(formatEther(burnLpBal));
    setBurnAmount((full * (pct / 100)).toFixed(8));
  };

  const onCustomDate = (value: string) => {
    if (!value) return;
    const d = new Date(value + "T12:00:00");
    setUnlockDate(d);
    setLockDays(0);
  };

  return (
    <div className="container py-12">
      <Card className="relative w-full max-w-lg mx-auto border-2 border-[rgba(135,135,135,0.15)] dark:border-[#333f53] shadow-[0_4px_20px_rgba(0,0,0,0.2)] bg-[var(--clr-gray-100)] dark:bg-[var(--clr-darker-two)] overflow-hidden">
        <CardContent className="grid gap-5 pt-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--clr-black)] dark:text-[var(--clr-heading)]">
              Lock Liquidity
            </h1>
            <p className="mt-2 text-sm text-[var(--clr-body)]">
              Time-lock your LP tokens to signal commitment. Unlock date can be
              extended but never shortened.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-0 rounded-xl bg-[var(--clr-gray-100)] dark:bg-[var(--clr-blackest)] p-1">
            {(["lock", "burn"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-lg px-6 py-2 text-sm font-bold capitalize transition-colors",
                  tab === t
                    ? "border border-[rgba(135,135,135,0.2)] dark:border-[#333f53] bg-card text-[var(--clr-black)] dark:text-[var(--clr-heading)]"
                    : "text-[var(--clr-body)]"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "lock" ? (
            <div className="relative grid gap-4">
              <div>
                <Label className="text-[var(--clr-body)]">LP Token Address</Label>
                <Input
                  className="mt-2"
                  placeholder="0x… paste your LP token address"
                  value={lockPoolAddr}
                  onChange={(e) => setLockPoolAddr(e.target.value)}
                />
              </div>

              <div>
                <Label className="flex justify-between text-[var(--clr-body)]">
                  <span>LP Amount</span>
                  {lockBalDisplay && (
                    <span className="text-[#00d4ff]">Balance: {lockBalDisplay}</span>
                  )}
                </Label>
                <Input
                  className="mt-2 text-lg font-bold"
                  type="number"
                  placeholder="0.0"
                  min={0}
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <Button
                    key={pct}
                    type="button"
                    variant="outline"
                    className="text-sm"
                    onClick={() => setLockPct(pct)}
                  >
                    {pct}%
                  </Button>
                ))}
              </div>

              <div>
                <Label className="text-[var(--clr-body)]">Unlock Date</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DATE_PRESETS.map((preset) => (
                    <Button
                      key={preset.days}
                      type="button"
                      variant={lockDays === preset.days ? "default" : "outline"}
                      className="text-xs sm:text-sm"
                      onClick={() => setLockPreset(preset.days)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <Input
                  className="mt-3"
                  type="date"
                  value={toDateInputValue(unlockDate)}
                  onChange={(e) => onCustomDate(e.target.value)}
                />
              </div>

              <div className="rounded-xl border border-[rgba(135,135,135,0.2)] dark:border-[#333f53] bg-[var(--clr-gray-100)] dark:bg-[var(--clr-blackest)] p-4 text-sm leading-relaxed text-[var(--clr-body)]">
                LP returns to your wallet only after{" "}
                <strong className="text-[var(--clr-black)] dark:text-[var(--clr-heading)]">
                  {formatDate(unlockDate)}
                </strong>
                . The lock contract is non-custodial — only you can withdraw.
              </div>

              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/70 backdrop-blur-[2px]">
                <div className="max-w-xs px-6 text-center">
                  <div className="text-4xl">🔒</div>
                  <p className="mt-3 text-sm text-white">
                    <strong>LP Locker coming soon</strong>
                    <br />
                    The LightDex locker contract is being finalized. Add liquidity
                    now and lock it once the locker launches.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative grid gap-4">
              <div>
                <Label className="text-[var(--clr-body)]">LP Token Address</Label>
                <Input
                  className="mt-2"
                  placeholder="0x… paste your LP token address"
                  value={burnPoolAddr}
                  onChange={(e) => setBurnPoolAddr(e.target.value)}
                />
              </div>

              <div>
                <Label className="flex justify-between text-[var(--clr-body)]">
                  <span>LP Amount to Burn</span>
                  {burnBalDisplay && (
                    <span className="text-[#00d4ff]">Balance: {burnBalDisplay}</span>
                  )}
                </Label>
                <Input
                  className="mt-2 text-lg font-bold"
                  type="number"
                  placeholder="0.0"
                  min={0}
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <Button
                    key={pct}
                    type="button"
                    variant="outline"
                    className="text-sm"
                    onClick={() => setBurnPct(pct)}
                  >
                    {pct}%
                  </Button>
                ))}
              </div>

              <div className="rounded-xl border border-[rgba(135,135,135,0.2)] dark:border-[#333f53] bg-[var(--clr-gray-100)] dark:bg-[var(--clr-blackest)] p-4 text-sm leading-relaxed text-[var(--clr-body)]">
                Burning LP tokens is{" "}
                <strong className="text-red-500">permanent and irreversible</strong>
                . The underlying liquidity is locked in the pool forever. Use this
                only to provide on-chain proof of permanent liquidity.
              </div>

              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/70 backdrop-blur-[2px]">
                <div className="max-w-xs px-6 text-center">
                  <div className="text-4xl">🔥</div>
                  <p className="mt-3 text-sm text-white">
                    <strong>LP Burn coming soon</strong>
                    <br />
                    Permanent burn will be available once the LightDex locker
                    contract launches.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}