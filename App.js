import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import _ from 'lodash';
import WordManager from './components/wordManager';
import { Avatar, Header, Icon } from 'react-native-elements';
import AdventureListModal from './components/adventureListModal';
import MenuModal from './components/menuModal';
import { Colors } from './styles/color';
import Score from './components/score';
import GameMode from './components/gameMode';

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
    adventureListVisible: false,
    menuVisible: false,
    allLevelsDone: false,
    disableWordManager: false,
  };

  initializeGame = (score) => {
    this.setState({ message: null });
    this.setState({ score: score });
  };

  allLevelsDone = (word) => {
    this.setState({ allLevelsDone: true }); //TODO: Update db
    const message =
      "C'était bien " +
      word.value +
      ' dans ' +
      word.ref +
      'Vous avez fini tout les niveaux, choisissez un autre mode';
    Alert.alert('Bravo!!', message, [{ text: 'Suivant', style: 'ok' }]);
    this.waitModeChoice();
  };

  goToNextLevel = (word) => {
    //TODO: Mark level as done db
    this.setState({ level: this.state.level + 1 });
    this.setState({ wordsFound: 0 });
    const message =
      "C'était bien " +
      word.value +
      ' dans ' +
      word.ref +
      '. Vous passez au prochaine niveau.';
    Alert.alert('Bravo!!', message, [{ text: 'Suivant', style: 'ok' }]);
  };

  adventureDone = (word) => {
    const message =
      "C'était bien " +
      word.value +
      ' dans ' +
      word.ref +
      ". Vous avez fini l'aventure.";
    Alert.alert('Bravo!!', message, [{ text: 'Suivant', style: 'ok' }]);
    //TODO: Mark current mode done
    this.waitModeChoice();
  };

  readyForNextWord = (wordsFound, word, loadNewWord) => {
    const message = "C'était bien " + word.value + ' dans ' + word.ref;
    Alert.alert('Bravo!!', message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Suivant', style: 'ok', onPress: loadNewWord },
    ]);
    this.setState({ wordsFound });
  };

  waitModeChoice = () => {
    this.setState({ disableWordManager: true, wordsFound: WORDS_PER_LEVEL });
  };

  onFound = (left, word, loadNewWord) => {
    const score = this.state.score + left;
    const wordsFound = this.state.wordsFound + 1;

    if (wordsFound === WORDS_PER_LEVEL) {
      if (!this.state.allLevelsDone) {
        if (this.state.level + 1 > MAX_LEVEL) {
          this.allLevelsDone(word);
        } else {
          this.goToNextLevel(word);
        }
      } else {
        this.adventureDone(word);
      }
    } else {
      this.readyForNextWord(wordsFound, word, loadNewWord);
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

  //Category handlers
  handleCategoryPress = (e) => {
    if (e) {
      this.setState({ adventureListVisible: false });
      this.setState({ group: e.id });
      if (e.level) {
        this.setState({ level: e.level });
      }
      this.setState({ disableWordManager: false });
      this.setState({ wordsFound: 0 });
    }
  };

  handleModeListPress = () => {
    if (!this.state.allLevelsDone) {
      Alert.alert('Oops!!', "Finissez d'abord tout les niveaux", [
        { text: 'Cancel', style: 'cancel' },
      ]);
    } else {
      this.setState({ adventureListVisible: true });
    }
  };

  handleCancel = () => {
    this.setState({ adventureListVisible: false });
  };

  //Menu handlers
  handleMenuClose = () => {
    this.setState({ menuVisible: false });
  };
  handleMenuOpen = () => {
    this.setState({ menuVisible: true });
  };

  render() {
    const {
      score,
      level,
      adventureListVisible,
      menuVisible,
      wordsFound,
      group,
      disableWordManager,
    } = this.state;
    return (
      <View style={styles.container}>
        <AdventureListModal
          visible={adventureListVisible}
          onItemPress={this.handleCategoryPress}
          onCancel={this.handleCancel}
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
          centerComponent={<Score score={score} />}
          rightComponent={
            <Icon
              name="ios-menu"
              type="ionicon"
              color={Colors.titleColor1}
              onPress={this.handleMenuOpen}
            ></Icon>
          }
        />

        <View style={styles.header}></View>
        <View style={styles.levelPanel}>
          <Button
            title="Choisir niveau/adventure"
            onPress={this.handleModeListPress}
          ></Button>
          <GameMode
            level={level}
            mode={group}
            progresion={wordsFound}
            goal={WORDS_PER_LEVEL}
          ></GameMode>
        </View>
        <View style={styles.wordManager}>
          <WordManager
            style={styles.wordManager}
            level={level}
            group={group}
            disabled={disableWordManager}
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
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.headerColor,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.footerColor,
  },
  //Todo: Need refactor
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
});
