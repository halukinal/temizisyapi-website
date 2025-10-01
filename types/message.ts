// types/message.ts

import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  type: 'contact' | 'quote';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  projectDetails?: string;
  date: Date; // Firestore'dan Timestamp olarak gelir, uygulamada Date'e çevrilir.
  status: 'new' | 'processing' | 'replied';
  read: boolean;
}   