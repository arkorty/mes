'use client';
import { Column } from 'types/data-table.types';
import { deleteProduct } from 'app/api/products';
import { URL_ROUTES } from 'constants/urls.routes';
import Actions from '@/components/actions';

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
      <Actions
        editUrl={URL_ROUTES.productEdit(item._id)}
        onDelete={async () => await deleteProduct(item._id)}
      />
    )
  }
];
