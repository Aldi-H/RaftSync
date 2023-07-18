import React from 'react';
import { Center, Flex } from 'native-base';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet } from 'react-native';
import ChartNotFound from '../card/ChartNotFound';

const LineChartComponent = ({ lineData, hidePointsAtIndex, Mode }) => {
  if (
    !lineData ||
    !lineData.labels ||
    !lineData.datasets ||
    lineData.datasets[0].data.length === 0
  ) {
    return <ChartNotFound Mode={Mode} />;
  }

  return (
    <Flex rounded="lg" w="full">
      <Center>
        {lineData.datasets[0].length > 0 ? (
          <ChartNotFound Mode={Mode} />
        ) : (
          <LineChart
            data={lineData}
            width={Dimensions.get('window').width}
            height={250}
            yAxisInterval={10}
            withDots={false}
            bezier
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: '#fbfbfb',
              backgroundGradientTo: '#fbfbfb',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            hidePointsAtIndex={hidePointsAtIndex}
            style={styles.chartContainer}
            verticalLabelRotation={30}
            withHorizontalLabels={false}
            withVerticalLabels={false}
          />
        )}
      </Center>
    </Flex>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
  },
});

export default LineChartComponent;
