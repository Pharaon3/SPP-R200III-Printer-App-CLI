import { Linking, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button, Image } from 'react-native';
import React, {useState} from 'react';
import { Home } from './Home';
import { selectPrinter } from './selectPrinter';

import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function Main() {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#000" />
      {/* Header */}
      <View style={styles.headerBackground}>
        <Text style={styles.headerText}> mPrint </Text>
      </View>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen  options={{ headerShown: false }}
            name="selectPrinter"
            component={selectPrinter}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
  text: {
    color: '#000',
    fontSize: 40,
    fontStyle: 'italic',
    margin: 10,
  },
  headerBackground: {
    width: '100%',
    height: 40,
    backgroundColor: '#ee6809',
    // alignItems: 'end',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
  },
  category: {
    height: 100,
    // justifyContent: 'center',
    width: '90%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#f55',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  selPrinter: {
    height: 40,
    justifyContent: 'center',
    width: '60%',
    backgroundColor: '#ee6809',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#f55',
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  warningImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  selPrinterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
