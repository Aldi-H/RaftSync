import React from 'react';
import { AlertDialog, Button, Center } from 'native-base';

const AlertDialogComponent = ({
  leastDestructiveRef,
  isOpen,
  onClose,
  cancelRef,
  onDeleteItem,
}) => {
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={leastDestructiveRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="fade">
        <AlertDialog.Content>
          <AlertDialog.Header
            _text={{
              fontFamily: 'heading',
              fontWeight: '700',
              fontSize: 'lg',
              fontStyle: 'normal',
              color: 'coolGray.700',
            }}>
            Hapus Device
          </AlertDialog.Header>
          <AlertDialog.Body
            _text={{
              fontFamily: 'body',
              fontWeight: '500',
              fontSize: 'sm',
              color: 'coolGray.600',
            }}>
            Apakah anda yakin? Anda tidak dapat membatalkan tindakan ini
            setelahnya
          </AlertDialog.Body>
          <AlertDialog.Footer justifyContent="space-between" alignItems="right">
            <Button
              ref={cancelRef}
              onPress={onClose}
              _text={{
                fontFamily: 'heading',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: 'sm',
                color: 'coolGray.50',
              }}>
              Cancel
            </Button>
            <Button
              onPress={onDeleteItem}
              colorScheme="red"
              _text={{
                fontFamily: 'heading',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: 'sm',
                color: 'coolGray.50',
              }}>
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertDialogComponent;
