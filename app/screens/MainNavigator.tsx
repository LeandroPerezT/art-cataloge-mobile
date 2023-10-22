/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './Favorites/FavoritesSreen';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigatorScreenParams } from '@react-navigation/native';
import { GalleryStackParams } from './Gallery/GalleryStack';
import GalleryStack from './Gallery/GalleryStack';

export type TabParams = {
  Gallery: NavigatorScreenParams<GalleryStackParams>;
  Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParams>();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <Icon name="picture" size={size} color="#FFD700" />
            ) : (
              <Icon name="picture" size={size} />
            ),
        }}
        name="Gallery"
        component={GalleryStack}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <Icon name="star" size={size} color="#FFD700" />
            ) : (
              <Icon name="staro" size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
