import React from 'react';
import { VStack, Text, Box } from 'native-base';

const ListComponent = ({ deviceName, deviceId }) => {
  return (
    <Box bg="white" p="6" m="5" my="2" rounded="lg" borderColor="muted.50">
      <VStack>
        <Text
          isTruncated
          maxW="100%"
          w="80%"
          fontFamily="heading"
          fontWeight="900"
          fontSize="md"
          fontStyle="normal"
          color="coolGray.700">
          {deviceName}
        </Text>
        <Text
          fontFamily="body"
          fontWeight="500"
          fontSize="sm"
          color="coolGray.600">
          {deviceId}
        </Text>
      </VStack>
    </Box>
  );
};

export default ListComponent;

/* <Text fontSize="md" bold color="coolGray.700">
      evice Name
  </Text> */
