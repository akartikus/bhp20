import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { getGroups } from '../services/fakeWordsService';
import { Separator } from './separator';
import { Styles } from '../styles/styles';

class AdventureListModal extends Component {
  state = {
    categories: getGroups(),
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={Styles.modalView}>
          <View>
            {this.state.categories.map((e, index) => (
              <ListItem
                key={index}
                title={e.label}
                bottomDivider
                onPress={() => this.props.onItemPress(e)}
              ></ListItem>
            ))}
          </View>

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
