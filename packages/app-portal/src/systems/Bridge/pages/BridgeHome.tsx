import { useNodeInfo } from '@fuel-wallet/react';
import { Box, Button } from '@fuels/ui';
import {
  IconArrowBack,
  IconArrowsShuffle,
  IconHistory,
} from '@tabler/icons-react';
import { FUEL_VERSION, PageTitle } from 'app-commons';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { Routes } from '~portal/routes';
import { FuelVersionDialog } from '~portal/systems/Chains/fuel/containers/FuelVersionDialog';

type BridgeHomeProps = {
  children: ReactNode;
};

export const BridgeHome = ({ children }: BridgeHomeProps) => {
  const classes = styles();
  const { isCompatible } = useNodeInfo({ version: FUEL_VERSION });
  const pathname = usePathname();
  const isBridgeHistory = pathname === Routes.bridgeHistory();

  return (
    <Box className={classes.content()}>
      <PageTitle
        size="2"
        icon={<IconArrowsShuffle size={18} stroke={1.5} />}
        className="border-b-0 first:mb-0"
        rightElement={
          isBridgeHistory ? (
            <Button
              as={NextLink}
              prefetch
              href={Routes.bridge()}
              size="1"
              color="gray"
              variant="ghost"
              leftIcon={IconArrowBack}
              className="rounded-md"
            >
              Back
            </Button>
          ) : (
            <Button
              as={NextLink}
              prefetch
              href={Routes.bridgeHistory()}
              size="1"
              color="gray"
              variant="ghost"
              leftIcon={IconHistory}
              className="rounded-md"
            >
              History
            </Button>
          )
        }
      >
        Fuel Native Bridge
      </PageTitle>
      <FuelVersionDialog isOpen={!(isCompatible ?? true)} />
      {children}
    </Box>
  );
};

const styles = tv({
  slots: {
    content: 'w-full max-w-[455px]',
    tabs: 'ml-0 color-inherit decoration-none :active:text-success',
    toggle: [
      'w-full mb-4 rounded-md fuel-[ToggleGroupItem]:h-9',
      'fuel-[ToggleGroupItem]:text-md',
    ],
  },
});
