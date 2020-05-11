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
import { retrieveData, storeData } from './services/asyncStorageServices';
import { getI18n } from './services/i18n';
import MessageModal from './components/messageModal';

const WORDS_PER_LEVEL = 2;
const MAX_LEVEL = 2;

class App extends Component {
  state = {
    message: '',
    oldScore: 0,
    numWordsFound: 0,
    adventureListVisible: false,
    menuVisible: false,
    disableWordManager: false,
    //User state
    level: 1,
    score: 0,
    group: 0,
    allLevelsDone: false,
    listWordsFound: [],
    groupDone: [],
    //User preferences
    region: 'fr',
    userName: 'user',
  };

  componentDidMount() {
    //storeData('userName', '');
    this.initialize();
  }

  i18n = (key) => {
    return getI18n(key, this.state.region);
  };

  initialize = () => {
    this.initializeState('level');
    this.initializeState('score');
    this.initializeState('group');
    this.initializeState('allLevelsDone');
    this.initializeState('message');
    this.initializeState('numWordsFound');
    this.initializeState('groupDone');
    this.initializeState('region');
    this.initializeState('userName');
  };

  initializeState = (key) => {
    retrieveData(key)
      .then((res) => {
        const state = { ...this.state };
        state[key] = res;
        this.setState(state);
      })
      .catch((error) => {
        console.log('Promise is rejected with error: ' + error);
      });
  };

  resetListWordsFound() {
    const listWordsFound = [];
    this.setState({ listWordsFound });
    storeData('listWordsFound', listWordsFound);
  }

  allLevelsDone = (word) => {
    this.setState({ allLevelsDone: true });
    storeData('allLevelsDone', true);
    this.resetListWordsFound();
    const message =
      this.i18n('message_true') +
      word.value +
      ' (' +
      word.ref +
      ') ' +
      this.i18n('message_levelDone');
    Alert.alert(this.i18n('message_congrats'), message, [
      { text: this.i18n('label_next'), style: 'ok' },
    ]);
    this.waitModeChoice();
  };

  goToNextLevel = (word) => {
    this.setState({ level: this.state.level + 1 });
    this.resetListWordsFound();
    storeData('level', this.state.level + 1);

    const message =
      this.i18n('message_true') +
      word.value +
      '(' +
      word.ref +
      ')' +
      this.i18n('message_nextLevel');
    Alert.alert(this.i18n('message_congrats'), message, [
      { text: this.i18n('label_next'), style: 'ok' },
    ]);
  };

  adventureDone = (word) => {
    const message =
      this.i18n('message_true') +
      word.value +
      ' (' +
      word.ref +
      ')' +
      this.i18n('message_modeDone');
    Alert.alert(this.i18n('message_congrats'), message, [
      { text: this.i18n('label_next'), style: 'ok' },
    ]);
    this.resetListWordsFound();
    const groupDone = [...this.state.groupDone, word.group];
    this.setState({ groupDone });
    storeData('groupDone', groupDone);
    this.waitModeChoice();
  };

  readyForNextWord = (word, loadNewWord) => {
    const message =
      this.i18n('message_true') + word.value + ' (' + word.ref + ')';
    Alert.alert('Bravo!!', message, [
      { text: this.i18n('cancel'), style: 'cancel' },
      { text: this.i18n('next'), style: 'ok', onPress: loadNewWord },
    ]);
  };

  waitModeChoice = () => {
    this.setState({ disableWordManager: true });
  };

  onFound = (left, word, loadNewWord) => {
    const score = this.state.score + left;
    const listWordsFound = [...this.state.listWordsFound, word.id];
    this.setState({ listWordsFound });
    storeData('listWordsFound', listWordsFound);
    const numWordsFound = listWordsFound.length;

    if (numWordsFound === WORDS_PER_LEVEL) {
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
      this.readyForNextWord(word, loadNewWord);
    }
    this.setState({ score });
    storeData('score', score);
  };

  onNotFound = (word) => {
    const message =
      this.i18n('message_notFound') + word.value + ' (' + word.ref + ')';
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
      storeData('adventureListVisible', false);
      storeData('group', e.id);

      if (e.level) {
        this.setState({ level: e.level });
        storeData('level', e.level);
      }
      this.setState({ disableWordManager: false });
      this.setState({ numWordsFound: 0 });
      storeData('numWordsFound', 0);
    }
  };

  reactivateMode = (mode) => {
    const groupDone = [...this.state.groupDone].filter((e) => e != mode.id);
    this.setState({ groupDone });
    storeData('groupDone', groupDone);
  };

  handleModeListPress = () => {
    if (!this.state.allLevelsDone) {
      Alert.alert('Oops!!', this.i18n('message_needToFinish'), [
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

  handleRegionChange = (e) => {
    this.setState({ region: e });
    storeData('region', e);
  };

  handleReset = (e) => {
    Alert.alert(this.i18n('message_warning'), this.i18n('message_reset'), [
      { text: this.i18n('ok'), style: 'ok', onPress: this.reset },
      { text: this.i18n('no'), style: 'cancel' },
    ]);
  };

  reset = () => {
    this.setState({ score: 0 });
    storeData('score', 0);

    this.setState({ level: 1 });
    storeData('level', 1);

    this.setState({ group: 0 });
    storeData('group', 0);

    this.setState({ allLevelsDone: false });
    storeData('allLevelsDone', false);

    this.setState({ listWordsFound: [] });
    storeData('listWordsFound', []);

    this.setState({ groupDone: [] });
    storeData('groupDone', []);
  };

  displayMessageModal = () => {
    if (!this.state.userName) {
      return (
        <MessageModal
          onOk={(e) => {
            this.setState({ userName: e });
            storeData('userName', e);
          }}
        ></MessageModal>
      );
    }
  };

  render() {
    const {
      score,
      level,
      adventureListVisible,
      menuVisible,
      listWordsFound,
      group,
      disableWordManager,
      groupDone,
      region,
      userName,
    } = this.state;
    return (
      <View style={styles.container}>
        {this.displayMessageModal()}
        <AdventureListModal
          region={region}
          visible={adventureListVisible}
          groupDone={groupDone}
          onItemPress={this.handleCategoryPress}
          onCancel={this.handleCancel}
          reactivateMode={this.reactivateMode}
        ></AdventureListModal>
        <MenuModal
          region={region}
          visible={menuVisible}
          onClose={this.handleMenuClose}
          onRegionChange={this.handleRegionChange}
          onReset={this.handleReset}
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
                {userName}
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
            title={this.i18n('label_mode')}
            onPress={this.handleModeListPress}
          ></Button>
          <GameMode
            region={region}
            level={level}
            mode={group}
            progresion={listWordsFound.length}
            goal={WORDS_PER_LEVEL}
          ></GameMode>
        </View>
        <View style={styles.wordManager}>
          <WordManager
            style={styles.wordManager}
            level={level}
            group={group}
            region={region}
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
