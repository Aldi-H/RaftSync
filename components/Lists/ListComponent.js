import React from 'react';
import { VStack, Text, Box, HStack, Pressable, DeleteIcon } from 'native-base';

import SwipeListComponent from './SwipeListComponent';

const ListComponent = ({ deviceName, deviceId, onPress }) => {
  return (
    <Box bg="white" p="6" m="5" my="2" rounded="lg" borderColor="muted.50">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text
            isTruncated
            maxW="100%"
            // w="90%"
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
        <Pressable onPress={onPress}>
          <DeleteIcon size="md" color="red.700" />
        </Pressable>
      </HStack>
    </Box>
  );
};

export default ListComponent;

/* <Text fontSize="md" bold color="coolGray.700">
      evice Name
  </Text> */
