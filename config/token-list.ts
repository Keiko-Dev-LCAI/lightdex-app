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
  {
    chainId: lcai.id,
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    logoURI: "/images/brand/usdt.svg",
    decimals: 6,
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
    symbol: "USDC",
    name: "USD Coin",
    address: "0xC11165E7efa25115607E8392f374849256D60122",
    logoURI: "/images/brand/usdc.svg",
    decimals: 18,
  },
];
