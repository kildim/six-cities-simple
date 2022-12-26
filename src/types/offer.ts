import {City} from './city';
import {Accommodation} from './accommodation';
import {Convenience} from './convenience';
import {Coord} from './coord';

export type Offer = {
  id: number;
  title: string;
  description: string;
  publishDate: Date;
  city: City;
  imgPreview: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  accommodation: Accommodation;
  roomsCount: number;
  guestsCount: number;
  price: number;
  conveniences: Convenience[];
  hostID: number;
  commentsCount: number;
  coordsOffer: Coord;
};
