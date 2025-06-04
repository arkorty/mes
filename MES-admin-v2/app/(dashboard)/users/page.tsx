import { DataTable } from '@/components/data-table';
import { SearchInput } from '@/components/search';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userTableColumns } from '@/lib/data/users/user-table-columns';
import { getUsers } from 'app/api/users';
import { URL_ROUTES } from 'constants/urls.routes';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ViewUsers(props: {
  searchParams: Promise<{ q: string; currentPage: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const currentPage = searchParams.currentPage ?? 1;
  const data = await getUsers({
    page: +currentPage,
    search
  });

  const users = data.data;
  const totalItems = data.totalCount;

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <SearchInput />
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href={URL_ROUTES.userAdd}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add User
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <DataTable
            items={users}
            columns={userTableColumns}
            title="Users"
            description="Manage users"
            currentPage={data.currentPage ?? 1}
            totalItems={totalItems}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
