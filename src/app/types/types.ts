export interface Article {
  title: string;
  link: string;
  pubDate: string;
  image_url: string;
  description: string;
  content: string;
  creator: string[] | null;
  source_id: string;
  country: string[];
  category: string[];
  language: string;
  isBookmarked: boolean;
}

export interface bookmark {
  image_url: string;
  title: string;
  creator: string;
  link: string;
  description: string;
  isBookmarked?: boolean;
}

export interface user {
  username: string;
  password: string;
  confirmPassword?: string;
}