import {FileReaderInterface} from './file-reader.interface.js';
import {readFileSync} from 'fs';
import {Offer} from '../../types/offer.js';
import {Coord} from '../../types/coord';
import {Convenience} from '../../types/convenience';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8'});
  }

  public toArrayOffers(): Offer[] {
    if(!this.rawData) {
      return [];
    }

    const data = this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => {
        const [
          id,
          title,
          description,
          publishDate,
          city,
          imgPreview,
          images,
          isPremium,
          rating,
          accommodation,
          roomsCount,
          guestsCount,
          price,
          conveniences,
          hostID,
          commentsCount,
          coordsOffer
        ] = line.split('\t');

        const [latitude, longitude] = coordsOffer.split(';');

        const coords: Coord = {
          latitude: +latitude,
          longitude: +longitude,
        };

        return {
          id: +id,
          title,
          description,
          publishDate: new Date(publishDate),
          city,
          imgPreview,
          images: images.split(';'),
          isPremium: Boolean(isPremium),
          rating: +rating,
          accommodation: +accommodation,
          roomsCount: +roomsCount,
          guestsCount: +guestsCount,
          price: +price,
          conveniences: conveniences.split(';') as Convenience[],
          hostID: +hostID,
          commentsCount: +commentsCount,
          coordsOffer: coords,
        };

      });

    data.shift();
    return data;
  }
}
