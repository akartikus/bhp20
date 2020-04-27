import { StyleSheet } from 'react-native';
import { Colors } from './color';

export const Styles = StyleSheet.create({
  //Modal styles
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalHeader: {
    alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomColor: Colors.textColor1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  titleModal: {
    fontSize: 15,
    color: Colors.textColor1,
  },
  separator: {
    marginVertical: 8,
    alignSelf: 'stretch',
    borderBottomColor: Colors.textColor1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  //Button styles
  buttonText: {
    padding: 3,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: Colors.buttonColorInfo1,
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
  warningButton: {
    backgroundColor: Colors.buttonColorWarning1,
    borderRadius: 15,
    padding: 10,
    elevation: 2,
  },
});