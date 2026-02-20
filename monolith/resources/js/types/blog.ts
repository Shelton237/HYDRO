export interface BlogPostDataType {
  id: number;
  date: {
    day: string;
    month: string;
    year: string;
  };
  image: string;
  author: string;
  category: string;
  title: string;
  link: string;
  delay: string;
  description: string;
}

