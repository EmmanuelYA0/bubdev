"use client";

import { userOrdersColumns, UserOrderType } from "@/components/user/userOrdersColumns";
import { UserOrdersDataTable } from "@/components/user/UserOrdersDataTable";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserOrders = () => {
  const [orders, setOrders] = useState<UserOrderType[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch("/api/user/getUserOrders", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Erreur lors de la récupération des commandes de l'utilisateur");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes de l'utilisateur :", error);
      }
    };

    if (status === "authenticated") {
      fetchUserOrders();
    }
  }, [status]);

  return (
    <div className="ml-5 mt-36 h-screen">
      <UserOrdersDataTable columns={userOrdersColumns} data={orders} />
    </div>
  );
};

export default UserOrders;