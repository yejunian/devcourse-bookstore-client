export interface Pagination {
  totalCount: number;
  page: {
    total: number;
    current: number;
  };
}
