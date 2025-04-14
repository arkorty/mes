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

export const productTableColumns: Column<any>[] = [
  {
    label: 'Name',
    accessor: 'name',
    className: 'sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.name}</span>
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
    render: (item: any) => `$${item.price}`
  },
  {
    label: 'Stock',
    accessor: 'stock',
    className: 'hidden sm:table-cell',
    render: (item: any) => item.stock
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
            <Link href={`/products/${item.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await deleteProduct(item.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
