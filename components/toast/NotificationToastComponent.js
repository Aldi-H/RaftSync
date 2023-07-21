import React from 'react';
import { Alert, HStack, Text, Icon as NativeIcon } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const NotificationToastComponent = ({ volume }) => {
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      variant="left-accent"
      status="success"
      rounded="md">
      <HStack
        alignItems="center"
        flexShrink={1}
        justifyItems="center"
        marginX="5px"
        space={2}>
        <NativeIcon
          as={<Icon name="check-circle" />}
          size="18px"
          color="green.600"
          width="30px"
        />
        <Text
          fontFamily="body"
          fontWeight="700"
          fontSize="md"
          fontStyle="normal"
          color="green.600">
          Nutrisi Ditambah {volume} ml
        </Text>
      </HStack>
    </Alert>
  );
};

export default NotificationToastComponent;
