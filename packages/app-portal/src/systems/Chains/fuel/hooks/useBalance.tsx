import { QUERY_KEYS } from '@fuel-wallet/react';
import { useQuery } from '@tanstack/react-query';
import type { BytesLike, Provider as FuelProvider } from 'fuels';
import { Address } from 'fuels';

export const useBalance = ({
  address,
  assetId,
  provider,
}: {
  address?: string;
  assetId?: BytesLike;
  provider?: FuelProvider;
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.balance, address, assetId],
    queryFn: async () => {
      try {
        // TODO: replace with ETH_ASSET_ID from asset-list package after this task gets done
        // https://linear.app/fuel-network/issue/FRO-144/make-asset-list-package-public-and-publish-in-npm
        const currentFuelBalance = await provider?.getBalance(
          Address.fromString(address || ''),
          assetId ||
            '0x0000000000000000000000000000000000000000000000000000000000000000',
        );
        return currentFuelBalance || null;
      } catch (_error: unknown) {
        return null;
      }
    },
    enabled: !!provider,
  });

  return {
    balance: query.data || undefined,
    ...query,
  };
};
