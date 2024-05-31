"use client"

import { ColumnDef } from "@tanstack/react-table"
// import { CheckCircledIcon, XCircledIcon, ClockIcon, CircleDotIcon, TruckIcon, BanIcon } from "@radix-ui/react-icons"
import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";


export type UserOrderType = {
  order: string
  products: number;
  amount: number;
  date: Date;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
}

export const userOrdersColumns: ColumnDef<UserOrderType>[] = [
  {
    accessorKey: "order",
    header: "Commande",
  },
  {
    accessorKey: "products",
    header: "Produits",
  },
  {
    accessorKey: "amount",
    header: "Montant",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status : string = row.getValue("status");
      let color, icon, label;

      switch (status) {
        case "PENDING":
          color = "text-yellow-500";
          icon = <Clock className="h-5 w-5" />;
          label = "En attente";
          break;
        case "PROCESSING":
          color = "text-blue-500";
          icon = <Package className="h-5 w-5" />;
          label = "En cours";
          break;
        case "SHIPPED":
          color = "text-orange-500";
          icon = <Truck className="h-5 w-5" />;
          label = "Expédiée";
          break;
        case "DELIVERED":
          color = "text-green-500";
          icon = <CheckCircle2 className="h-5 w-5" />;
          label = "Livrée";
          break;
        case "CANCELLED":
          color = "text-red-500";
          icon = <XCircle className="h-5 w-5" />;
          label = "Annulée";
          break;
        default:
          break;
      }

      return (
        <div className={`flex items-center ${color}`}>
          {icon}
          <span className="ml-2">{label}</span>
        </div>
      );
    },
  },
]