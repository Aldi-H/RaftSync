import React from 'react';
import { VStack, HStack, Text, Box } from 'native-base';

const ListComponent = ({ deviceName, deviceId, onDelete }) => {
  return (
    <Box bg="white" p="6" rounded="lg" borderColor="muted.50">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text
            isTruncated
            maxW="100%"
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
      </HStack>
    </Box>
  );
};

export default ListComponent;
