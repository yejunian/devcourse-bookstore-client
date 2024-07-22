// TODO: 서버에서 id, pubDate 내려 주기
export interface IBook {
  id: number;
  thumbnail: string;
  title: string;
  author: string;
  price: number;
  pubDate: string;
  likes: number;
  excerpt: string;
}

export interface IBookDetail extends IBook {
  category: number;
  form: number;
  isbn: string;
  pages: number;
  userLiked: boolean;
  toc: string;
  content: string;
  images: string[];
}
