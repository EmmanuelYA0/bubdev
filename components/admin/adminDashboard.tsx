// components/AdminDashboard.tsx
'use client';

import React, { useEffect, useState } from 'react'
// import SalesChart from "@/components/custom-ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { formatPrice } from '@/lib/formatPrice';
import SalesChart from '../custom-ui/SalesChart';

interface salesByMonth {
  month: string,
  totalSales: number,
}

const AdminDashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [graphData, setGraphData] = useState<salesByMonth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, customersResponse, ordersResponse, graphResponse] = await Promise.all([
          fetch('/api/admin/getTotalSales'),
          fetch('/api/admin/getTotalCustomers'),
          fetch('/api/admin/getTotalOrders'),
          fetch('/api/admin/getSalesByMonth'),
        ]);

        const [salesData, customersData, ordersData, graphResponseData] = await Promise.all([
          salesResponse.json(),
          customersResponse.json(),
          ordersResponse.json(),
          graphResponse.json(),
        ]);

        if (salesResponse.ok) {
          setTotalSales(salesData.totalSalesAmount);
        } else {
          console.error('Error fetching total sales:', salesData.error);
        }

        if (customersResponse.ok) {
          setTotalCustomers(customersData.totalCustomers);
        } else {
          console.error('Error fetching total customers:', customersData.error);
        }
        if (ordersResponse.ok) {
          setTotalOrders(ordersData.totalOrders);
        } else {
          console.error('Error fetching total orders:', ordersData.error);
        }
        if (graphResponse.ok) {
          setGraphData(graphResponseData);
          
        } else {
          console.error('Error fetching graphData:', graphResponseData.error);
        }
      } catch (error) {
        console.error('Error fetching data in dashboard:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="px-1 py-10 -top-4 mt-24 min-h-[700px]">
      <p className="font-bold text-redhot text-2xl/none">Tableau de bord</p>
      <Separator className="bg-gray-400 my-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-3">
        <Card className=' border border-gray-300'>
          <CardHeader className="flex flex-row text-redhot max-sm:text-base justify-between items-center">
            <CardTitle className=' text-lg'>Ventes totales</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="font-bold">{formatPrice(totalSales)} FCFA</p>
          </CardContent>
        </Card>

        <Card className=' border border-gray-300'>
          <CardHeader className="flex flex-row max-lg:flex-col text-redhot max-lg:text-base justify-between items-center">
            <CardTitle className=' text-lg'>Commandes totales</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card className=' border border-gray-300'>
          <CardHeader className="flex flex-row max-lg:flex-col text-redhot max-sm:text-base justify-between items-center">
            <CardTitle className='max-sm:text-base text-lg'>Total Utilisateurs</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="font-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10 border border-gray-300 ">
        <CardHeader className='text-redhot '>
          <CardTitle className=' text-lg'>Graphique des ventes / mois (CFA)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
};


export default AdminDashboard;