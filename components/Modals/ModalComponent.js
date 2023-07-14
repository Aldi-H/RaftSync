import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Keyboard, Platform } from 'react-native';
import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  Input,
  VStack,
} from 'native-base';

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

const ModalComponent = ({ isOpen, onClose, onSubmit }) => {
  const bottomInset = useKeyboardBottomInset();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      thingerUrl: '',
      thingerBearer: '',
    },

    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

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
              <Input
                placeholder="Id Device"
                onChangeText={formik.handleChange('id')}
                value={formik.values.id}
              />
              {formik.errors.id && formik.touched.id && (
                <FormControl.ErrorMessage>
                  {formik.errors.id}
                </FormControl.ErrorMessage>
              )}
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
              <Input
                placeholder="Nama Device"
                onChangeText={formik.handleChange('name')}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <FormControl.ErrorMessage>
                  {formik.errors.name}
                </FormControl.ErrorMessage>
              )}
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
              <Input
                placeholder="Url"
                onChangeText={formik.handleChange('thingerUrl')}
                value={formik.values.thingerUrl}
              />
              {formik.errors.thingerUrl && formik.touched.thingerUrl && (
                <FormControl.ErrorMessage>
                  {formik.errors.thingerUrl}
                </FormControl.ErrorMessage>
              )}
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
              <Input
                placeholder="Token"
                onChangeText={formik.handleChange('thingerBearer')}
                value={formik.values.thingerBearer}
              />
              {formik.errors.thingerBearer && formik.touched.thingerBearer && (
                <FormControl.ErrorMessage>
                  {formik.errors.thingerBearer}
                </FormControl.ErrorMessage>
              )}
              <FormControl.HelperText
                _text={{
                  fontSize: 'xs',
                }}>
                Tersedia Dalam Kotak Penjualan
              </FormControl.HelperText>
            </FormControl>
            <Button
              mt="2"
              _text={{
                fontFamily: 'heading',
                fontWeight: '700',
                fontStyle: 'normal',
                fontSize: 'md',
                color: 'coolGray.50',
              }}
              onClose={onClose}
              onPress={formik.handleSubmit}>
              Submit
            </Button>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default ModalComponent;
