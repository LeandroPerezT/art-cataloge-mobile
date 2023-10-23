import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GalleryStackParams } from './GalleryStack';
import { composeImageUrl } from '../../utils/utils';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import ProgressiveImage from '../components/ProgresiveImage';
import Icon from 'react-native-vector-icons/AntDesign';
import storage from '../../utils/storage';
import { useMMKVStorage } from 'react-native-mmkv-storage';

import Animated from 'react-native-reanimated';

const AnimatedProgressiveImage =
  Animated.createAnimatedComponent(ProgressiveImage);

type ArtworkScreenProps = NativeStackScreenProps<GalleryStackParams, 'Artwork'>;
const ArtworkScreen = ({ route }: ArtworkScreenProps) => {
  const { width } = useWindowDimensions();
  const { ...artwork } = route.params;
  const source = {
    html: artwork.description,
  };
  const [bookmarks, setBookmarks] = useMMKVStorage<number[]>(
    'bookmarks',
    storage,
    [],
  );

  const addBookmark = (bookmarkId: number) => {
    const newBookmarks = [...bookmarks, bookmarkId];
    setBookmarks(newBookmarks);
  };

  const removeBookmark = (bookmarkId: number) => {
    const newBookmarks = bookmarks.filter(id => id !== bookmarkId);
    setBookmarks(newBookmarks);
  };

  const checkIfBookmarked = (bookmarkId: number) =>
    bookmarks.includes(bookmarkId);

  const isBookmarked = checkIfBookmarked(artwork.id);

  if (!artwork.image_id) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <AnimatedProgressiveImage
        lowResUrl={artwork.thumbnail.lqip}
        highResUrl={composeImageUrl(artwork.image_id)}
        style={styles.image}
        sharedTransitionTag={`image-${artwork.id}`}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{artwork.title}</Text>
          <Pressable
            onPress={() => {
              isBookmarked
                ? removeBookmark(artwork.id)
                : addBookmark(artwork.id);
            }}>
            <Icon
              name={isBookmarked ? 'star' : 'staro'}
              color="#FFD700"
              size={40}
            />
          </Pressable>
        </View>
        <Text style={styles.artist}>{artwork.artist_display}</Text>
        {artwork.description ? (
          <RenderHtml contentWidth={width} source={source} />
        ) : (
          <Text>Sorry, the piece does not have a description available...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
    marginHorizontal: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    width: '80%',
  },
  artist: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  icon: {
    fontSize: 24,
  },
});
export default ArtworkScreen;
