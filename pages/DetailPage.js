import React, { useCallback, useEffect, useState } from 'react';
import { HStack, Button, Center, Box } from 'native-base';

import axios from 'axios';
import moment from 'moment';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

import ChartNotFound from '../components/card/ChartNotFound';
import DetailCard from '../components/card/DetailCard';
import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';
import CardControllComponent from '../components/card/CardControllComponent';

const DetailPage = ({ route }) => {
  const { deviceId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [xAxisDateValue, setXAxisDateValue] = useState([]);
  const [yAxisPpmValue, setYAxisPpmValue] = useState([]);
  const [periods, setPeriods] = useState('');
  const [timeDetailValue, setDetailTimeValue] = useState('');
  const [ppmValue, setPpmValue] = useState(0);
  const [volumesvalue, setVolumesValue] = useState('50');
  // const [valveStatus, setValveStatus] = useState(false);

  const volumesValue = ['50', '100', '200'];

  const getAllData = useCallback(async () => {
    try {
      //! /measurements/${deviceId}?period=${time}
      const response = await axios.get(
        `https://raft-backend-kgxdguejnq-et.a.run.app/measurements/${deviceId}?period=${periods}`,
      );

      const timeData = response.data.results.map(dataItem =>
        moment(dataItem.createdAt).utcOffset('+0700').format('D MMM YY'),
      );

      const ppmData = response.data.results.map(dataItem => dataItem.ppm);

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

  const openValve = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://raft-backend-kgxdguejnq-et.a.run.app/actions/valve/${deviceId}/flow/${volumesvalue}`,
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [deviceId, volumesvalue]);

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

  const handleChangeVolume = useCallback(
    volume => {
      console.log(volume);
      setVolumesValue(volume);
      openValve();
    },
    [openValve],
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <DetailCard timeValue={timeDetailValue} ppmValue={ppmValue} />
      <Box bg="white">
        {chartData.length === 0 ? (
          <ChartNotFound />
        ) : (
          <LineAreaChartComponent
            dateValue={xAxisDateValue}
            ppmValue={yAxisPpmValue}
          />
        )}
        <Center>
          <HStack mb="2" space={16} alignItems="center" justifyItems="center">
            {['1d', '1w'].map(time => {
              return (
                <Button
                  key={time}
                  size="lg"
                  p={0}
                  variant="ghost"
                  _text={{
                    fontFamily: 'mono',
                    fontWeight: '500',
                    fontStyle: 'normal',
                    fontSize: 'md',
                    color: time === periods ? 'yellow.500' : 'coolGray.700',
                  }}
                  onPress={() => handleChangeTime(time)}>
                  {time}
                </Button>
              );
            })}
          </HStack>
        </Center>
      </Box>
      <CardControllComponent
        volumes={volumesValue}
        onPress={selectedValue => handleChangeVolume(selectedValue)}
      />
    </ScrollView>
  );
};

export default DetailPage;
