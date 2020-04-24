import React, { Component } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getGroups } from '../services/fakeWordsService';

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
        <View style={styles.modalView}>
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
        </View>
      </Modal>
    );
  }
}

export default AdventureListModal;
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
});
