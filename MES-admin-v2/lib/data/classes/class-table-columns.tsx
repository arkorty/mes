'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteProduct } from 'app/api/products';
import { URL_ROUTES } from 'constants/urls.routes';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Column } from 'types/data-table.types';

export const classTableColumns: Column<any>[] = [
  {
    label: 'Title',
    accessor: 'title',
    className: 'sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.title}</span>
  },
  {
    label: 'Level',
    accessor: 'level',
    className: 'sm:table-cell',
    render: (item: any) => item.level
  },
  {
    label: 'Duration',
    accessor: 'hidden duration',
    className: 'sm:table-cell',
    render: (item: any) => item.duration
  },
  {
    label: 'Instructor',
    accessor: 'instructor',
    className: 'hidden sm:table-cell',
    render: (item: any) => (
      <span className="font-medium">{item.instructor}</span>
    )
  },
  {
    label: 'Price',
    accessor: 'price',
    className: 'sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.price}</span>
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
              href={URL_ROUTES.classesEdit(item._id)}
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
