import { Token } from "@/types/Token";
import { lcai, lcaiTestnet } from "./chains";
import config from ".";

export const tokenList: Token[] = [
  // LCAI MAINNET
  {
    chainId: lcai.id,
    symbol: "LCAI",
    name: "LightChainAI",
    address: undefined,
    logoURI: "/images/brand/lcai.svg",
    decimals: 18,
  },
  {
    chainId: lcai.id,
    symbol: "WLCAI",
    name: "Wrapped LightChainAI",
    address: config.WETH[lcai.id],
    logoURI: "/images/brand/lcai.svg",
    decimals: 18,
  },

  // LCAI TESTNET
  {
    chainId: lcaiTestnet.id,
    symbol: "LCAI",
    name: "LightChainAI",
    address: undefined,
    logoURI: "/images/brand/lcai.svg",
    decimals: 18,
  },
  {
    chainId: lcaiTestnet.id,
    symbol: "WLCAI",
    name: "Wrapped LightChainAI",
    address: config.WETH[lcaiTestnet.id],
    logoURI: "/images/brand/lcai.svg",
    decimals: 18,
  },
  {
    chainId: lcaiTestnet.id,
    symbol: "USDT",
    name: "Tether USD",
    address: "0x1f94c0A6Cf48D3075f9713A79f87FA4eEdAF7021",
    logoURI: "/images/brand/usdt.svg",
    decimals: 18,
  },
  {
    chainId: lcaiTestnet.id,
    symbol: "USDC",
    name: "USD Coin",
    address: "0xC11165E7efa25115607E8392f374849256D60122",
    logoURI: "/images/brand/usdc.svg",
    decimals: 18,
  },
];
