export interface SubjectData {
  id: number;
  description: string;
  company_id: number;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string,
}

export interface SubjectResponse {
  data: SubjectData;
}