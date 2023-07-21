import React from 'react';
import { VStack, HStack, Text, Box } from 'native-base';

/* const Row = ({ deviceItem }) => {
  return (
    <Box bg="white" p="6" rounded="md" borderColor="muted.50">
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
            {deviceItem.name}
          </Text>
          <Text
            fontFamily="body"
            fontWeight="500"
            fontSize="sm"
            color="coolGray.600">
            {deviceItem.id}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}; */

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
        {/* <Pressable onPress={onPress}>
          <DeleteIcon size="md" color="red.700" />
        </Pressable> */}
      </HStack>
    </Box>
  );
};

export default ListComponent;

/* <SwipeListComponent onDelete={onDelete}>
      <Row deviceItem={{ name: deviceName, id: deviceId }} />
    </SwipeListComponent> */

/* <Box bg="white" p="6" m="5" my="2" rounded="lg" borderColor="muted.50">
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
        <Pressable onPress={onPress}>
          <DeleteIcon size="md" color="red.700" />
        </Pressable>
      </HStack>
    </Box> */
