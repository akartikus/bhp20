import React from 'react';
import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { getGroupName } from '../services/dataService';
import { getI18n } from '../services/i18n';
import { Icon } from 'react-native-elements';
import { Colors } from '../styles/color';

const GameMode = ({ mode, level, progresion, goal, region, onModePress }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: '500', color: Colors.textColor1 }}
        >
          {getGroupName(mode).label}
        </Text>
        <TouchableOpacity onPress={onModePress}>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
            }}
            source={require('../img/edit.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignContent: 'stretch',
            backgroundColor: Colors.backgroundColor,
            borderTopLeftRadius: 35,
            borderBottomRightRadius: 35,
            borderColor: 'white',
            borderWidth: 2,

            elevation: 5,
          }}
        >
          <View style={{ margin: '3%', flex: 1, alignItems: 'center' }}>
            <Text>{getI18n('mode_level', region)}</Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 25,
              }}
            >
              {level}
            </Text>
          </View>
          <View style={{ flex: 1, margin: '3%', alignItems: 'center' }}>
            <Text>{getI18n('mode_wordsFound', region)}</Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 25,
              }}
            >
              {progresion}/{goal}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default GameMode;
