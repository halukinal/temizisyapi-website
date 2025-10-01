// types/project.ts

import { Timestamp } from "firebase/firestore";

export interface Project {
  id: string;
  title: string;
  category: 'PVC' | 'Alüminyum' | 'Cam Balkon' | 'Cephe';
  description: string;
  images: string[];
  thumbnail: string;
  date: Date; // Firestore'dan Timestamp olarak gelir, uygulamada Date'e çevrilir.
  location: string;
  featured: boolean;
  imagePaths: string[];
}