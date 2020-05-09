import React from 'react';
import { View, Text } from 'react-native';
import { getGroupName } from '../services/dataService';
import { getI18n } from '../services/i18n';

const GameMode = ({ mode, level, progresion, goal, region }) => {
  return (
    <View>
      <Text>
        {getI18n('mode_label', region)} : {getGroupName(mode).label}
      </Text>
      <Text>
        {getI18n('mode_level', region)} : {level}{' '}
      </Text>
      <Text>
        {getI18n('mode_wordsFound', region)} : {progresion}/{goal}
      </Text>
    </View>
  );
};
export default GameMode;
