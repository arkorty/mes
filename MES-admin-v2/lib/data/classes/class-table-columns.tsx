'use client';

import Actions from '@/components/actions';
import { deleteClass } from 'app/api/classes';
import { URL_ROUTES } from 'constants/urls.routes';
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
    accessor: 'instructor.name',
    className: 'hidden sm:table-cell',
    render: (item: any) => (
      <span className="font-medium">{item.instructor?.name}</span>
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
      <Actions
        editUrl={URL_ROUTES.classesEdit(item._id)}
        onDelete={async () => await deleteClass(item._id)}
      />
    )
  }
];
