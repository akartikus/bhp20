import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import LetterButton from './letterButton';

const LettersBoard = ({ letters, onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {letters.map((e) => {
        return (
          <LetterButton
            onPress={() => onPress(e)}
            deactivate={e.isUsed}
            key={e.value}
            letter={e.value}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: { width: 50, height: 50, color: 'red' },
});

export default LettersBoard;
