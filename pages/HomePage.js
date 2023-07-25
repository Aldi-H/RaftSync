import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  Fab,
  AddIcon,
  useDisclose,
  Divider,
  View,
} from 'native-base';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { useDeviceDataStore } from '../utils/deviceDataStore';
import ListComponent from '../components/Lists/ListComponent';
import ModalComponent from '../components/Modals/ModalComponent';
import SwipeListComponent from '../components/Lists/SwipeListComponent';
import AlertDialogComponent from '../components/alert/AlertDialogComponent';

const HomePage = ({ navigation }) => {
  const { devices, getAllDevices, addDevice, deleteDevice } =
    useDeviceDataStore(state => {
      return {
        devices: state.devices,
        getAllDevices: state.getAllDevices,
        addDevice: state.addDevice,
        deleteDevice: state.deleteDevice,
      };
    });

  const { isOpen, onOpen, onClose } = useDisclose();
  const [refreshing, setRefreshing] = useState(false);
  const isFocussed = useIsFocused();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCLoseAlert = () => setIsOpenAlert(false);
  const [isSwipeListOpen, setIsSwipeListOpen] = useState(false);
  const canceRef = useRef();

  const navigationDetails = deviceId => {
    navigation.navigate('Detail Page', { deviceId });
  };

  const handleAddDevice = async newDeviceData => {
    await addDevice(newDeviceData);
    getAllDevices();
    onClose();
  };

  const handleDeleteDevice = async deviceId => {
    await deleteDevice(deviceId);
    getAllDevices();
    onCLoseAlert();

    if (isSwipeListOpen) {
      setIsOpenAlert(false);
      setIsSwipeListOpen(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getAllDevices();
    setRefreshing(false);
  }, [getAllDevices]);

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddDevice}
      />
      {devices.map(item => {
        return (
          <View key={item.id}>
            <AlertDialogComponent
              leastDestructiveRef={canceRef}
              isOpen={isOpenAlert}
              onClose={() => {
                setIsOpenAlert(false);
                setIsSwipeListOpen(false);
              }}
              onDeleteItem={() => handleDeleteDevice(item.id)}
            />
            <SwipeListComponent
              isOpen={isSwipeListOpen}
              onDelete={() => {
                setIsOpenAlert(!isOpenAlert);
                setIsSwipeListOpen(!isSwipeListOpen);
              }}>
              <Pressable
                key={item.id}
                onPress={() => {
                  navigationDetails(item.id);
                  setIsSwipeListOpen(true);
                }}>
                <ListComponent deviceName={item.name} deviceId={item.id} />
                <Divider
                  _light={{
                    bg: 'muted.300',
                  }}
                  thickness="2"
                />
              </Pressable>
            </SwipeListComponent>
          </View>
        );
      })}

      {isFocussed ? (
        <Fab
          position="absolute"
          onPress={() => onOpen()}
          size="lg"
          icon={<AddIcon name="addBtn" size="md" />}
        />
      ) : null}
    </ScrollView>
  );
};

export default HomePage;
