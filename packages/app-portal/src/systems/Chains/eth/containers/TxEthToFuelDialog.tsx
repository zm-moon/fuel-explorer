import { useAsset } from '~portal/systems/Assets/hooks/useAsset';
import { shortAddress } from '~portal/systems/Core';
import { useOverlay } from '~portal/systems/Overlay';

import { Button, Dialog, HStack, VStack } from '@fuels/ui';
import { IconTransferIn } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import {
  BridgeSteps,
  BridgeTxOverview,
} from '~portal/systems/Bridge/components';
import { useTxEthToFuel } from '../hooks';

export function TxEthToFuelDialog() {
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { metadata } = useOverlay<{ txId: string }>();
  const {
    steps,
    date,
    asset,
    handlers,
    shouldShowConfirmButton,
    status,
    isLoadingReceipts,
    amount,
    explorerLink,
  } = useTxEthToFuel({
    id: metadata.txId,
  });

  return (
    <VStack className="max-w-sm">
      <Dialog.Title className="mb-0">
        <HStack className="items-center gap-2">
          <IconTransferIn size={20} stroke={1.5} />
          Deposit
        </HStack>
      </Dialog.Title>
      <BridgeSteps steps={steps} />
      <BridgeTxOverview
        transactionId={shortAddress(metadata.txId)}
        date={date}
        isDeposit={true}
        asset={asset}
        isLoading={isLoadingReceipts}
        amount={amount}
        ethAsset={ethAsset}
        explorerLink={explorerLink}
      />
      {shouldShowConfirmButton && (
        <Button
          className={classes.actionButton()}
          isLoading={status?.isConfirmTransactionLoading}
          onClick={handlers.relayMessageToFuel}
        >
          Confirm Transaction
        </Button>
      )}
    </VStack>
  );
}

const styles = tv({
  slots: {
    actionButton: 'w-full',
  },
});
