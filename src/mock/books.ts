import { fakerKO as faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

import { IBook } from '@/models/book.model';

const getThumbnailUrl = () => {
  const id = faker.helpers.rangeToNumber({ min: 100, max: 200 });
  return `https://picsum.photos/id/${id}/512`;
};

const mockBestBooksData: IBook[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  thumbnail: getThumbnailUrl(),
  title: faker.lorem.sentence(),
  author: faker.person.lastName() + faker.person.firstName(),
  price: 100 * faker.helpers.rangeToNumber({ min: 100, max: 500 }),
  pubDate: faker.date.past().toISOString(),
  likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
  excerpt: faker.lorem.paragraph(),
}));

export const bestBooks = http.get('http://localhost:3000/books/best', () => {
  return HttpResponse.json(mockBestBooksData, { status: 200 });
});
