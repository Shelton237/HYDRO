export interface TeamMemberDataType {
  id: number;
  role: string;
  name: string;
  description: string;
  image: string;
  socialLinks: {
    icon: string;
    link: string;
  }[];
  delay: string;
}

