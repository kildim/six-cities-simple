import {Coord} from './coord';

export type MockData = {
  titles: string[],
  descriptions: string[],
  publishDate: Date,
  cities: string[],
  imgPreviews: string[],
  images: string[],
  conveniences: string[],
  coordinates: Coord[]
};
