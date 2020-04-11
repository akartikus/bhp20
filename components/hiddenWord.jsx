import React from 'react';
import { View, Text } from 'react-native';

const HiddenWord = ({ word, givenLetter }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {word.map((e, index) =>
        e.isUsed === true ? (
          <Text key={index}>{e.key}</Text>
        ) : (
          <Text key={index}>?</Text>
        )
      )}
    </View>
  );
};

export default HiddenWord;
