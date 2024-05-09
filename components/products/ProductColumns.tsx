"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom-ui/Delete";
import Link from "next/link";
import { CartProductsInterface } from "@/lib/constants";
import { formatPrice } from "@/lib/formatPrice";



export const columns: ColumnDef<CartProductsInterface>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => (
      <Link href={`/spiritueux/${row.original.id}`} className="hover:text-redhot">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "categoryId",
    header: "Catégorie",
    cell: ({ row }) => (<p className="">{getCategory(row.original.categoryId)}</p>),
  },
  {
    accessorKey: "price",
    header: "Prix (FCFA)",
    cell: ({ row }) => formatPrice(row.original.price),
  },
  {
    accessorKey: "quantity",
    header: "Quantité",
  },
  {
    header: "Action",
    id: 'actions',
    cell: ({ row }) => <Delete item="product" id={row.original.id as unknown as string} />,
  },
];

const getCategory = (categoryId: number | undefined) => {
  const category = categoryId ?? 3;

  switch (category) {
    case 1:
      return 'Vin';
    case 2:
      return 'Champagne';
    default:
      return 'Spiritueux';
  }
};