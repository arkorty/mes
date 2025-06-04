'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Column } from 'types/data-table.types';
import Link from 'next/link';
import { deleteProduct } from 'app/api/products';
import { URL_ROUTES } from 'constants/urls.routes';

export const productTableColumns: Column<any>[] = [
  {
    label: 'Name',
    accessor: 'name',
    className: 'sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.name}</span>
  },
  {
    label: 'Brand',
    accessor: 'brand',
    className: 'hidden sm:table-cell',
    render: (item: any) => item.brand
  },
  {
    label: 'SKU',
    accessor: 'sku',
    className: 'hidden sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.sku}</span>
  },
  {
    label: 'Price',
    accessor: 'price',
    className: 'sm:table-cell',
    render: (item: any) => item.price
  },
  {
    label: 'Created At',
    accessor: 'createdAt',
    className: 'hidden sm:table-cell',
    render: (item: any) => new Date(item.createdAt).toLocaleDateString('en-US')
  },
  {
    label: 'Actions',
    accessor: 'id',
    render: (item: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={URL_ROUTES.productEdit(item._id)}
              className="cursor-pointer"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => await deleteProduct(item._id)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
