import React from 'react';
import { Text } from 'react-native';

const Score = ({ score }) => {
  return <Text style={{ fontSize: 20, color: '#fff' }}>Score : {score}</Text>;
};

export default Score;
