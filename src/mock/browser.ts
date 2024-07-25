import { RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';

import { addReview, reviewsById } from '@/mock/review';

const handlers: RequestHandler[] = [reviewsById, addReview];

export const worker = setupWorker(...handlers);
