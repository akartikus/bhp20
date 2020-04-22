import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HiddenWord = ({ word }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      }}
    >
      {word.map((e, index) =>
        e.isUsed === true ? (
          <View style={styles.letterView} key={index}>
            <Text style={styles.letter}>{e.value}</Text>
          </View>
        ) : (
          <View style={styles.letterView} key={index}>
            <Text style={styles.letter}>?</Text>
          </View>
        )
      )}
    </View>
  );
};

export default HiddenWord;

const styles = StyleSheet.create({
  letter: {
    textAlign: 'center',
    color: '#000',
    padding: 10,
    fontSize: 20,
  },
  letterView: {
    borderColor: '#404d52',
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 3,
  },
});
