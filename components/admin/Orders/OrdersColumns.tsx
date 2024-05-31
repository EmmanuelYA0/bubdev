//components/admin/Orders/OrdersColumns.tsx
"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

export type OrdersProps = {
  id: string;
  order: string;
  customer: string;
  products: number;
  amount: number;
  date: Date;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
};

type StatusOption = {
  value: OrdersProps["status"];
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
};

const statusOptions: StatusOption[] = [
  {
    value: "PENDING",
    label: "En attente",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    value: "PROCESSING",
    label: "En cours",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    value: "SHIPPED",
    label: "Expédiée",
    icon: Truck,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    value: "DELIVERED",
    label: "Livrée",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    value: "CANCELLED",
    label: "Annulée",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

export const updateOrderStatus = async (
  orderId: string,
  newStatus: OrdersProps["status"]
) => {
  try {
    const response = await fetch(`/api/admin/orders`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(orderId, 10),
        status: newStatus,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur lors de la mise à jour: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const columnHelper = createColumnHelper<OrdersProps>();

export const ordersColumns = [
  columnHelper.accessor("order", {
    header: "Commande",
    id: "command",
  }),
  columnHelper.accessor("customer", {
    header: "Client",
    id: "customer",
  }),
  columnHelper.accessor("products", {
    header: "Produit",
    id: "products",
  }),
  columnHelper.accessor("amount", {
    header: "Montant",
    id: "amount",
  }),
  columnHelper.accessor("date", {
    header: "Date",
    id: "date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <span>{date.toLocaleDateString()}</span>;
    },
  }),
  columnHelper.accessor("status", {
    header: "Statut",
    id: "status",
    cell: ({ row, table }) => {
      const status: string = row.getValue("status");
      const { refreshData } = table.options.meta as { refreshData: () => void };

      const currentOption = statusOptions.find(
        (option) => option.value === status
      );
      const Icon = currentOption?.icon || Clock;

      return (
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${currentOption?.bgColor}`}>
            <Icon className={`w-4 h-4 ${currentOption?.color}`} />
          </div>
          <select
            value={status}
            onChange={async (e) => {
              const newStatus = e.target.value as OrdersProps["status"];
              const updated = await updateOrderStatus(
                row.original.id,
                newStatus
              );
              if (updated && refreshData) refreshData();
            }}
            className="p-1 rounded border border-gray-300 bg-transparent"
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={option.color}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    },
  }),
] as ColumnDef<OrdersProps>[];
