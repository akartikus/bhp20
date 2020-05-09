import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableHighlight,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { ListItem, Tooltip } from 'react-native-elements';
import { getGroups } from '../services/dataService';
import { Styles } from '../styles/styles';
import { getI18n } from '../services/i18n';

class AdventureListModal extends Component {
  state = {
    categories: getGroups(),
  };

  i18n = (key) => {
    return getI18n(key, this.props.region);
  };

  onItemPress = (e) => {
    if (!this.props.groupDone.includes(e.id)) this.props.onItemPress(e);
    else
      Alert.alert(
        this.i18n('label_modeDone'),
        this.i18n('message_modeReplay'),
        [
          { text: this.i18n('no'), style: 'cancel' },
          {
            text: this.i18n('ok'),
            style: 'ok',
            onPress: () => this.reactivateMode(e),
          },
        ]
      );
  };

  reactivateMode = (e) => {
    this.props.reactivateMode(e);
    this.props.onItemPress(e);
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={Styles.modalView}>
          <ScrollView>
            {this.state.categories.map((e, index) => (
              <ListItem
                key={index}
                title={
                  <View>
                    <Text style={Styles.headerText}>
                      {e.label}
                      {this.props.groupDone.includes(e.id) && (
                        <Text style={{ color: '#41a82f' }}> (Done!)</Text>
                      )}
                    </Text>
                    <Text>{e.description}</Text>
                  </View>
                }
                bottomDivider
                onPress={() => this.onItemPress(e)}
              ></ListItem>
            ))}
          </ScrollView>

          <View style={Styles.modalFooter}>
            <TouchableHighlight
              style={Styles.warningButton}
              onPress={this.props.onCancel}
            >
              <Text style={Styles.buttonText}>Annuler</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AdventureListModal;
