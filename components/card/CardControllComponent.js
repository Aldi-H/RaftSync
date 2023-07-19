import React from 'react';
import { Box, Button, Text } from 'native-base';

const CardControllComponent = ({ volumes, onPress }) => {
  return (
    <Box rounded="lg" bg="white" mx="6" my="4">
      <Box pt="4" px="6">
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="xl"
          fontStyle="normal"
          color="coolGray.600">
          Tambah Nutrisi
        </Text>
      </Box>
      <Box mb="4" mt="6" alignItems="center" maxW="80" w="full" mx="1">
        <Button.Group
          isAttached
          borderRadius="full"
          justifyContent="center"
          size="xs"
          w="full">
          {volumes.map(volume => {
            return (
              <Button
                key={volume}
                onPress={() => onPress(volume)}
                variant="outline"
                px="9"
                _text={{
                  fontFamily: 'mono',
                  fontWeight: '700',
                  fontStyle: 'normal',
                  fontSize: 'sm',
                  color: 'coolGray.800',
                }}>
                {volume}
              </Button>
            );
          })}
          {/* <Button w="50%">50ml</Button>
            <Button w="50%">100ml</Button>
            <Button>200ml</Button> */}
        </Button.Group>
      </Box>
    </Box>
  );
};

export default CardControllComponent;
