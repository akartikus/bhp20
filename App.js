import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';
import WordManager from './components/wordManager';

const WORDS_PER_LEVEL = 2;
const MAX_LEVEL = 2;

class App extends Component {
  state = {
    message: null,
    score: 0,
    level: 1,
    wordsFound: 0,
  };

  componentDidMount() {}

  initializeGame = (score) => {
    this.setState({ message: null });
    this.setState({ score: score });
  };

  onFound = (left) => {
    const score = this.state.score + left;
    const wordsFound = this.state.wordsFound + 1;
    const message = 'Mot trouvé';
    if (wordsFound === WORDS_PER_LEVEL) {
      this.setState({ level: this.state.level + 1 });
      this.setState({ wordsFound: 0 });
    } else {
      this.setState({ wordsFound });
    }

    this.setState({
      message: (
        <MessagePanel
          message={message}
          onNext={this.nextWord}
          onCancel={this.backToMenu}
        />
      ),
    });
    this.setState({ score });
  };

  onNotFound = () => {
    console.log(' :((( ');
  };

  render() {
    const { score, message, level } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1, textAlign: 'right' }}>Score : {score} </Text>
        <Text style={{ flex: 1, textAlign: 'left' }}>Niveau => {level} </Text>

        {message}

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
});
