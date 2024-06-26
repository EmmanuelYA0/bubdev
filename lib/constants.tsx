import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

// NAVIGATION
export const NAV_LINKS = [
  { href: '/vins', key: 'vins', label: 'Vins' },
  { href: '/champagnes', key: 'champagnes', label: 'Champagnes' },
  { href: '/spiritueux', key: 'spiritueux ', label: 'Spiritueux' },
  // { href: '/promotions', key: 'promotions', label: 'Promotions' },
];

export interface Vin {
  id: number;
  name: string;
  description: string;
  price: number;
  soldPrice?: number;
  img: string;
  quantity: number;
  categoryId?: number;
}

export interface Champagne {
  id: number;
  name: string;
  description: string;
  price: number;
  soldPrice?: number;
  img: string;
  quantity: number;
  categoryId?: number;
}

export interface SpiritueuxInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  soldPrice?: number;
  img: string;
  quantity: number;
  categoryId?: number;
}
export interface CartProductsInterface {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  soldPrice?: number;
  img?: string;
  quantity?: number;
  categoryId?: number;
}


// ADMIN NAVIGATION

export const adminNavLinks = [
  {
    url: "/admin",
    icon: <LayoutDashboard />,
    label: "Tableau de bord",
  },
  {
    url: "/admin/products",
    icon: <Tag />,
    label: "Produits",
  },
  {
    url: "/admin/orders",
    icon: <ShoppingBag />,
    label: "Commandes",
  },
  {
    url: "/admin/customers",
    icon: <UsersRound />,
    label: "Clients",
  },
];
