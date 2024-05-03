// NAVIGATION
export const NAV_LINKS = [
  { href: '/vins', key: 'vins', label: 'Vins' },
  { href: '/champagnes', key: 'champagnes', label: 'Champagnes' },
  { href: '/spiritueux', key: 'spiritueux ', label: 'Spiritueux' },
  { href: '/promotions', key: 'promotions', label: 'Promotions' },
];

export interface Vin {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
  categoryId?: number;
}

export interface Champagne {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
  categoryId?: number;
}

export interface SpiritueuxInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
  categoryId?: number;
}
export interface CartProductsInterface {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  img?: string;
  quantity?: number;
  categoryId?: number;
}
