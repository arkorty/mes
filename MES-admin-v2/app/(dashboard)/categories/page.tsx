import CategoryTree from '@/components/category-tree';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCategories } from 'app/api/categories';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ViewCategories() {
  const { data } = await getCategories();
  const categories = data.data;
  return (
    <>
      <Tabs defaultValue="all">
        <div className="px-6 flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href="/categories/add">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Categories</h1>
              <p>Manage your Categories here.</p>
            </div>
            <CategoryTree categories={categories} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
