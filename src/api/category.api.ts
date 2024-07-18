import { CategoryResponse } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  const response = await httpClient.get<CategoryResponse>('/categories');
  return response.data;
};
