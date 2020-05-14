import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Easing } from 'react-native';

let opacity = new Animated.Value(0);

const size = opacity.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 30],
});

const animate = () => {
  opacity.setValue(0);
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    easing: Easing.elastic(4),
  }).start();
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Score = ({ score }) => {
  const prevScore = usePrevious(score);
  useEffect(() => {
    if (prevScore != score) animate();
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity>
        <Animated.Image
          style={{
            opacity,
            width: size,
            height: size,
            alignItems: 'center',
          }}
          source={require('../img/trophy.png')}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 30,
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {score}
      </Text>
    </View>
  );
};

export default Score;
