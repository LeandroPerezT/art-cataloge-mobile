/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GalleryScreen from './Gallery/GalleryScreen';
import FavoritesScreen from './Artwork/ArtworkScreen';
import Icon from 'react-native-vector-icons/AntDesign';
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="picture" size={size} color="#FFD700" /> :
              <Icon name="picture" size={size} />
          ),
        }}
        name="Gallery"
        component={GalleryScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) => (
            focused ?
              <Icon name="star" size={size} color="#FFD700" />

              : <Icon name="staro" size={size} />

          ),
        }}
      />
    </Tab.Navigator>
  );
}
