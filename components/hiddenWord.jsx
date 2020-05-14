import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../styles/color';

const HiddenWord = ({ word }) => {
  return (
    <View
      style={{
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#99d3f2',
        borderColor: Colors.textColor1,
        borderWidth: 2,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        width: width - 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: -2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.84,
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '50%',
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      />
      {word.map((e, index) =>
        e.isUsed === true ? (
          <View style={styles.letterView} key={index}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={{ alignItems: 'center', borderRadius: 25 }}
            >
              <Text style={styles.letter}>{e.value}</Text>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.letterView} key={index}>
            <Text style={{ ...styles.letter, color: '#07344d' }}>?</Text>
          </View>
        )
      )}
    </View>
  );
};

export default HiddenWord;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  letter: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: width / 16,
    width: width / 14,
    height: width / 10,
    marginVertical: '2%',
  },
  letterView: {
    borderColor: '#07344d',
    borderWidth: 2,
    borderRadius: 25,
    marginHorizontal: 3,
  },
});
