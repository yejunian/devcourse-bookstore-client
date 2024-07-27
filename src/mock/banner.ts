import { HttpResponse, http } from 'msw';

import { IBanner } from '@/models/banner.model';

const mockBannersData: IBanner[] = [
  {
    id: 1,
    title: '배너 1 제목',
    description: 'Banner 1 Description',
    image: 'https://picsum.photos/id/111/1200/400',
    url: 'http://example.org/',
    target: '_blank',
  },
  {
    id: 2,
    title: '배너 222',
    description: 'Banner 22 Description',
    image: 'https://picsum.photos/id/222/1200/400',
    url: 'http://example.org/',
    target: '_self',
  },
  {
    id: 3,
    title: '배너 3 제목',
    description: 'Banner 333 Description',
    image: 'https://picsum.photos/id/33/1200/400',
    url: 'http://example.org/',
    target: '_blank',
  },
];

export const banners = http.get('http://localhost:3000/banners', () => {
  return HttpResponse.json(mockBannersData, { status: 200 });
});
