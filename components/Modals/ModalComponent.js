import React, { useState, useEffect, useRef } from 'react';
import * as Yup from 'yup';
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

  const inputSchema = Yup.object().shape({
    id: Yup.string().max(6, 'Too Long!').required('Id Device Harus Diisi'),
    name: Yup.string().required('Nama Device Harus Diisi'),
    url: Yup.string().required('Url Harus Diisi'),
    token: Yup.string().required('Bearer Harus Diisi'),
  });

  //! thingerUrl -> url
  //! thingerBearer -> token
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      url: '',
      token: '',
    },

    validationSchema: inputSchema,

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
                isInvalid={!!formik.errors.id}
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
                isInvalid={!!formik.errors.name}
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
                onChangeText={formik.handleChange('url')}
                value={formik.values.url}
                isInvalid={!!formik.errors.url}
              />
              {formik.errors.url && formik.touched.url && (
                <FormControl.ErrorMessage>
                  {formik.errors.url}
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
                onChangeText={formik.handleChange('token')}
                value={formik.values.token}
                isInvalid={!!formik.errors.token}
              />
              {formik.errors.token && formik.touched.token && (
                <FormControl.ErrorMessage>
                  {formik.errors.token}
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
