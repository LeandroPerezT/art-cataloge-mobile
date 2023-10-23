import { FlatList, Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import storage from '../../utils/storage';
import { useMMKVStorage } from 'react-native-mmkv-storage';
import { useGetArtworksQuery } from '../../services/artCatalog';
import { StyleSheet } from 'react-native';
import { Artwork } from '../../services/types/artworks.types';
import { composeImageUrl } from '../../utils/utils';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParams } from '../MainNavigator';
import BookmarkSkeleton from './components/BookmarkSkeleton';

type FavoritesScreenProps = BottomTabScreenProps<TabParams, 'Favorites'>;

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {
  const [bookmarks, _setBookmarks] = useMMKVStorage<number[]>(
    'bookmarks',
    storage,
    [],
  );

  const {
    data: bookmarkedArt,
    isLoading,
    isError,
    error,
  } = useGetArtworksQuery({
    ids: bookmarks.join(','),
  });

  if (isLoading) {
    return <BookmarkSkeleton quantity={10} />;
  }

  if (isError && !bookmarkedArt) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <FlatList
      data={bookmarkedArt}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <ArtPieceItem
          title={item.title}
          artist_display={item.artist_display}
          image_id={item.image_id}
          onPress={() =>
            navigation.navigate('Gallery', {
              screen: 'Artwork',
              params: {
                ...item,
              },
            })
          }
        />
      )}
    />
  );
};

type BookmarkType = Pick<Artwork, 'title' | 'artist_display' | 'image_id'> & {
  onPress: () => void;
};

const ArtPieceItem: React.FC<BookmarkType> = ({
  title,
  artist_display,
  image_id,
  onPress,
}) => {
  return (
    <Pressable onPress={() => onPress()} style={styles.itemContainer}>
      <Image
        source={{ uri: composeImageUrl(image_id) }}
        style={styles.thumbnail}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{artist_display}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default FavoritesScreen;
