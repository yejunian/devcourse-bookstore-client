export interface Category {
  id: number | null;
  name: string;
}

export interface CategoryResponse {
  categories: Category[];
}
