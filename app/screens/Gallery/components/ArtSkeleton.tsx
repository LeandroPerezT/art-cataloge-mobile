import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface ArtworkSkeletonProps {
  quantity: number;
}

const ArtSkeleton: React.FC<ArtworkSkeletonProps> = ({ quantity }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: quantity }).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.thumbnailSkeleton} />
          <View style={styles.titleSkeleton} />
          <View style={styles.authorSkeleton} />
        </View>
      ))}
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
    backgroundColor: '#e0e0e0', // a lighter grey for the skeleton
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  thumbnailSkeleton: {
    width: '100%',
    height: (Dimensions.get('window').width - 32) * 0.5625, // 16:9 aspect ratio
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#d4d4d4', // slightly different grey to differentiate from card background
  },
  titleSkeleton: {
    height: 22, // approx height for the title
    width: '60%', // not the full width to mimic varied title lengths
    backgroundColor: '#d4d4d4',
    marginBottom: 8,
    borderRadius: 4,
  },
  authorSkeleton: {
    height: 20, // approx height for the author
    width: '50%', // not the full width to mimic varied author name lengths
    backgroundColor: '#d4d4d4',
    borderRadius: 4,
  },
});

export default ArtSkeleton;
