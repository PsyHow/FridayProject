export interface Pagination {
  page: number;
  pageCount: number;
  totalItemsCount: number;
  userId?: string;
  min?: number;
  max?: number;
}
