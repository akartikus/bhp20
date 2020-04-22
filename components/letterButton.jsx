import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const getStyle = (color) => {
  return StyleSheet.create({
    button: {
      height: 30,
      width: 30,
      margin: 5,
      padding: 2,
      borderRadius: 5,
      alignItems: 'center',
      backgroundColor: color,
      borderColor: '#1a4d27',
      borderWidth: 1,
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
    <TouchableOpacity onPress={handler} style={getStyle(color).button}>
      <Text>{letter}</Text>
    </TouchableOpacity>
  );
};

export default LetterButton;
