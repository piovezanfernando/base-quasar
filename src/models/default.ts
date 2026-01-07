
export interface DefaultRequest {
  page: number | null | undefined;
  fields: string | null;
  sortBy: string | null;
  descending: boolean;
  rowsPerPage: number | null;
}

export interface ApiResponse<T> {
  success: boolean | null;
  data: {
    data?: T[];
    meta?: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
  message: string | null;
}