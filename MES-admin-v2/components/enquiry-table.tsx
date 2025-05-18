'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { deleteEnquiry } from 'app/api/enquiries';
import { Trash } from 'lucide-react';
import React from 'react';

const EnquiryTable = ({ enquiries }: any) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{enquiry.email}</TableCell>
              <TableCell>{enquiry.mobile}</TableCell>
              <TableCell>{enquiry.message || '-'}</TableCell>
              <TableCell>{enquiry.createdAt.split('T')[0]}</TableCell>
              <TableCell onClick={() => deleteEnquiry(enquiry._id)}>
                <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
                <span className="sr-only">Delete</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EnquiryTable;
