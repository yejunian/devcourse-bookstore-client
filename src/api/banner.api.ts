import { requestHandler } from '@/api/http';
import { IBanner } from '@/models/banner.model';

export const fetchBanners = async () => {
  return await requestHandler<IBanner[]>('get', '/banners');
};
