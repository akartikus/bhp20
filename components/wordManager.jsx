import React, { Component } from 'react';
import _ from 'lodash';
import HiddenWord from './hiddenWord';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { getWords } from '../services/dataService';
import { wordToMap, NUM_TRY, ALPHABET, isWordFound } from '../utils/wordUtils';
import LettersBoard from './lettersBoard';
import { Icon, Rating } from 'react-native-elements';
import { Styles } from '../styles/styles';
import { Colors } from '../styles/color';

class WordManager extends Component {
  state = {
    hiddenWord: null,
    wordList: [],
    letters: [],
    leftTry: NUM_TRY,
    isNewWord: false,
    activateLettersBoard: true,
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(oldProps) {
    if (this.props.disabled) {
    } else {
      if (
        oldProps.level != this.props.level ||
        oldProps.group != this.props.group
      ) {
        this.initialize();
      } else if (this.state.isNewWord) {
        this.initialize();
      }
    }
  }

  initialize = () => {
    const wordList = getWords(
      this.props.level,
      this.props.group,
      this.props.region
    ).filter((e) => !e.isUsed);
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
    this.setState({ activateLettersBoard: true });
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
        this.setState({ activateLettersBoard: false });
        this.setState({ diseableRefresh: false });
      }
    } else if (isWordFound(updatedHiddenWord.hiddenWord.word)) {
      //TODO: Update word status to found/used
      this.props.onFound(left, updatedHiddenWord.hiddenWord, () =>
        this.setState({ isNewWord: true })
      );
      this.setState({ activateLettersBoard: false });
      this.setState({ diseableRefresh: false });
    }
  };

  getWord = () => {
    return this.state.hiddenWord != null ? this.state.hiddenWord.word : [];
  };

  render() {
    const word = this.getWord();
    //const notebook = ;
    const { hiddenWord, letters, leftTry, activateLettersBoard } = this.state;
    if (this.props.disabled)
      return (
        <View style={Styles.disableView}>
          <Text>⚠️</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.indicationView}>
          <View style={{ flex: 1 }}>
            <Rating
              type="heart"
              ratingColor="black"
              ratingCount={NUM_TRY}
              startingValue={leftTry}
              imageSize={30}
              readonly
            />
          </View>

          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                fontStyle: 'italic',
                color: Colors.textColor1,
              }}
            >
              {hiddenWord != null && '"' + hiddenWord.indication + '"'}
            </Text>
          </View>
        </View>
        <HiddenWord word={word}></HiddenWord>
        <LettersBoard
          active={activateLettersBoard}
          letters={letters}
          onPress={this.handleLetterPress}
        />
      </View>
    );
  }
}

export default WordManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: '5%',
  },
  lifeView: {
    flexDirection: 'row',
    padding: 5,
  },
  indicationView: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 5,
  },
});
