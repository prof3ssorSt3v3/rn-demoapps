import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  TapGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
//version 1.10 of react-native-gesture-handler
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  useDerivedValue,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
//version 2.3 of react-native-reanimated

//for the square and circle
const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const bgColor = useSharedValue('lime');

  const panEvent = useAnimatedGestureHandler({
    onStart: (ev, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (ev, context) => {
      translateX.value = ev.translationX + context.translateX;
      translateY.value = ev.translationY + context.translateY;
    },
    onEnd: (ev, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const tapEvent = useAnimatedGestureHandler({
    onStart: (ev, context) => {
      console.log('you started tapping');
    },
    onEnd: (ev, context) => {
      //tap does not have an onActive property
      //toggle colour version
      // bgColor.value = bgColor.value === 'lime' ? 'hotpink' : 'lime';
      //random colour version
      bgColor.value = '#' + Math.random().toString(16).substr(2, 6);
    },
  });

  const dynamicBG = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });

  const dynamicTranslate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tap Gesture Handler</Text>
      <TapGestureHandler onGestureEvent={tapEvent}>
        <Animated.View style={[styles.square, dynamicBG]} />
      </TapGestureHandler>

      <Text style={styles.text}>Pan Gesture Handler</Text>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panEvent}>
          <Animated.View style={[styles.square, dynamicTranslate]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 255, 0.5)',
  },
});
