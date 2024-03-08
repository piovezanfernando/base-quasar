
export interface DefaultRequest {
  page: number|null|undefined;
  fields: string|null;
  sortBy: string|null;
  descending: boolean;
  rowsPerPage: number|null;
}

export interface ApiResponse<T> {
  (response: T): void;
  success: boolean|null;
  data: {
    current_page: number;
    data?: T[];
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  message: string|null;
}