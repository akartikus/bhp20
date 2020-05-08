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

class AdventureListModal extends Component {
  state = {
    categories: getGroups(),
  };

  onItemPress = (e) => {
    if (!this.props.groupDone.includes(e.id)) this.props.onItemPress(e);
    else
      Alert.alert(
        'Mode fini',
        'Vous avez déja fini ce mode, voullez vous le refaire',
        [
          { text: 'Non', style: 'cancel' },
          {
            text: 'Oui',
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
