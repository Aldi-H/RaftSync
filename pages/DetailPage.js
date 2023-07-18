import React, { useCallback, useEffect, useState } from 'react';
import { HStack, Button, Center } from 'native-base';

import axios from 'axios';
import moment from 'moment';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

import ChartNotFound from '../components/card/ChartNotFound';
import DetailCard from '../components/card/DetailCard';
import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';

const DetailPage = ({ route }) => {
  const { deviceId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [xAxisDateValue, setXAxisDateValue] = useState([]);
  const [yAxisPpmValue, setYAxisPpmValue] = useState([]);
  const [periods, setPeriods] = useState('');
  const [timeDetailValue, setDetailTimeValue] = useState('');
  const [ppmValue, setPpmValue] = useState(0);

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

      // const showChartData = {
      //   labels: timeData,
      //   datasets: [
      //     {
      //       data: ppmData,
      //     },
      //   ],
      // };

      console.log(response.data.results);

      setChartData(response.data.results);
      setXAxisDateValue(timeData);
      setYAxisPpmValue(ppmData);
      setDetailTimeValue(timeData[timeData.length - 1]);
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
      <DetailCard timeValue={timeDetailValue} ppmValue={ppmValue} />
      {chartData.length === 0 ? (
        <ChartNotFound />
      ) : (
        <LineAreaChartComponent
          dateValue={xAxisDateValue}
          ppmValue={yAxisPpmValue}
        />
      )}

      <Center>
        {/* <Box my="2" maxW="80" w="full" mx="1">
          <HStack justifyItems="center" py="0">
            <Button.Group isAttached size="xs">
              <Button
                borderLeftRadius="full"
                variant={chartMode === 'IoT' ? 'solid' : 'outline'}
                onPress={() => setChartMode('IoT')}
                w="50%"
                _text={{
                  fontFamily: 'mono',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'sm',
                  color: chartMode === 'IoT' ? 'coolGray.50' : 'coolGray.800',
                }}>
                IoT
              </Button>
              <Button
                borderRightRadius="full"
                variant={chartMode === 'Manual' ? 'solid' : 'outline'}
                onPress={() => setChartMode('Manual')}
                w="50%"
                _text={{
                  fontFamily: 'mono',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'sm',
                  color:
                    chartMode === 'Manual' ? 'coolGray.50' : 'coolGray.800',
                }}>
                Manual
              </Button>
            </Button.Group>
          </HStack>
        </Box> */}
        <HStack mb="2" space={8} alignItems="center" justifyItems="center">
          {['1d', '1w'].map(time => (
            <Button
              key={time}
              size="lg"
              p={1}
              variant="ghost"
              _text={{
                fontFamily: 'mono',
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'lg',
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
