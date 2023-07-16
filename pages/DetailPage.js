import React, { useCallback, useEffect, useState } from 'react';
import { Text, HStack, Button, Center } from 'native-base';
import LineChartComponent from '../components/charts/LineChartComponent';
import axios from 'axios';
import moment from 'moment';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

const DetailPage = ({ route }) => {
  const { deviceId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [timeChart, setTimeChart] = useState('');

  const getAllData = useCallback(async () => {
    try {
      //! measurements/${deviceId}?period=${time}
      //!
      const response = await axios.get(
        `https://raft-backend-kgxdguejnq-et.a.run.app/measurements/${deviceId}?period=${timeChart}`,
      );

      const showChartData = {
        labels: response.data.results.map(dataItem =>
          moment(dataItem.createdAt).utcOffset('+0700').format('HH:mm'),
        ),
        datasets: [
          {
            data: response.data.results.map(dataItem => dataItem.ppm),
          },
        ],
      };

      setChartData(showChartData);
    } catch (error) {
      console.error(error);
    }
  }, [deviceId, timeChart]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllData();
    setTimeChart('');
    setRefreshing(false);
  }, [getAllData]);

  const handleChangeTime = useCallback(
    time => {
      setTimeChart(time);
      getAllData();
    },
    [getAllData],
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>Detail Page</Text>
      <LineChartComponent lineData={chartData} />
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
                color: time === timeChart ? 'coolGray.500' : 'coolGray.800',
                // color: 'coolGray.700',
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
