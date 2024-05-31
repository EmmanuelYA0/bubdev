
import Loading from '@/app/loading';
import { customersColumns } from '@/components/admin/customers/customersColums'
import { CustomersDataTable } from '@/components/admin/customers/customersDataTable'
import { Separator } from '@/components/ui/separator'
import { prisma } from '@/lib/prisma';
import React, { Suspense } from 'react'

async function fetchCustomers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
    orderBy: {
      username: 'asc',
    },
  });
}



async function CustomerTable() {
  const customers = await fetchCustomers();
  return <CustomersDataTable columns={customersColumns} data={customers} />;
}

const CustomersPage = () => {
  return (

    <Suspense fallback={<Loading/>}>
      <div className="ml-5 mt-36">
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl">Clients</p>
        </div>
        <Separator className="bg-gray-400 my-4" />
        <Suspense fallback={<div>Chargement des clients...</div>}>
          <CustomerTable />
        </Suspense>
      </div>
    </Suspense>
  )
}

export default CustomersPage