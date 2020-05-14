import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    alignContent: 'center',
    backgroundColor: '#ccdede',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
});

export default LettersBoard;
