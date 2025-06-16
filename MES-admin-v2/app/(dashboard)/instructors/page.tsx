import { DataTable } from '@/components/data-table';
import { SearchInput } from '@/components/search';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { instructorTableColumns } from '@/lib/data/instructors/instructor-table-columns';
import { getInstructors } from 'app/api/instructors';
import { URL_ROUTES } from 'constants/urls.routes';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function ViewInstructors(props: {
  searchParams: Promise<{ q: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentPage = searchParams.page ?? 1;
  const { data } = await getInstructors({ page: +currentPage, search });
  return (
    <>
      <Tabs defaultValue="all" className="w-full overflow-x-auto">
        <div className="w-full flex justify-start items-center space-y-2">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <SearchInput url="instructors" />
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href={URL_ROUTES.instructorsAdd}>
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
            title="Instructors"
            description="Manage instructors"
            items={data ?? []}
            currentPage={+currentPage}
            columns={instructorTableColumns}
            totalItems={data?.length ?? 0}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
