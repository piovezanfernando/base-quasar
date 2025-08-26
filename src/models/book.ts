export interface BookData {
  id: number;
  title: string;
  publisher: string;
  edition: number;
  year: string;
  price: number;
  authors: BookAuthorRef[];
  subjects: BookSubjectRef[];
}

export interface BookAuthorRef {
  id: number;
}

export interface BookSubjectRef {
  id: number;
}

export interface BookResponse {
  data: BookData;
}