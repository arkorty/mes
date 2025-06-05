import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { productTableColumns } from '@/lib/data/products/product-table-columns';
import { getProducts } from 'app/api/products';
import { URL_ROUTES } from 'constants/urls.routes';

export default async function ProductsPage(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentPage = searchParams.page ?? 1;
  const data = await getProducts({
    page: +currentPage,
    search
  });

  return (
    <Tabs defaultValue="all" className='w-full overflow-x-auto'>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href={URL_ROUTES.productAdd}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <DataTable
          items={data.data}
          columns={productTableColumns}
          title="Products"
          description="Manage your products and view their status."
          currentPage={data.currentPage ?? 1}
          totalItems={data.totalCount}
        />
      </TabsContent>
    </Tabs>
  );
}
