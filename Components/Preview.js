import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

export default function Preview() {

  const [copyNum, setCopyNum] = useState(1);
  const [result, setResult] = useState();
  const selectSinglePDF = () => {
    DocumentPicker.pick({
      type: types.pdf,
    })
      .then(setResult)
      .catch(handleError);
  };

  useEffect(() => {
    console.log('result: ', JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const settings = () => {};
  const print = () => {};
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      {/* HEADER BEGINE */}
      <View style={styles.headerBackground}>
        <Image
          style={styles.image}
          source={require('../assets/image/back_arrow_02.png')}
        />
        <Text style={styles.headerText}> Preview </Text>
      </View>
      {/* HEADER END */}

      {/* COPIES BEGINE */}
      <View style={styles.copies}>
        <Text style={styles.text}> Copies: {copyNum} </Text>
        <View style={styles.copyNumBtn}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="#DDDDDD"
            onPress={() => {
              setCopyNum(copyNum - 1);
            }}>
            <Image
              style={styles.copyNumChangeBtn}
              source={require('../assets/image/si-glyph-button-remove.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              setCopyNum(copyNum + 1);
            }}>
            <Image
              style={styles.copyNumChangeBtn}
              source={require('../assets/image/si-glyph-button-plus.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
      {/* COPIES END */}

      {/* PICK FILE BUTTON BEGINE */}
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'space-between',
        }}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={styles.touchableHightlight}
          onPress={selectSinglePDF}>
          <Text style={styles.button}> Pick a file to print </Text>
        </TouchableHighlight>
      </View>
      {/* PICK FILE BUTTON END */}

      {/* PREVIEW PART BEGINE */}
      <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text>
      {/* PREVIEW PART END */}

      {/* SETTING & PRINT BUTTON BEGINE */}
      <View style={{position: 'absolute', bottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
            justifyContent: 'space-between',
          }}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#fff"
            style={styles.touchableHightlight}
            onPress={settings}>
            <Text style={styles.button}> Settings </Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#fff"
            style={styles.touchableHightlight}
            onPress={print}>
            <Text style={styles.button}> Print </Text>
          </TouchableHighlight>
        </View>
      </View>
      {/* SETTING & PRINT BUTTON END */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontStyle: 'bold',
  },
  headerBackground: {
    width: '100%',
    height: 60,
    backgroundColor: '#ee6809',
    // alignItems: 'end',
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableHightlight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: '45%',
  },
  copies: {
    width: '100%',
    height: 60,
    // alignItems: 'end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
  },
  copyNumBtn: {
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 2,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 2,
  },
  copyNumChangeBtn: {
    width: 25,
    height: 23,
    marginRight: 2,
  },
});
