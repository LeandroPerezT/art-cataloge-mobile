import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Artwork,
  ArtworkResponse,
  transformResponseToArtwork,
} from './types/artworks.types';

type ArtworksSearchParams = {
  ids?: string;
  limit?: number;
  page?: number;
  fields?: string;
  include?: string;
};

export const artCatalogApi = createApi({
  reducerPath: 'artCatalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1/' }),
  tagTypes: ['Artwork'],
  endpoints: builder => ({
    getArtworks: builder.query<Artwork[], ArtworksSearchParams | void>({
      query: body => ({
        url: 'artworks',
        params: {
          ...body,
        },
      }),
      transformResponse: (response: ArtworkResponse) => {
        return response.data.map(item => transformResponseToArtwork(item));
      },
      providesTags: ['Artwork'],
    }),
    getArtworksById: builder.query<Artwork[], string>({
      query: ids => `artworks?ids=${ids}`,
      transformResponse: (response: ArtworkResponse) => {
        return response.data.map(item => transformResponseToArtwork(item));
      },
    }),
  }),
});

export const { useGetArtworksQuery, useGetArtworksByIdQuery } = artCatalogApi;
