import React, { Component } from 'react';
import _ from 'lodash';
import HiddenWord from './hiddenWord';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { getWords } from '../services/fakeWordsService';
import { wordToMap, NUM_TRY, ALPHABET, isWordFound } from '../utils/wordUtils';
import LettersBoard from './lettersBoard';
import { Icon, Rating } from 'react-native-elements';

class WordManager extends Component {
  state = {
    hiddenWord: null,
    wordList: [],
    letters: [],
    leftTry: NUM_TRY,
    isNewWord: false,
    diseableRefresh: true,
    activateLettersBoard: true,
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(oldProps) {
    if (
      oldProps.level != this.props.level ||
      oldProps.group != this.props.group
    ) {
      this.initialize();
    } else if (this.state.isNewWord) {
      this.initialize();
    }
  }

  initialize = () => {
    console.log(
      'level ',
      this.props.level,
      ' group ',
      this.props.group,
      getWords(this.props.level, this.props.group)
    );
    const wordList = getWords(this.props.level, this.props.group).filter(
      (e) => !e.isUsed
    );
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
      this.props.onFound(left, updatedHiddenWord.hiddenWord);
      this.setState({ activateLettersBoard: false });
      this.setState({ diseableRefresh: false });
    }
  };

  getWord = () => {
    return this.state.hiddenWord != null ? this.state.hiddenWord.word : [];
  };

  refreshWord = () => {
    this.setState({ isNewWord: true });
    this.setState({ diseableRefresh: true });
  };

  render() {
    const word = this.getWord();
    //const notebook = ;
    const {
      hiddenWord,
      letters,
      leftTry,
      activateLettersBoard,
      diseableRefresh,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.lifeView}>
          <Icon
            name="refresh"
            disabled={diseableRefresh}
            title="Refresh"
            onPress={this.refreshWord}
            style={{ alignSelf: 'flex-end' }}
          ></Icon>
          <Rating
            type="heart"
            ratingColor="blue"
            ratingCount={NUM_TRY}
            startingValue={leftTry}
            imageSize={30}
            readonly
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View style={styles.indicationView}>
          <ImageBackground
            source={require('../img/notebook.png')}
            resizeMode={'stretch'}
            style={styles.image}
          >
            <Icon name="light-bulb" type="octicon" color="#517fa4"></Icon>
            <Text
              style={{
                textAlign: 'center',
                color: '#517fa4',
              }}
            >
              {hiddenWord != null && hiddenWord.indication}
            </Text>
          </ImageBackground>
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
  },

  lifeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  indicationView: {
    flex: 2,
    //borderColor: '#404d52',
    //borderWidth: 1,
    //borderRadius: 10,
    //backgroundColor: '#ddebdd',
    marginHorizontal: 20,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.8,
    //shadowRadius: 2,
  },
});
