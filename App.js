import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HiddenWord from './components/hiddenWord';
import LettersBoard from './components/lettersBoard';
import MessagePanel from './components/messagePanel';
import { getWords } from './services/fakeWordsService';
import { wordToMap, NUM_TRY, ALPHABET } from './utils/wordUtils';
import _ from 'lodash';

class App extends Component {
  state = {
    hiddenWord: [],
    indication: '',
    letters: wordToMap(ALPHABET),
    leftTry: NUM_TRY,
    message: null,
    score: 0,
    words: [],
  };

  componentDidMount() {
    console.log(getWords(1));
    this.setState({ words: getWords(1) });
    this.getRandomWord(getWords(1));
  }

  getRandomWord = (wordList) => {
    const hiddenWord = _.sample(wordList); //TODO: Filter unused word only
    const indication = hiddenWord.indication;
    this.setState({ hiddenWord: wordToMap(hiddenWord.value) });
    this.setState({ indication });
  };

  isWordFound = (word) => {
    return word.map((e) => e.isUsed).reduce((acc, v) => acc && v, true);
  };

  initializeGame = (score) => {
    this.setState({ letters: wordToMap(ALPHABET) });
    this.getRandomWord(this.state.words);
    this.setState({ leftTry: NUM_TRY });
    this.setState({ message: null });
    this.setState({ score: score });
  };

  nextWord = () => {
    this.initializeGame(this.state.score + this.state.leftTry);
    this.getRandomWord(this.state.words);
  };

  tagUsedWord = (word) => {
    //TODO: manipulate hidden word object
  };

  backToMenu = () => {
    this.initializeGame(0);
  };

  updatedHiddenWord = (hiddenWord, letter) => {
    let isPresent = false;
    const updatedHiddenWord = [...hiddenWord];
    updatedHiddenWord.map((e, index) => {
      if (e.value == letter.value) {
        isPresent = true;
        updatedHiddenWord[index] = { ...updatedHiddenWord[index] };
        updatedHiddenWord[index].isUsed = !updatedHiddenWord[index].isUsed;
      }
    });
    this.setState({ hiddenWord: updatedHiddenWord });
    return { isPresent, hiddenWord: updatedHiddenWord };
  };

  updatedLetters = (letter) => {
    const updatedLetters = [...this.state.letters];
    updatedLetters.map((e, index) => {
      if (e.value == letter.value) {
        updatedLetters[index] = { ...updatedLetters[index] };
        updatedLetters[index].isUsed = !updatedLetters[index].isUsed;
      }
    });
    this.setState({ letters: updatedLetters });
  };

  handleLetterPress = (letter) => {
    const { hiddenWord, leftTry } = this.state;
    let left = leftTry;

    let updatedHiddenWord = this.updatedHiddenWord(hiddenWord, letter);

    this.updatedLetters(letter);

    if (!updatedHiddenWord.isPresent) {
      left = left - 1;
      this.setState({ leftTry: left });
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
    }

    if (this.isWordFound(updatedHiddenWord.hiddenWord)) {
      this.setState({
        message: (
          <MessagePanel
            message="Bravo! Vous avez trouvé le mot. "
            onNext={this.nextWord}
            onCancel={this.backToMenu}
          />
        ),
      });
    }
  };

  render() {
    const {
      indication,
      hiddenWord,
      letters,
      score,
      message,
      leftTry,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1, textAlign: 'right' }}>Score : {score} </Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{indication}</Text>
        {message}
        <Text style={{ flex: 1, textAlign: 'center' }}>
          Faux pas restants : {leftTry}{' '}
        </Text>

        <HiddenWord style={{ flex: 1 }} word={hiddenWord} />
        <LettersBoard
          style={{ flex: 2 }}
          letters={letters}
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
  },
});
