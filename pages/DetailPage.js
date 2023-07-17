import React, { useCallback, useEffect, useState } from 'react';
import { HStack, Button, Center } from 'native-base';
import axios from 'axios';
import moment from 'moment';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

import LineChartComponent from '../components/charts/LineChartComponent';
import DetailCard from '../components/card/DetailCard';

const DetailPage = ({ route }) => {
  const { deviceId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [periods, setPeriods] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [ppmValue, setPpmValue] = useState(0);
  const [chartMode, setChartMode] = useState('on IoT');

  const getAllData = useCallback(async () => {
    try {
      //! measurements/${deviceId}?period=${time}
      //!
      const response = await axios.get(
        `https://raft-backend-kgxdguejnq-et.a.run.app/measurements/${deviceId}?period=${periods}`,
      );

      const timeData = response.data.results.map(dataItem =>
        moment(dataItem.createdAt).utcOffset('+0700').format('D MMM YY'),
      );

      const ppmData = response.data.results.map(dataItem => dataItem.ppm);

      const showChartData = {
        labels: timeData,
        datasets: [
          {
            data: ppmData,
          },
        ],
      };

      setChartData(showChartData);
      setTimeValue(timeData[timeData.length - 1]);
      setPpmValue(ppmData[ppmData.length - 1]);
    } catch (error) {
      console.error(error);
    }
  }, [deviceId, periods, setPpmValue]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllData();
    setPeriods('');
    setChartMode('on IoT');
    setPpmValue(0);
    setRefreshing(false);
  }, [getAllData]);

  const handleChangeTime = useCallback(
    time => {
      setPeriods(time);
      getAllData();
    },
    [getAllData],
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <DetailCard timeValue={timeValue} ppmValue={ppmValue} />
      <LineChartComponent lineData={chartData} Mode={chartMode} />
      <Button.Group justifyContent="center" isAttached>
        <Button variant="outline" onPress={() => setChartMode('on IoT')}>
          on IoT
        </Button>
        <Button variant="outline" onPress={() => setChartMode('on Manual')}>
          on Manual
        </Button>
      </Button.Group>
      <Center>
        <HStack space={8} justifyItems="center">
          {['1d', '1w'].map(time => (
            <Button
              key={time}
              size="md"
              p={1}
              variant="ghost"
              _text={{
                fontFamily: 'mono',
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'md',
                color: time === periods ? 'coolGray.500' : 'coolGray.800',
              }}
              onPress={() => handleChangeTime(time)}>
              {time}
            </Button>
          ))}
        </HStack>
      </Center>
    </ScrollView>
  );
};

export default DetailPage;
