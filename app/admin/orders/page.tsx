"use client";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { OrdersDataTable } from "@/components/admin/Orders/OrderDataTable";
import {
  ordersColumns,
  OrdersProps,
} from "@/components/admin/Orders/OrdersColumns";
import { ColumnDef } from "@tanstack/react-table";
import Loading from "@/app/loading";

const OrdersPage = () => {
  const fetchData = async () => {
    const res = await fetch("/api/admin/orders");
    const data: OrdersProps[] = await res.json();
    setIsLoading(false);
    return data;
  };
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrdersProps[]>([]);

  const refreshData = async () => {
    const data = await fetchData();
    setOrders(data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const columns = useMemo(() => {
    return ordersColumns.map((column) => {
      if (column.id === "status") {
        return {
          ...column,
          meta: {
            ...column.meta,
            refreshData,
          },
        } as ColumnDef<OrdersProps>;
      }
      return column;
    });
  }, [refreshData]);
  if (isLoading) {
    return <Loading />;
  } else
    return (
      <div className=" ml-5 mt-36">
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl">Commandes</p>
        </div>
        <Separator className="bg-gray-400 my-4" />
        <OrdersDataTable
          columns={columns}
          data={orders}
          refreshData={refreshData}
        />
      </div>
    );
};

export default OrdersPage;
