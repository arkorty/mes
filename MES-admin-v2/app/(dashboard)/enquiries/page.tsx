import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import EnquiryTable from '../../../components/enquiry-table';
import { getEnquiries } from 'app/api/enquiries';

export default async function ViewEnquiries() {
  const { data: enquiries } = await getEnquiries();

  return (
    <Tabs defaultValue="all" className='w-full overflow-x-auto'>
      <TabsList>
        <TabsTrigger value="all">All Enquiries</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {enquiries.length === 0 ? (
          <div className="text-center mt-20 font-semibold text-2xl">No enquiries found</div>
        ) : (
          <EnquiryTable enquiries={enquiries} />
        )}
      </TabsContent>
    </Tabs>
  );
}
