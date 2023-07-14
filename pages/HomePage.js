import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  Fab,
  AddIcon,
  useDisclose,
} from 'native-base';

import ListComponent from '../components/Lists/ListComponent';
import axios from 'axios';
import ModalComponent from '../components/Modals/ModalComponent';

const HomePage = () => {
  const [devices, setDevices] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

  const getAllDevices = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://yuan-supabase-kgxdguejnq-et.a.run.app/devices',
      );

      const data = response.data.results.map(item => {
        return {
          name: item.name,
          id: item.id,
        };
      });

      console.log(data);
      setDevices(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addDevice = useCallback(
    async values => {
      try {
        const response = await axios.post(
          'https://yuan-supabase-kgxdguejnq-et.a.run.app/devices',
          values,
        );

        console.log(response.data);
        getAllDevices();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
    [getAllDevices, onClose],
  );

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <View>
      <ModalComponent isOpen={isOpen} onClose={onClose} onSubmit={addDevice} />
      <FlatList
        mt="2"
        data={devices}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => console.log(`pressed ${item.name}`)}>
              <ListComponent deviceName={item.name} deviceId={item.id} />
            </Pressable>
          );
        }}
      />
      <Fab
        renderInPortal={false}
        onPress={() => onOpen()}
        size="lg"
        icon={<AddIcon name="addBtn" size="md" />}
      />
    </View>
  );
};

export default HomePage;
