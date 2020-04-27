import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Modal,
  View,
  CheckBox,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles } from '../styles/styles';
import { Separator } from './separator';
import { Colors } from '../styles/color';

class MenuModal extends Component {
  state = {};
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={Styles.modalView}>
          <View style={Styles.modalHeader}>
            <Icon name="ios-settings" type="ionicon" color="#517fa4"></Icon>
            <Text style={Styles.titleModal}> Parametres</Text>
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
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <Separator></Separator>
          <View style={Styles.modalFooter}>
            <TouchableHighlight
              style={Styles.warningButton}
              onPress={this.props.onClose}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon name="ios-close" type="ionicon" color="white"></Icon>
                <Text style={Styles.buttonText}>Fermer</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={Styles.infoButton}
              onPress={this.props.onClose}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon name="ios-save" type="ionicon" color="white"></Icon>
                <Text style={Styles.buttonText}>Enregistrer</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MenuModal;
