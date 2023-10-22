import {
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import { Artwork } from '../../services/types/artworks.types';
import { useGetArtworksQuery } from '../../services/artCatalog';

import ProgressiveImage from '../components/ProgresiveImage';

const GalleryScreen = () => {
  const { data: artworks, isLoading, isError, error } = useGetArtworksQuery();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={artworks}
        renderItem={({ item }) => <ArtworkCard {...item} />}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
};

const ArtworkCard = (props: Artwork) => {
  return (
    <View style={styles.card}>
      <ProgressiveImage
        lowResUrl={props.thumbnail.lqip}
        highResUrl={`https://www.artic.edu/iiif/2/${props.image_id}/full/1686,/0/default.jpg`}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.author}>{props.artist_display}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  thumbnail: {
    width: '100%',
    height: (Dimensions.get('window').width - 32) * 0.5625, // 16:9 aspect ratio
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});

export default GalleryScreen;
