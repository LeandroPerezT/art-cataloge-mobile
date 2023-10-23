import {
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Artwork } from '../../services/types/artworks.types';
import { useGetArtworksQuery } from '../../services/artCatalog';
import ProgressiveImage from '../components/ProgresiveImage';
import ArtSkeleton from './components/ArtSkeleton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GalleryStackParams } from './GalleryStack';
import { composeImageUrl } from '../../utils/utils';
import Animated from 'react-native-reanimated';
import { mergeWithoutDuplicates } from '../../utils/utils';
type GalleryScreenProps = NativeStackScreenProps<GalleryStackParams, 'Home'>;

const AnimatedProgressiveImage =
  Animated.createAnimatedComponent(ProgressiveImage);

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

const GalleryScreen = ({ navigation }: GalleryScreenProps) => {
  const [page, setPage] = useState(FIRST_PAGE);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const { data, isLoading, isError, isFetching, error } = useGetArtworksQuery({
    limit: PAGE_SIZE,
    page: page,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setArtworks(prev => mergeWithoutDuplicates(prev, data, 'id'));
    }
  }, [data]);

  const handleEndReached = () => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  };
  if (isLoading) {
    return <ArtSkeleton quantity={5} />;
  }
  if (isError && !!artworks) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Art Gallery</Text>
      <FlatList
        data={artworks}
        renderItem={({ item }) => (
          <ArtworkCard {...item} navigation={navigation} />
        )}
        keyExtractor={item => `${item.id}-${item.title}`}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ArtSkeleton quantity={5} /> : null}
      />
    </SafeAreaView>
  );
};

type ArtworkCardProps = Artwork & {
  navigation: GalleryScreenProps['navigation'];
};

const ArtworkCard = (props: ArtworkCardProps) => {
  const { navigation, image_id, ...rest } = props;

  if (!image_id) {
    return null;
  }
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() =>
          navigation.navigate('Artwork', {
            image_id,
            ...rest,
          })
        }>
        <AnimatedProgressiveImage
          lowResUrl={props.thumbnail.lqip}
          highResUrl={composeImageUrl(image_id)}
          style={styles.thumbnail}
          sharedTransitionTag={`image-${props.id}`}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.author}>{props.artist_display}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
