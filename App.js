import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HiddenWord from './components/hiddenWord';
import LettersBoard from './components/lettersBoard';

class App extends Component {
  wordToMap = (word) => {
    return Array.from(word.toUpperCase()).map((e) => {
      return { key: e, isUsed: false };
    });
  };

  state = {
    hiddenWord: this.wordToMap('Jesus'),
    letters: this.wordToMap('abcdefghijklmnopqrstuvwxyz'),
    leftTry: 3,
  };

  handleLetterPress = (letter) => {
    const { hiddenWord, letters, leftTry } = this.state;
    let found = false;

    const updatedHiddenWord = [...hiddenWord];
    updatedHiddenWord.map((e, index) => {
      if (e.key == letter.key) {
        found = true;
        updatedHiddenWord[index] = { ...updatedHiddenWord[index] };
        updatedHiddenWord[index].isUsed = !updatedHiddenWord[index].isUsed;
      }
    });
    this.setState({ hiddenWord: updatedHiddenWord });

    if (!found) this.setState({ leftTry: leftTry - 1 });

    const updatedLetters = [...letters];
    updatedLetters.map((e, index) => {
      if (e.key == letter.key) {
        updatedLetters[index] = { ...updatedLetters[index] };
        updatedLetters[index].isUsed = !updatedLetters[index].isUsed;
      }
    });
    this.setState({ letters: updatedLetters });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>Je suis le Chemin, la Vérité et la Vie!</Text>
        <Text>Faux pas restants : {this.state.leftTry} </Text>
        <LettersBoard
          onPress={this.handleLetterPress}
          style={{ flex: 2 }}
          letters={this.state.letters}
        />
        <HiddenWord
          style={{ flex: 1 }}
          word={this.state.hiddenWord}
          givenLetter="e"
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: '20',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
