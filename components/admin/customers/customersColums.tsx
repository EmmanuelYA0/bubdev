"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";

export type CustomerProps = {
  id: number;
  username: string | null;
  email: string;
  role: "USER" | "ADMIN";
};

const updateUserRole = async (userId: number, newRole: "USER" | "ADMIN") => {
  try {
    const response = await fetch("/api/admin/updateUserRole", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newRole }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
      window.location.reload();
      // console.log(data.message);
    } else {
      toast.error("Erreur lors de la mise à jour du rôle de l'utilisateur");
      console.error("Erreur lors de la mise à jour du rôle de l'utilisateur");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du rôle de l'utilisateur :",
      error
    );
  }
};

export const customersColumns: ColumnDef<CustomerProps>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom d'utilisateur
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return role === "ADMIN" ? "Administrateur" : "Utilisateur";
    },
  },
  {
    id: "updateRole",
    header: "Modifier le rôle",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const newRole = role === "ADMIN" ? "USER" : "ADMIN";
      const userId = row.original.id;

      return (
        <Button
          variant="outline"
          onClick={() => {
            updateUserRole(userId, newRole);
          }}
        >
          {newRole === "ADMIN" ? "Rendre admin" : "Révoquer admin"}
        </Button>
      );
    },
  },
];
