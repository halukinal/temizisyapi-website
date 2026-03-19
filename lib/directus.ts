import { createDirectus, rest } from '@directus/sdk';

// Directus'taki "ayarlar" tablosunun (Singleton) tipi
export interface Ayar {
  title: string;
  description: string;
  phone: string;
  address: string;
  email: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  logo?: string; // Directus dosya id'si döner
}

// "hizmetler" tablosunun tipi
export interface Hizmet {
  id: number | string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
}

// "blog" tablosunun tipi
export interface Blog {
  id: number | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  status: 'published' | 'draft' | 'archived';
  date_published?: string;
  date_created?: string;
}

export interface Referans {
  id: number | string;
  name: string;
  logo?: string;
  website_url?: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
}

export interface Slider {
  id: number | string;
  title: string;
  subtitle?: string;
  image?: string;
  button_text?: string;
  button_link?: string;
  status: 'published' | 'draft' | 'archived';
  sort?: number;
}

// Tüm koleksiyonların ana şeması
interface Schema {
  ayarlar: Ayar;
  hizmetler: Hizmet[];
  blog: Blog[];
  referanslar: Referans[];
  slider: Slider[];
}

// Ortam değişkeninden URL çekiliyor, yoksa localhost tanımlı.
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// Directus İstemcisi oluşturuluyor
const directus = createDirectus<Schema>(directusUrl).with(rest());

export default directus;
