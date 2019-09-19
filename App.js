import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Splash from './Screens/Splash';
import Home from './Screens/Home';
import Quiz from './Screens/Quiz';

const RootStack = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      }
    },
  },
  {
    initialRouteName: 'Splash',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
