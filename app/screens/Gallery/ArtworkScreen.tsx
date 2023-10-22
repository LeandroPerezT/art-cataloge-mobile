import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GalleryStackParams } from './GalleryStack';
import { useGetArtworkByIdQuery } from '../../services/artCatalog';
import { composeImageUrl } from '../../utils/utils';
type ArtworkScreenProps = NativeStackScreenProps<GalleryStackParams, 'Artwork'>;

const ArtworkScreen = ({ route }: ArtworkScreenProps) => {
  const {
    data: artwork,
    isLoading,
    isError,
    error,
  } = useGetArtworkByIdQuery(route.params.artworkId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  if (artwork) {
    console.log({ artwork });
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: composeImageUrl(artwork ? artwork.image_id : '') }}
        style={styles.image}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{artwork?.title}</Text>
        <Text style={styles.artist}>{artwork?.artist_display}</Text>
        <Text style={styles.description}>
          {artwork?.description
            ? artwork.description
            : 'Sorry, this piece does not have a description available'}
        </Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
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
