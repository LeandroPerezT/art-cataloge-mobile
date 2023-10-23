import React from 'react';
import { View, StyleSheet } from 'react-native';

type BookmarkSkeletonProps = {
  quantity: number;
};

const BookmarkSkeleton: React.FC<BookmarkSkeletonProps> = ({ quantity }) => {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <View key={index} style={styles.skeletonContainer}>
          <View style={styles.skeletonThumbnail} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonDescription} />
          </View>
          <View style={styles.skeletonButton} />
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f5f5f5',
  },
  skeletonThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonTitle: {
    height: 16,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  skeletonDescription: {
    height: 14,
    width: '80%',
    backgroundColor: '#e0e0e0',
  },
  skeletonButton: {
    width: 70,
    height: 25,
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
  },
});

export default BookmarkSkeleton;
