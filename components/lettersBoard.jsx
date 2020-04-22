import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import LetterButton from './letterButton';

const LettersBoard = ({ letters, onPress, active }) => {
  return (
    <View style={styles.view}>
      {letters.map((e) => {
        return (
          <LetterButton
            onPress={active ? () => onPress(e) : () => {}}
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
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#ccdede',
  },
});

export default LettersBoard;
