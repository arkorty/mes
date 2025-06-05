import { DataTable } from '@/components/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { orderTableColumns } from '@/lib/data/orders/order-table-columns';
import { getOrders } from 'app/api/orders';

export default async function ViewOrders(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentPage = searchParams.page ?? 1;
  const { data } = await getOrders({ page: +currentPage, search });
  return (
    <>
      <Tabs defaultValue="all" className='w-full overflow-x-auto'>
        <div className="w-full flex justify-start items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <DataTable
            columns={orderTableColumns}
            items={data.data}
            title="Orders"
            description="Manage orders"
            currentPage={+currentPage}
            totalItems={data.total}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
