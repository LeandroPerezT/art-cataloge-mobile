import { SafeAreaView, Text } from 'react-native';
import React from 'react';
import storage from '../../utils/storage';
import { useMMKVStorage } from 'react-native-mmkv-storage';

const FavoritesScreen = () => {
  const [bookmarks, setBookmarks] = useMMKVStorage<number[]>(
    'bookmarks',
    storage,
    [],
  );

  return (
    <SafeAreaView>
      {bookmarks.map(bookmark => (
        <Text key={bookmark}>{bookmark}</Text>
      ))}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
