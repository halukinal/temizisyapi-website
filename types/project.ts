// types/project.ts

import { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  category: 'PVC' | 'Alüminyum' | 'Cam Balkon' | 'Cephe';
  description: string;
  images: string[];
  thumbnail: string;
  date: string | Timestamp; // Firestore'dan Timestamp olarak gelebilir
  location: string;
  featured: boolean;
  imagePaths: string[];
}