import React, { useCallback, useEffect, useState } from 'react';
import { HStack, Button, Center, Box } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

import ChartNotFound from '../components/card/ChartNotFound';
import DetailCard from '../components/card/DetailCard';
import LineAreaChartComponent from '../components/charts/LineAreaChartComponent';
import CardControllComponent from '../components/card/CardControllComponent';
import { useChartDataStore } from '../utils/chartDataStore';

const DetailPage = ({ route }) => {
  const { deviceId } = route.params;
  const {
    chartDatas,
    periods,
    changePeriods,
    getAllChartData,
    xAxisDateValue,
    yAxisPpmValue,
    timeDetailValue,
    ppmDetailValue,
    openValve,
  } = useChartDataStore(state => ({
    chartDatas: state.chartDatas,
    periods: state.periods,
    changePeriods: state.changePeriods,
    getAllChartData: state.getAllChartData,
    xAxisDateValue: state.xAxisDateValue,
    yAxisPpmValue: state.yAxisPpmValue,
    timeDetailValue: state.timeDetailValue,
    ppmDetailValue: state.ppmDetailValue,
    openValve: state.openValve,
  }));

  const [refreshing, setRefreshing] = useState(false);
  const volumesValue = ['50', '100', '200'];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getAllChartData(deviceId, '');
    changePeriods('');
    setRefreshing(false);
  }, [getAllChartData]);

  const handleChangePeriods = async period => {
    await getAllChartData(deviceId, period);
    changePeriods(period);
  };

  const handleChangeVolume = async volume => {
    console.log(volume);
    await openValve(deviceId, volume);
  };

  useEffect(() => {
    getAllChartData(deviceId, periods);
  }, [getAllChartData]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <DetailCard
        timeValue={chartDatas.length === 0 ? '-' : timeDetailValue}
        ppmValue={chartDatas.length === 0 ? 0 : ppmDetailValue}
      />
      <Box bg="white">
        {chartDatas.length === 0 ? (
          <ChartNotFound />
        ) : (
          <LineAreaChartComponent
            dateValue={xAxisDateValue}
            ppmValue={yAxisPpmValue}
          />
        )}
        <Center>
          <HStack mb="2" space={16} alignItems="center" justifyItems="center">
            {['1d', '1w'].map(period => {
              return (
                <Button
                  key={period}
                  size="lg"
                  p={0}
                  variant="ghost"
                  _text={{
                    fontFamily: 'mono',
                    fontWeight: '500',
                    fontStyle: 'normal',
                    fontSize: 'md',
                    color: period === periods ? 'yellow.500' : 'coolGray.700',
                  }}
                  onPress={() => handleChangePeriods(period)}>
                  {period}
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
