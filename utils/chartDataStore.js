import axios from 'axios';
import { create } from 'zustand';

import { API_URL } from '@env';
import moment from 'moment';

export const useChartDataStore = create(set => ({
  chartDatas: [],
  xAxisDateValue: [],
  yAxisPpmValue: [],
  periods: '',
  timeDetailValue: '',
  ppmDetailValue: 0,
  volumesValue: '50',

  changePeriods: newPeriods => {
    set({ periods: newPeriods });
  },

  getAllChartData: async (deviceId, periods) => {
    try {
      const response = await axios.get(
        `${API_URL}/measurements/${deviceId}?period=${periods}`,
      );

      const data = response.data.results;
      const timeData = response.data.results.map(dataItem =>
        moment(dataItem.createdAt).utcOffset('+0700').format('D MMM YY'),
      );
      const ppmData = response.data.results.map(dataItem => dataItem.ppm);

      console.log(periods);
      console.log(response.data.results);

      set({
        chartDatas: data,
        periods: periods,
        xAxisDateValue: timeData,
        yAxisPpmValue: ppmData,
        timeDetailValue: timeData[timeData.length - 1],
        ppmDetailValue: ppmData[ppmData.length - 1],
      });
    } catch (error) {
      console.error(error);
    }
  },

  openValve: async (deviceId, volumesValue) => {
    try {
      const response = await axios.get(
        `${API_URL}/actions/valve/${deviceId}/flow/${volumesValue}`,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
}));
