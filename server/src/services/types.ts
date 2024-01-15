export interface Podcast {
  id: string;
  title: string;
  images: Images;
  isExclusive: boolean;
  publisherName: string;
  publisherId: string;
  mediaType: string;
  description: string;
  categoryId: string;
  categoryName: string;
  hasFreeEpisodes: boolean;
  playSequence: string;
}

export interface Images {
  default: string;
  featured: string;
  thumbnail: string;
  wide: string;
}
