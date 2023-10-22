import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { artCatalogApi } from './services/artCatalog';

export const store = configureStore({
  reducer: {
    [artCatalogApi.reducerPath]: artCatalogApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(artCatalogApi.middleware),
});

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
