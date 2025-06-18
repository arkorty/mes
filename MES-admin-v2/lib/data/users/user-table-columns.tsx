'use client';

import Actions from '@/components/actions';
import { deleteUser } from 'app/api/users';
import { URL_ROUTES } from 'constants/urls.routes';
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
      <Actions
        editUrl={URL_ROUTES.userEdit(user._id)}
        onDelete={async () => await deleteUser(user._id)}
      />
    )
  }
];
