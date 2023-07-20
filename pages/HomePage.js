import React, { useCallback, useState, useEffect } from 'react';
import { Pressable, Fab, AddIcon, useDisclose } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import ListComponent from '../components/Lists/ListComponent';
import ModalComponent from '../components/Modals/ModalComponent';
import { useDeviceStore } from '../utils/deviceDataStore';

const HomePage = ({ navigation }) => {
  const { devices, getAllDevices, addDevice, deleteDevice } = useDeviceStore(
    state => {
      return {
        devices: state.devices,
        getAllDevices: state.getAllDevices,
        addDevice: state.addDevice,
        deleteDevice: state.deleteDevice,
      };
    },
  );
  const isFocussed = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [refreshing, setRefreshing] = useState(false);

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
          <Pressable key={item.id} onPress={() => navigationDetails(item.id)}>
            <ListComponent
              deviceName={item.name}
              deviceId={item.id}
              onPress={() => {
                handleDeleteDevice(item.id);
              }}
            />
          </Pressable>
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
