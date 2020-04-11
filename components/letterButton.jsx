import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const getStyle = (color) => {
  return StyleSheet.create({
    button: {
      height: 25,
      width: 25,
      margin: 5,
      alignItems: 'center',
      backgroundColor: color,
    },
  });
};

const LetterButton = ({ letter, onPress, deactivate }) => {
  let handler = () => onPress();
  let color = '#b7efcd';

  if (deactivate) {
    handler = () => {};
    color = '#c7d1c9';
  }

  return (
    <TouchableOpacity onPress={onPress} style={getStyle(color).button}>
      <Text>{letter}</Text>
    </TouchableOpacity>
  );
};

export default LetterButton;
