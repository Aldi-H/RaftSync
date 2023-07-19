import React from 'react';
import { Dimensions } from 'react-native';
import { Text, Box, HStack } from 'native-base';

const ChartNotFound = () => {
  const apx = (size = 0) => {
    let width = Dimensions.get('window').width;
    return (width / 750) * size;
  };

  return (
    <Box alignItems="center">
      <Box
        bg="white"
        maxW={apx(750)}
        rounded="lg"
        m="2"
        py="10"
        px="6"
        h={apx(570)}
        justifyContent="center"
        w={Dimensions.get('window').width}>
        <HStack space="2" justifyContent="center">
          <Text
            fontFamily="heading"
            fontWeight="900"
            fontSize="xl"
            fontStyle="normal"
            color="coolGray.500">
            Data Not Found
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ChartNotFound;
