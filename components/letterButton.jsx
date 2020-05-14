import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const getStyle = (color) => {
  return StyleSheet.create({
    button: {
      width: '12%',
      height: '15%',
      margin: 4,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderColor: '#1a4d27',
      borderWidth: 1,
    },
  });
};

const LetterButton = ({ letter, onPress, deactivate }) => {
  let handler = () => onPress();
  let color = '#f0f6fa';

  if (deactivate) {
    handler = () => {};
    color = '#aaafb3';
  }

  return (
    <TouchableOpacity onPress={handler} style={getStyle(color).button}>
      <Text>{letter}</Text>
    </TouchableOpacity>
  );
};

export default LetterButton;
