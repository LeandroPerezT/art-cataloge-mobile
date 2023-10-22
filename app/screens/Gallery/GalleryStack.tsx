import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GalleryScreen from './GalleryScreen';
import ArtworkScreen from './ArtworkScreen';

export type GalleryStackParams = {
  Gallery: undefined;
  Artwork: { artworkId: number };
};

const Stack = createNativeStackNavigator<GalleryStackParams>();

const GalleryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Artwork" component={ArtworkScreen} />
    </Stack.Navigator>
  );
};

export default GalleryStack;
