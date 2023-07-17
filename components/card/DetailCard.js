import React from 'react';
import { Box, HStack, Text, VStack } from 'native-base';

const DetailCard = ({ ppmValue, timeValue }) => {
  return (
    <Box alignItems="center" bg="blue.900">
      <Box bg="white" maxW="80" rounded="lg" m="6" py="8" px="6" w="full">
        <VStack>
          <HStack space="2" justifyItems="center" alignItems="center">
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="md"
              fontStyle="normal"
              color="coolGray.600">
              Waktu :
            </Text>
            <Text
              fontFamily="body"
              fontWeight="700"
              fontSize="sm"
              fontStyle="normal"
              color="coolGray.400">
              {timeValue}
            </Text>
          </HStack>
          <HStack space="2" justifyItems="center" alignItems="center">
            <Text
              fontFamily="heading"
              fontWeight="700"
              fontSize="xl"
              fontStyle="normal"
              color="coolGray.600">
              Kadar Nutrisi :
            </Text>
            <Text
              fontFamily="body"
              fontWeight="700"
              fontSize="lg"
              fontStyle="normal"
              color="coolGray.500">
              {ppmValue} ppm
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default DetailCard;
