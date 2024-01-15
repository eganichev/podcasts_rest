export interface IPodcast {
  id: string;
  title: string;
  images: IImages;
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

export interface IImages {
  default: string;
  featured: string;
  thumbnail: string;
  wide: string;
}

export interface IHeartbeat {
  status: string;
  message: string;
}

export type TParamsToChange = Record<string, string>;
