import { create } from 'zustand';
import axios from 'axios';

import { API_URL } from '@env';

export const useDeviceStore = create(set => {
  return {
    devices: [],
    getAllDevices: async () => {
      try {
        const response = await axios.get(`${API_URL}/devices`);

        const data = response.data.results.map(item => {
          return {
            name: item.name,
            id: item.id,
          };
        });

        console.log(data);
        set({ devices: data });
      } catch (error) {
        console.error(error);
      }
    },
    addDevice: async values => {
      try {
        const response = await axios.post(`${API_URL}/devices`, values);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    deleteDevice: async deviceId => {
      try {
        const response = await axios.delete(`${API_URL}/devices/${deviceId}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  };
});
