import { StorageKey, theme } from '@/constants';
import { useStorage } from '@/hooks';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { RefObject } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedFeather = Animated.createAnimatedComponent(Feather);

type ButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: number;
  dataLength: number;
};

export function Button({
  dataLength,
  flatListIndex,
  flatListRef,
}: ButtonProps) {
  const { setStorageValue } = useStorage(StorageKey.ONBOARDING);
  const router = useRoute();
  console.log(`FlatListIndex: ${flatListIndex}`);

  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex + 1 });
    } else {
      setStorageValue({ value: true });
    }
  };

  return (
    <AnimatedPressable
      activeOpacity={0.6}
      onPress={handleNextScreen}
      style={[styles.container, buttonAnimationStyle]}
    >
      <Animated.Text style={[styles.text, textAnimationStyle]}>
        Bắt đầu
      </Animated.Text>

      <AnimatedFeather
        name='arrow-right'
        size={30}
        color={theme.colors.textHighlightColor}
        style={[
          styles.arrow,
          arrowAnimationStyle,
          {
            ...(flatListIndex === dataLength - 1
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1,
                }),
          },
        ]}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
    color: theme.colors.primary,
  },
  text: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
