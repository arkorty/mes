'use client';

import { URL_ROUTES } from 'constants/urls.routes';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Column } from 'types/data-table.types';

export const orderTableColumns: Column<any>[] = [
  {
    label: 'User Id',
    accessor: 'userId',
    className: 'sm:table-cell'
  },
  {
    label: 'City',
    accessor: 'shippingAddress.city',
    className: 'hidden sm:table-cell'
  },
  {
    label: 'State',
    accessor: 'shippingAddress.state',
    className: 'hidden sm:table-cell'
  },
  {
    label: 'Price',
    accessor: 'total',
    className: 'sm:table-cell'
  },
  {
    label: 'Payment Status',
    accessor: 'paymentStatus',
    className: 'sm:table-cell'
  },
  {
    label: 'Actions',
    accessor: 'id',
    render: (item: any) => (
      <Link href={URL_ROUTES.orderView(item._id)}>
        <Eye className="w-4 h-4" />
        <span className="sr-only">Edit</span>
      </Link>
    )
  }
];
