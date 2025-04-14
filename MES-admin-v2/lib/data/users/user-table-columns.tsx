'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { deleteUser } from 'app/api/users';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Column } from 'types/data-table.types';

export const userTableColumns: Column<any>[] = [
  {
    label: 'Name',
    accessor: 'name',
    className: 'hidden sm:table-cell'
  },
  {
    label: 'Email',
    accessor: 'email',
    className: 'sm:table-cell'
  },
  {
    label: 'Mobile',
    accessor: 'mobile',
    className: 'hidden sm:table-cell'
  },
  {
    label: 'Role',
    accessor: 'role',
    className: 'sm:table-cell'
  },
  {
    label: 'Actions',
    accessor: 'id',
    render: (user: any) => (
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
            <Link href={`/users/${user._id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await deleteUser(user._id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
];
