import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Styles } from '../styles/styles';
import { Separator } from './separator';
import { getI18n } from '../services/i18n';
import { Image } from 'react-native';

class MenuModal extends Component {
  state = {};

  i18n = (key) => {
    return getI18n(key, this.props.region);
  };

  getFlagStyle = (region) => {
    return region === this.props.region
      ? Styles.flagEnable
      : Styles.flagDisable;
  };
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
            <Text style={Styles.titleModal}>{this.i18n('menu_head')}</Text>
          </View>
          <View style={Styles.regionContent}>
            <TouchableOpacity
              style={this.getFlagStyle('mg')}
              onPress={() => this.props.onRegionChange('mg')}
            >
              <Image
                source={require('../img/madagascar-flag-icon-64.png')}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.getFlagStyle('fr')}
              onPress={() => this.props.onRegionChange('fr')}
            >
              <Image source={require('../img/france-flag-icon-64.png')}></Image>
            </TouchableOpacity>
          </View>
          <Separator></Separator>
          <Button
            title={this.i18n('reset')}
            onPress={this.props.onReset}
          ></Button>
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
                <Text style={Styles.buttonText}>{this.i18n('close')}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MenuModal;
