import React, { Component } from 'react';
import {
  Modal,
  View,
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles } from '../styles/styles';
import { Separator } from './separator';
import { Colors } from '../styles/color';

class MessageModal extends Component {
  state = {};
  render() {
    const {
      icon,
      headerTitle,
      title,
      message,
      buttonOk,
      buttonCancel,
      visible,
      onOk,
      onCancel,
    } = this.props;
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={Styles.modalView}>
          <View style={Styles.modalHeader}>
            <Icon
              name="ios-settings"
              type="ionicon"
              color={Colors.textColor1}
            ></Icon>
            <Text style={Styles.titleModal}> {title}</Text>
          </View>
          <View>
            <Text>{title}</Text>
            <Text>{message}</Text>
          </View>
          <View style={Styles.separator} />
          <View Styles={Styles.modalFooter}>
            {buttonOk && (
              <TouchableHighlight style={Styles.infoButton} onPress={onOk}>
                <Text style={Styles.buttonText}>{buttonOk}</Text>
              </TouchableHighlight>
            )}
            {buttonCancel && (
              <TouchableHighlight
                style={Styles.warningButton}
                onPress={onCancel}
              >
                <Text style={Styles.buttonText}>{buttonCancel}</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

export default MessageModal;
