import React from 'react';
import { View, Text } from 'react-native';
import { getGroupName } from '../services/fakeWordsService';

const GameMode = ({ mode, level, progresion, goal }) => {
  return (
    <View>
      <Text>Vous êtes en mode {getGroupName(mode).label}</Text>
      <Text>Niveau : {level} </Text>
      <Text>
        Mots trouvés : {progresion}/{goal}
      </Text>
    </View>
  );
};
export default GameMode;
