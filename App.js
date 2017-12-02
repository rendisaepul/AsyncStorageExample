/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Button
} from 'react-native';

import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    isLoading: false
  };

  setIsLoading = (status) => {
    this.setState({ isLoading: status });
  }

  fetchJsonPlaceHolder = (dispatch = () => {}) => {
    dispatch(this.setIsLoading(true));
    axios.get('https://jsonplaceholder.typicode.com/users?id=1')
      .then( async (res) => {
        console.log('response', res.data[0]);

        const profile = JSON.stringify(res.data[0]);
        console.log(profile);

        try {
          await AsyncStorage.setItem('profile', profile);
        } catch (error) {
          console.log('error', error);
        }
        dispatch(this.setIsLoading(false));
      })
      .catch((err) => {
        console.log('error', err);
        dispatch(this.setIsLoading(false));
      });
  }

  getProfile = async () => {
    try {
      const profile = JSON.parse(await AsyncStorage.getItem('profile'));
      console.log('AsyncStorage', profile);
    } catch (error) {
        console.log('error', error);
    }
  }

  clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <View style={styles.container}>
        <View style={{ padding: 5 }}>
          <Button
            onPress={() => {this.fetchJsonPlaceHolder()}}
            title={isLoading ? 'Loading...' : 'Fetch Data'}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Button
            onPress={() => {this.getProfile()}}
            title='Feth From AsyncStorage'
          />
        </View>
        <View style={{ padding: 5 }}>
          <Button
            onPress={() => {this.clearAsyncStorage()}}
            title='Clear AsyncStorage'
          />
        </View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
