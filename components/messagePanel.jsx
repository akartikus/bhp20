import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MessagePanel = ({ onCancel, onNext, message }) => {
  return (
    <View style={{ backgroundColor: '#dee388' }}>
      <Text style={styles.title}>{message}</Text>
      <View style={styles.fixToText}>
        <Button title="Retour" onPress={onCancel} />
        <Button title="Suivant" onPress={onNext} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
});

export default MessagePanel;
