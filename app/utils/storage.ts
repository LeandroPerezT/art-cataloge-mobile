import { MMKVLoader } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

type BookmarksSetter = (bookmarks: number[]) => void;

export const addBookmark = (
  bookmarks: number[],
  setBookmarks: BookmarksSetter,
  bookmarkId: number,
): void => {
  const newBookmarks = [...bookmarks, bookmarkId];
  setBookmarks(newBookmarks);
};

export const removeBookmark = (
  bookmarks: number[],
  setBookmarks: BookmarksSetter,
  bookmarkId: number,
): void => {
  const newBookmarks = bookmarks.filter(id => id !== bookmarkId);
  setBookmarks(newBookmarks);
};

export const checkIfBookmarked = (
  bookmarks: number[],
  bookmarkId: number,
): boolean => {
  return bookmarks.includes(bookmarkId);
};
export default storage;
