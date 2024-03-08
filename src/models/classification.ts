export interface ClassificationData {
  id: string|undefined;
  name: string|undefined;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  created_by: string;
  updated_by: string;
  deleted_by: string;
}

export interface ClassificationResponse {
  data: ClassificationData;
}