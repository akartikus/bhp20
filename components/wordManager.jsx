import React, { Component } from 'react';
import _ from 'lodash';
import HiddenWord from './hiddenWord';
import { View, Text, useColorScheme } from 'react-native';
import { getWords } from '../services/fakeWordsService';
import { wordToMap, NUM_TRY, ALPHABET, isWordFound } from '../utils/wordUtils';
import LettersBoard from './lettersBoard';

class WordManager extends Component {
  state = {
    hiddenWord: null,
    wordList: [],
    letters: [],
    leftTry: NUM_TRY,
    isNewWord: false,
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.level != this.props.level) {
      this.initialize();
    } else if (this.state.isNewWord) {
      this.initialize();
    }
  }

  initialize = () => {
    const wordList = getWords(this.props.level).filter((e) => !e.isUsed);
    const hiddenWord = _.sample(wordList);
    const index = wordList.indexOf(hiddenWord);
    wordList[index] = { ...wordList[index] };
    wordList[index].isUsed = true;
    this.setState({ wordList });
    this.setState({
      hiddenWord: { ...hiddenWord, word: wordToMap(hiddenWord.value) },
    });
    this.setState({ isNewWord: false });
    this.setState({ letters: wordToMap(ALPHABET) });
    this.setState({ leftTry: NUM_TRY });
  };

  updatedHiddenWord = (letter) => {
    const { word } = this.state.hiddenWord;
    let isPresent = false;
    const hiddenWord = { ...this.state.hiddenWord };
    hiddenWord.word.map((e, index) => {
      if (e.value == letter.value) {
        isPresent = true;
        hiddenWord.word[index] = { ...word[index] };
        hiddenWord.word[index].isUsed = !word[index].isUsed;
      }
    });
    this.setState({ hiddenWord });
    return { isPresent, hiddenWord };
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
    const { leftTry } = this.state;
    let left = leftTry;
    let updatedHiddenWord = this.updatedHiddenWord(letter);
    this.updatedLetters(letter);
    if (!updatedHiddenWord.isPresent) {
      left = left - 1;
      this.setState({ leftTry: left });
      if (left === 0) {
        this.props.onNotFound(updatedHiddenWord.hiddenWord);
        this.setState({ isNewWord: true });
      }
    } else if (isWordFound(updatedHiddenWord.hiddenWord.word)) {
      //TODO: Update word status to found/used
      this.props.onFound(left, updatedHiddenWord.hiddenWord);
      this.setState({ isNewWord: true });
    }
  };

  getWord = () => {
    return this.state.hiddenWord != null ? this.state.hiddenWord.word : [];
  };

  render() {
    const word = this.getWord();
    const { hiddenWord, letters, leftTry } = this.state;
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>
          Indice : {hiddenWord != null && hiddenWord.indication}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Faux pas restants : {leftTry}{' '}
        </Text>
        <HiddenWord word={word}></HiddenWord>
        <LettersBoard letters={letters} onPress={this.handleLetterPress} />
      </View>
    );
  }
}

export default WordManager;
