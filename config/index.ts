import { Chain } from "viem/chains";
import { lcai, lcaiTestnet } from "./chains";

const config = {
  chains: [lcai] as [Chain, ...Chain[]],

  routerV2Address: {
    [lcai.id]: "0x4e5cF7992699216c489425E18fcD76852686542D",
    [lcaiTestnet.id]: "0xBA502917c3F7233F9100f9430f4048a224A7D8DE",
  } as Record<number, `0x${string}`>,

  factoryV2Address: {
    [lcai.id]: "0xEBfA227E7E001d498543D8E31F7780bC7024465B",
    [lcaiTestnet.id]: "0xeBf97f16d843bFD9d9E6B1857B4C00d94ca7e2B2",
  } as Record<number, `0x${string}`>,

  WETH: {
    [lcai.id]: "0xeBf97f16d843bFD9d9E6B1857B4C00d94ca7e2B2",
    [lcaiTestnet.id]: "0x89bFfFFb1Ca7821b7230a6a7479Fa93A7bDd7c16",
  } as Record<number, `0x${string}`>,
};

export default config;
