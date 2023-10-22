import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GalleryStackParams } from './GalleryStack';
import { useGetArtworkByIdQuery } from '../../services/artCatalog';
import { composeImageUrl } from '../../utils/utils';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import ProgressiveImage from '../components/ProgresiveImage';

type ArtworkScreenProps = NativeStackScreenProps<GalleryStackParams, 'Artwork'>;
const ArtworkScreen = ({ route }: ArtworkScreenProps) => {
  const { artworkId } = route.params;
  const { width } = useWindowDimensions();
  const {
    data: artwork,
    isLoading,
    isError,
    error,
  } = useGetArtworkByIdQuery(artworkId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError || !artwork) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  const source = {
    html: artwork.description,
  };

  console.log('ArtworkScreen => ', artworkId);

  return (
    <ScrollView style={styles.container}>
      <ProgressiveImage
        lowResUrl={artwork.thumbnail.lqip}
        highResUrl={composeImageUrl(artwork.image_id)}
        style={styles.image}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{artwork?.title}</Text>
        <Text style={styles.artist}>{artwork?.artist_display}</Text>
        {artwork?.description ? (
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
