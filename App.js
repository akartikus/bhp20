import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HiddenWord from './components/hiddenWord';
import LettersBoard from './components/lettersBoard';
import MessagePanel from './components/messagePanel';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const NUM_TRY = 3;

class App extends Component {
  wordToMap = (word) => {
    return Array.from(word.toUpperCase()).map((e) => {
      return { key: e, isUsed: false };
    });
  };

  state = {
    hiddenWord: this.wordToMap('Jesus'),
    letters: this.wordToMap(ALPHABET),
    leftTry: NUM_TRY,
    message: null,
    score: 0,
  };

  isWordFound = (word) => {
    return word.map((e) => e.isUsed).reduce((acc, v) => acc && v, true);
  };

  initializeGame = (score) => {
    this.setState({ letters: this.wordToMap(ALPHABET) });
    this.setState({ hiddenWord: this.wordToMap('Jesus') });
    this.setState({ leftTry: NUM_TRY });
    this.setState({ message: null });
    this.setState({ score: score });
  };

  nextWord = () => {
    this.initializeGame(this.state.score + this.state.leftTry);
  };

  backToMenu = () => {
    this.initializeGame(0);
  };

  handleLetterPress = (letter) => {
    const { hiddenWord, letters, leftTry } = this.state;
    let isPresent = false;
    let left = leftTry;

    const updatedHiddenWord = [...hiddenWord];
    updatedHiddenWord.map((e, index) => {
      if (e.key == letter.key) {
        isPresent = true;
        updatedHiddenWord[index] = { ...updatedHiddenWord[index] };
        updatedHiddenWord[index].isUsed = !updatedHiddenWord[index].isUsed;
      }
    });
    this.setState({ hiddenWord: updatedHiddenWord });

    const updatedLetters = [...letters];
    updatedLetters.map((e, index) => {
      if (e.key == letter.key) {
        updatedLetters[index] = { ...updatedLetters[index] };
        updatedLetters[index].isUsed = !updatedLetters[index].isUsed;
      }
    });
    this.setState({ letters: updatedLetters });

    if (!isPresent) {
      left = left - 1;
      if (left === 0) {
        this.setState({
          message: (
            <MessagePanel
              message="Game Over"
              onNext={this.backToMenu}
              onCancel={this.backToMenu}
            />
          ),
        });
        return;
      }
      this.setState({ leftTry: left });
    }

    if (this.isWordFound(updatedHiddenWord)) {
      this.setState({
        message: (
          <MessagePanel
            message="Bravo! Vous avez trouvé le mot. "
            onNext={this.nextWord}
          />
        ),
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1, textAlign: 'right' }}>
          Score : {this.state.score}{' '}
        </Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>
          Je suis le Chemin, la Vérité et la Vie!
        </Text>
        {this.state.message && this.state.message}

        <Text style={{ flex: 1, textAlign: 'center' }}>
          Faux pas restants : {this.state.leftTry}{' '}
        </Text>

        <HiddenWord style={{ flex: 1 }} word={this.state.hiddenWord} />
        <LettersBoard
          style={{ flex: 2 }}
          letters={this.state.letters}
          onPress={this.handleLetterPress}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#acd1e3',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
