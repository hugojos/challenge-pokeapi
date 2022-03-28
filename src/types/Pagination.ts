export interface Pagination<T = any> {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: T[];
}
