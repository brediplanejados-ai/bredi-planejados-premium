
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}
