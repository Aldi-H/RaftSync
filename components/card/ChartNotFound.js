import React from 'react';
import { Dimensions } from 'react-native';
import { Text, Box, HStack } from 'native-base';

const ChartNotFound = ({ Mode }) => {
  return (
    <Box alignItems="center">
      <Box
        bg="white"
        maxW="80"
        rounded="lg"
        m="6"
        py="10"
        px="6"
        h="250"
        justifyContent="center"
        w={Dimensions.get('window').width}>
        <HStack space="2" justifyContent="center">
          <Text
            fontFamily="heading"
            fontWeight="900"
            fontSize="xl"
            fontStyle="normal"
            color="coolGray.500">
            Data Not Found {Mode}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default ChartNotFound;
