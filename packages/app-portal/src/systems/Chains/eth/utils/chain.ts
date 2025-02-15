import type { SupportedChain } from '../../types';
import { ETH_CHAINS } from '../chains';

export const isEthChain = (chain: SupportedChain | undefined | null) => {
  return !!Object.keys(ETH_CHAINS).find(
    (key) => ETH_CHAINS[key].network === chain?.network,
  );
};
