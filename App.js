import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import _ from 'lodash';
import WordManager from './components/wordManager';

const WORDS_PER_LEVEL = 2;
const MAX_LEVEL = 2;

class App extends Component {
  state = {
    message: '',
    score: 0,
    level: 1,
    wordsFound: 0,
    modalVisible: false,
  };

  componentDidMount() {}

  initializeGame = (score) => {
    this.setState({ message: null });
    this.setState({ score: score });
  };

  onFound = (left) => {
    const score = this.state.score + left;
    const wordsFound = this.state.wordsFound + 1;
    const message = 'Mot trouvé, vous passez au prochain niveau';
    if (wordsFound === WORDS_PER_LEVEL) {
      this.setState({ level: this.state.level + 1 });
      this.setState({ wordsFound: 0 });
      this.setState({ message });
      this.setModalVisible(true);
    } else {
      this.setState({ wordsFound });
    }

    this.setState({ score });
  };

  onNotFound = (word) => {
    console.log(word);
    const message = "Dommage :( , c'était " + word.value + ' dans: ' + word.ref;
    this.setState({ message });
    this.setModalVisible(true);
  };

  nextWord = () => {
    this.setState({ message: null });
  };

  backToMenu = () => {
    this.setState({ message: null });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { score, message, level, modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'right' }}>Score : {score} </Text>
        <Text style={{ textAlign: 'left' }}>Niveau => {level} </Text>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Fermer</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <WordManager
          level={this.state.level}
          onFound={this.onFound}
          onNotFound={this.onNotFound}
        ></WordManager>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
