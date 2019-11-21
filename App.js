import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigator from './src/lib/navigators/MainNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainNavigator />
    </>
  );
};

export default App;
