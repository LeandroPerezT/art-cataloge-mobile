/* eslint-disable prettier/prettier */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Artwork, ArtworkResponse, transformResponseToArtwork } from '../types/artworks.types';


export const artCatalogApi = createApi({
  reducerPath: 'artCatalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1/' }),
  tagTypes: ['Artwork'],
  endpoints: (builder) => ({
    getArtworks: builder.query<Artwork[], void>({
      query: () => 'artworks',
      transformResponse: (response: ArtworkResponse) => {
        return response.data.map(item => transformResponseToArtwork(item));
      },
      providesTags: ['Artwork'],
    }),
  }),
});


export const { useGetArtworksQuery } = artCatalogApi;

