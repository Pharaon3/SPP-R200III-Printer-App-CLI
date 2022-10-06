import * as React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {useEffect, useState} from 'react';

export default function PreviewCli() {
  const [result, setResult] = useState();

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = (err: unknown) => {
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

  const seletSingleFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult([pickerResult]);
    } catch (e) {
      handleError(e);
    }
  };
  const selectMultiWord = () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.doc, types.docx],
    })
      .then(setResult)
      .catch(handleError);
  };
  const selectSinglePDF = () => {
    DocumentPicker.pick({
      type: types.pdf,
    })
      .then(setResult)
      .catch(handleError);
  };
  const selectMultiFile = () => {
    DocumentPicker.pickMultiple().then(setResult).catch(handleError);
  };
  return (
    <View style={styles.container}>
      <Button
        title="open picker for single file selection"
        onPress={seletSingleFile}
      />
      <Button
        title="open picker for multi file selection"
        onPress={selectMultiFile}
      />
      <Button
        title="open picker for multi selection of word files"
        onPress={selectMultiWord}
      />
      <Button
        title="open picker for single selection of pdf file"
        onPress={selectSinglePDF}
      />
      <Button
        title="releaseSecureAccess"
        onPress={() => {
          DocumentPicker.releaseSecureAccess([])
            .then(() => {
              console.warn('releaseSecureAccess: success');
            })
            .catch(handleError);
        }}
      />
      <Button
        title="open directory picker"
        onPress={() => {
          DocumentPicker.pickDirectory().then(setResult).catch(handleError);
        }}
      />

      <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
