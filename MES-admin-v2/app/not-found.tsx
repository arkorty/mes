'use client';

import { Button } from '@/components/ui/button';
import { URL_ROUTES } from 'constants/urls.routes';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <main className="p-4 md:p-6 flex justify-center items-center mt-96">
      <div className="mb-8 space-y-8">
        <h1 className='text-3xl'>Got lost?</h1>
        <Button asChild>
          <Link href={URL_ROUTES.orders}>Go to home</Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
