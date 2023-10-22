import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Artwork,
  ArtworkByIDResponse,
  ArtworkResponse,
  transformResponseToArtwork,
} from './types/artworks.types';

export const artCatalogApi = createApi({
  reducerPath: 'artCatalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1/' }),
  tagTypes: ['Artwork'],
  endpoints: builder => ({
    getArtworks: builder.query<Artwork[], void>({
      query: () => 'artworks',
      transformResponse: (response: ArtworkResponse) => {
        return response.data.map(item => transformResponseToArtwork(item));
      },
      providesTags: ['Artwork'],
    }),
    getArtworkById: builder.query<Artwork, number>({
      query: id => `artworks/${id}`,
      transformResponse: (response: ArtworkByIDResponse) => {
        return transformResponseToArtwork(response.data);
      },
      providesTags: ['Artwork'],
    }),
  }),
});

export const { useGetArtworksQuery, useGetArtworkByIdQuery } = artCatalogApi;
