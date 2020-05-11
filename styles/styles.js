import { StyleSheet } from 'react-native';
import { Colors } from './color';
import { withTheme } from 'react-native-elements';

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

  headerText: {
    padding: 3,
    color: Colors.textColor1,
    fontSize: 16,
    fontWeight: 'bold',
  },

  disableView: {
    backgroundColor: Colors.backgroundDisableColor,
    flex: 1,
    justifyContent: 'space-around',
  },

  flagEnable: {
    margin: 5,
    borderColor: Colors.textColor1,
    borderRadius: 5,
    borderWidth: 2,
  },
  flagDisable: {
    margin: 5,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    opacity: 0.5,
  },

  regionContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
