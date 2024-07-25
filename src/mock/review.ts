import { fakerKO as faker } from '@faker-js/faker';
import { HttpResponse, http } from 'msw';

import { IBookReviewItem } from '@/models/book.model';

const mockReviewsData: IBookReviewItem[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    username: faker.person.lastName() + faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  })
);

export const reviewsById = http.get(
  'http://localhost:3000/reviews/:bookId',
  () => {
    return HttpResponse.json(mockReviewsData, { status: 200 });
  }
);

export const addReview = http.post(
  'http://localhost:3000/reviews/:bookId',
  () => {
    return HttpResponse.json(
      { message: '리뷰를 등록했습니다.' },
      { status: 201 }
    );
  }
);
