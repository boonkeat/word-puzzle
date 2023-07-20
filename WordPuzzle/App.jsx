/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView, } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Home from './src/pages/Home';
import { store } from './src/redux/store';
import Quiz from './src/pages/Quiz';
import Summary from './src/pages/Summary';
import LeaderBoard from './src/pages/LeaderBoard';

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    Home: Home,
    Quiz: Quiz,
    Summary: Summary,
    LeaderBoard: LeaderBoard
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'history',
  }
));

function App() {
  useEffect(() => {

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', }}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
