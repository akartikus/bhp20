import React, { Component } from 'react';
import {
  Modal,
  View,
  Button,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles } from '../styles/styles';
import { Colors } from '../styles/color';

class MessageModal extends Component {
  state = {
    username: '',
  };
  handleUserNameChange = (e) => {
    const username = e;
    this.setState({ username });
  };
  render() {
    const { onOk } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        backdropColor={'black'}
        backdropOpacity={1}
      >
        <View
          style={{
            ...Styles.modalView,
          }}
        >
          <View style={Styles.modalHeader}>
            <Icon
              name="ios-settings"
              type="ionicon"
              color={Colors.textColor1}
            ></Icon>
            <Text style={Styles.titleModal}> Bienvenue le Pendu Biblique</Text>
          </View>
          <View>
            <Text>Pour commencer saisir votre nom</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: Colors.textColor1,
                borderRadius: 5,
                borderWidth: 1,
                fontSize: 15,
              }}
              onChangeText={(text) => this.handleUserNameChange(text)}
              value={this.state.uername}
            />
            <Text>
              Pendu Biblique est un mini jeu pour tester votre connaissance tout
              en s'amusant. Vous pouvez changer la langue ou trouver de l'aide
              dans le menu.
            </Text>
          </View>
          <View style={Styles.separator} />
          <View Styles={Styles.modalFooter}>
            <TouchableHighlight
              style={Styles.infoButton}
              onPress={() => onOk(this.state.username)}
            >
              <Text style={Styles.buttonText}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MessageModal;
