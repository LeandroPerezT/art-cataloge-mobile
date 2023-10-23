import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GalleryScreen from './GalleryScreen';
import ArtworkScreen from './ArtworkScreen';
import { Artwork } from '../../services/types/artworks.types';

export type GalleryStackParams = {
  Home: undefined;
  Artwork: Artwork;
};

const Stack = createNativeStackNavigator<GalleryStackParams>();

const GalleryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={GalleryScreen} />
      <Stack.Screen name="Artwork" component={ArtworkScreen} />
    </Stack.Navigator>
  );
};

export default GalleryStack;
