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
  categoryId: number;
  categoryName: string;
  form: string;
  isbn: string;
  pages: number;
  userLiked: boolean;
  toc: string;
  content: string;
  images: string[];
}
