export interface Category {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export interface CategoryResponse {
  categories: Category[];
}
