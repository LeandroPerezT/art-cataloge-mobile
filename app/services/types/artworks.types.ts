export type Artwork = {
  id: number;
  title: string;
  description: string;
  dimensions: string;
  medium_display: string;
  date_display: string;
  artist_display: string;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  };
  image_id: string | null;
};

// This is an attempt to type the response of the Art Catalog API
export type ArtworkResponse = {
  pagination: Pagination;
  data: Data[];
  info: Info;
  config: Config;
};

export interface Config {
  iiif_url: string;
  website_url: string;
}

export type Data = {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  alt_titles: string | null;
  thumbnail: Thumbnail;
  main_reference_number: string;
  has_not_been_viewed_much: boolean;
  boost_rank: number | null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: number | null;
  artist_display: string;
  place_of_origin: string;
  description: string;
  dimensions: string;
  dimensions_detail: DimensionsDetail[];
  medium_display: string;
  inscriptions: number | null;
  credit_line: string;
  catalogue_display: boolean | null;
  publication_history: string | null;
  exhibition_history: string | null;
  provenance_text: string | null;
  edition: null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number | null;
  fiscal_year_deaccession: null;
  is_public_domain: boolean;
  is_zoomable: boolean;
  max_zoom_window_size: number;
  copyright_notice: null;
  has_multimedia_resources: boolean;
  has_educational_resources: boolean;
  has_advanced_imaging: boolean;
  colorfulness: number;
  color: Color;
  latitude: number | null;
  longitude: number | null;
  latlon: string | null;
  is_on_view: boolean;
  on_loan_display: null;
  gallery_title: string | null;
  gallery_id: number | null;
  nomisma_id: null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: any[];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  term_titles: string[];
  style_id: string;
  style_title: string;
  alt_style_ids: string[];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string | null;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string;
  alt_material_ids: any[];
  material_ids: string[];
  material_titles: string[];
  technique_id: string | null;
  alt_technique_ids: any[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: any[];
  document_ids: string[];
  sound_ids: any[];
  video_ids: any[];
  text_ids: string[];
  section_ids: any[];
  section_titles: any[];
  site_ids: any[];
  suggest_autocomplete_all: SuggestAutocompleteAll[];
  source_updated_at: Date;
  updated_at: Date;
  timestamp: Date;
};

export interface Color {
  h: number;
  l: number;
  s: number;
  percentage: number;
  population: number;
}

export interface DimensionsDetail {
  depth_cm: number;
  depth_in: number;
  width_cm: number;
  width_in: number;
  height_cm: number;
  height_in: number;
  diameter_cm: number;
  diameter_in: number;
  clarification?: string;
}

export interface SuggestAutocompleteAll {
  input: string[];
  contexts: Contexts;
  weight?: number;
}

export interface Contexts {
  groupings: string[];
}

export interface Thumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export interface Info {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export const transformResponseToArtwork = (response: Data): Artwork => {
  return {
    id: response.id,
    title: response.title,
    description: response.description,
    dimensions: response.dimensions,
    medium_display: response.medium_display,
    date_display: response.date_display,
    artist_display: response.artist_display,
    thumbnail: {
      lqip: response.thumbnail?.lqip,
      width: response.thumbnail?.width,
      height: response.thumbnail?.height,
      alt_text: response.thumbnail?.alt_text,
    },
    image_id: response.image_id,
  };
};
