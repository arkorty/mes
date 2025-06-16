'use client';

import Actions from '@/components/actions';
import { deleteInstructor } from 'app/api/instructors';
import { URL_ROUTES } from 'constants/urls.routes';
import { Column } from 'types/data-table.types';

export const instructorTableColumns: Column<any>[] = [
  {
    label: 'Name',
    accessor: 'name',
    className: 'sm:table-cell',
    render: (item: any) => <span className="font-medium">{item.name}</span>
  },
  {
    label: 'Email',
    accessor: 'email',
    className: 'sm:table-cell',
    render: (item: any) => item.email
  },
  {
    label: 'Mobile',
    accessor: 'mobile',
    className: 'sm:table-cell',
    render: (item: any) => item.mobile
  },
  {
    label: 'Actions',
    accessor: 'id',
    render: (item: any) => (
      <Actions
        editUrl={URL_ROUTES.instructorsEdit(item._id)}
        onDelete={async () => deleteInstructor(item._id)}
      />
    )
  }
];
