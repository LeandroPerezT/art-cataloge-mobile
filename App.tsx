import React from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './app/screens/MainNavigator';

function App(): JSX.Element {
  return (
    <Provider store={store}>

      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
