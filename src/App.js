import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { LogBox } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { Loading } from './components';

LogBox.ignoreLogs(['Setting a timer']);

const MainApp = () => {
  const stateGlobal = useSelector((state) => state);

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}

export default App
