import React, { useRef, useEffect } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { Icon as NativeIcon } from 'native-base';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipeListComponent = ({ children, onDelete }) => {
  const swipeableRowRef = useRef(null);

  useEffect(() => {
    return () => {
      swipeableRowRef.current = null;
    };
  }, []);

  const handleSwipeableRightOpen = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const renderRightActions = (progress, dragX) => {
    // eslint-disable-next-line no-unused-vars
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RectButton style={styles.rightAction}>
        <NativeIcon
          as={<AnimatedIcon name="trash" />}
          size="24px"
          color="white"
          width="30px"
          marginX="20px"
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      onSwipeableOpen={handleSwipeableRightOpen}
      renderRightActions={renderRightActions}
      overshootRight={false}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    marginTop: '2px',
    justifyContent: 'flex-end',
  },
});

export default SwipeListComponent;
