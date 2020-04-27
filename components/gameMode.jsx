import React from 'react';
import { View, Text } from 'react-native';

const GameMode = ({ mode, level, progresion, goal }) => {
  return (
    <View>
      <Text>Vous êtes en mode {mode}</Text>
      <Text> {level} </Text>
      <Text>
        {progresion}/{goal}
      </Text>
    </View>
  );
};
export default GameMode;
