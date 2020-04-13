import React from 'react';
import { View, Text } from 'react-native';

const HiddenWord = ({ word }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {word.map((e, index) =>
        e.isUsed === true ? (
          <Text key={index}>{e.value}</Text>
        ) : (
          <Text key={index}>?</Text>
        )
      )}
    </View>
  );
};

export default HiddenWord;
