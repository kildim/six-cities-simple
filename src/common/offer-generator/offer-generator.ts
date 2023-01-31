import {OfferGeneratorInterface} from './offer-generator.interface';
import {MockData} from '../../types/mock-data.type';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import dayjs from 'dayjs';
import {Accommodation} from '../../types/accommodation.js';
import {Coord} from '../../types/coord.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;

export default class OfferGenerator implements OfferGeneratorInterface {
  static offerId = 0;
  static hostID = 0;

  constructor(private readonly mockData: MockData) {}
  private static genOfferId () {
    return ++OfferGenerator.offerId;
  }

  private static genHostId () {
    return ++OfferGenerator.hostID;
  }

  public generate(): string {
    const id = OfferGenerator.genOfferId();
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publishDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const imgPreview = getRandomItem<string>(this.mockData.imgPreviews);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = !!generateRandomValue(0, 1);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const accommodation = getRandomItem([Accommodation.apartment, Accommodation.house, Accommodation.room, Accommodation.hotel]);
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(';');
    const hostID = OfferGenerator.genHostId();
    const commentsCount = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const coordsOffer = getRandomItem<Coord>(this.mockData.coordinates);

    return [
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
    ].join('\t');
  }
}
