import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { classTableColumns } from '@/lib/data/classes/class-table-columns';
import { getClasses } from 'app/api/classes';
import { URL_ROUTES } from 'constants/urls.routes';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function ViewClasses(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = searchParams.page ?? 1;
  const { data, pagination } = await getClasses({ page: +currentPage });
  return (
    <>
      <Tabs defaultValue="all" className="w-full overflow-x-auto">
        <div className="w-full flex justify-start items-center space-y-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href={URL_ROUTES.classesAdd}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Class
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <DataTable
            title="Classes"
            description="Manage classes"
            items={data ?? []}
            currentPage={pagination.page}
            columns={classTableColumns}
            totalItems={pagination.total ?? 0}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
