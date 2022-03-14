export interface Pagination {
  page: number;
  pageCount: number;
  totalItemsCount: number;
  id?: string;
  min?: number;
  max?: number;
}
