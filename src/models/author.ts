export interface AuthorData {
  id: number;
  name: string;
  company_id: number;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string,
}

export interface AuthorResponse {
  data: AuthorData;
}