import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Button,
} from 'react-native';
import _ from 'lodash';
import WordManager from './components/wordManager';
import { Avatar, Header } from 'react-native-elements';
import AdventureListModal from './components/adventureListModal';
import MenuModal from './components/menuModal';
import { Icon } from 'react-native-elements';

const WORDS_PER_LEVEL = 2;
const MAX_LEVEL = 2;

class App extends Component {
  state = {
    message: '',
    score: 0,
    oldScore: 0,
    level: 1,
    group: 0,
    wordsFound: 0,
    modalVisible: false,
    adventureListVisible: false,
    menuVisible: false,
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

  handleCategoryPress = (e) => {
    this.setState({ adventureListVisible: false });
    this.setState({ group: e.id });
  };

  handleMenuClose = () => {
    this.setState({ menuVisible: false });
  };
  handleMenuOpen = () => {
    this.setState({ menuVisible: true });
  };

  render() {
    const {
      score,
      message,
      level,
      modalVisible,
      adventureListVisible,
      menuVisible,
    } = this.state;
    return (
      <View style={styles.container}>
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
        <AdventureListModal
          visible={adventureListVisible}
          onItemPress={this.handleCategoryPress}
        ></AdventureListModal>
        <MenuModal
          visible={menuVisible}
          onClose={this.handleMenuClose}
        ></MenuModal>
        <Header
          placement="left"
          leftComponent={
            <View style={styles.userView}>
              <Avatar
                rounded
                icon={{
                  name: 'user',
                  type: 'font-awesome',
                }}
                overlayContainerStyle={{ backgroundColor: '#549ca8' }}
              ></Avatar>
              <Text style={{ textAlign: 'right', color: '#fff' }}>
                User name
              </Text>
            </View>
          }
          centerComponent={
            <Text style={{ fontSize: 20, color: '#fff' }}>Score : {score}</Text>
          }
          rightComponent={
            <Icon
              name="ios-menu"
              type="ionicon"
              color="#fff"
              onPress={this.handleMenuOpen}
            ></Icon>
          }
        />

        <View style={styles.header}></View>
        <View style={styles.levelPanel}>
          <Button
            title="Choisir niveau/adventure"
            onPress={() => this.setState({ adventureListVisible: true })}
          ></Button>
          <Text style={{ textAlign: 'left' }}>Niveau => {level} </Text>
          <Text style={{ textAlign: 'left' }}>o----o----o----o----| </Text>
        </View>
        <View style={styles.wordManager}>
          <WordManager
            style={styles.wordManager}
            level={this.state.level}
            group={this.state.group}
            onFound={this.onFound}
            onNotFound={this.onNotFound}
          ></WordManager>
        </View>
        <View style={styles.footer}>
          <Text>Copyright 2020 - POC Version</Text>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#acdeee',
  },

  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222b2e',
  },
  levelPanel: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderBottomWidth: 1,
  },

  wordManager: {
    flex: 6,
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
