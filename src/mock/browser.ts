import { RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';

import { banners } from '@/mock/banner';
import { bestBooks } from '@/mock/books';
import { addReview, reviewForMain, reviewsById } from '@/mock/review';

const handlers: RequestHandler[] = [
  reviewsById,
  addReview,
  reviewForMain,
  bestBooks,
  banners,
];

export const worker = setupWorker(...handlers);
