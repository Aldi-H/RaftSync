import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, Platform } from 'react-native';
import { Actionsheet, Box, FormControl, Input, VStack } from 'native-base';

const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = useState(0);
  const subscriptions = useRef([]);

  useEffect(() => {
    subscriptions.current = [
      Keyboard.addListener('keyboardDidHide', e => setBottom(0)),
      Keyboard.addListener('keyboardDidShow', e => {
        if (Platform.OS === 'android') {
          setBottom(e.endCoordinates.height);
        } else {
          setBottom(
            Math.max(e.startCoordinates.height, e.endCoordinates.height),
          );
        }
      }),
    ];

    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};

const ModalComponent = ({ isOpen, onClose }) => {
  const bottomInset = useKeyboardBottomInset();

  return (
    <Box>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bottom={bottomInset}>
          <VStack width="90%" space={2} pb="4">
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'md',
                  color: 'coolGray.700',
                }}>
                Id Device
              </FormControl.Label>
              <Input placeholder="Id Device" />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'md',
                  color: 'coolGray.700',
                }}>
                Nama Device
              </FormControl.Label>
              <Input placeholder="Nama Device" />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'md',
                  color: 'coolGray.700',
                }}>
                Url
              </FormControl.Label>
              <Input placeholder="Url" />
              <FormControl.HelperText
                _text={{
                  fontSize: 'xs',
                }}>
                Tersedia Dalam Kotak Penjualan
              </FormControl.HelperText>
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                _text={{
                  fontFamily: 'heading',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'md',
                  color: 'coolGray.700',
                }}>
                Token
              </FormControl.Label>
              <Input placeholder="Token" />
              <FormControl.HelperText
                _text={{
                  fontSize: 'xs',
                }}>
                Tersedia Dalam Kotak Penjualan
              </FormControl.HelperText>
            </FormControl>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default ModalComponent;
