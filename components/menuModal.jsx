import React, { Component } from 'react';
import { Text, Button, StyleSheet, Modal, View, CheckBox } from 'react-native';
import { Icon } from 'react-native-elements';

class MenuModal extends Component {
  state = {};
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Icon name="ios-settings" type="ionicon" color="#517fa4"></Icon>
            <Text style={styles.title}> Parametres</Text>
          </View>
          <View>
            <CheckBox></CheckBox>
            <Text>Malagasy</Text>
            <CheckBox></CheckBox>
            <Text>Francais</Text>
          </View>
          <Separator></Separator>
          <View>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{' '}
            </Text>
          </View>
          <Separator></Separator>
          <Button onPress={this.props.onClose} title="Fermer"></Button>
        </View>
      </Modal>
    );
  }
}
const Separator = () => {
  return <View style={styles.separator} />;
};
export default MenuModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 15,
    color: '#517fa4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#517fa4',
    marginBottom: 5,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
