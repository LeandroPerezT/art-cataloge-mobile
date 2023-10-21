/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { useGetArtworksQuery } from './app/services/artCatalog';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>Hola</Text>
        <Section />
      </SafeAreaView>
    </Provider>
  );
}

function Section(): JSX.Element {
  const { data: artworks, isLoading, isError, error } = useGetArtworksQuery();

  if (isLoading) { return <View><Text>Loading...</Text></View>; }
  if (isError) { return <View><Text>Error loading artworks. {JSON.stringify(error.data)}</Text></View>; }

  console.log({ artworks });

  return <Text>Check the console</Text>;
}

export default App;
