'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/icons';
import { Search } from 'lucide-react';
import { useDebounce } from 'hooks/useDebounce';
import { URL_ROUTES } from 'constants/urls.routes';

export function SearchInput({ url }: { url: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (debouncedValue) {
        params.set('q', debouncedValue);
      } else {
        params.delete('q');
      }
      router.push(`/${URL_ROUTES[url.toLowerCase()]}?${params.toString()}`);
    });
  }, [debouncedValue]);

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground" />
      <Input
        name="q"
        type="search"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
      {isPending && <Spinner />}
    </div>
  );
}
