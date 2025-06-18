'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import avatar from '../public/placeholder-user.jpg';

export function User() {
  const router = useRouter();

  const user = {
    name: 'John Doe',
    image: null
  };

  const handleSignOut = (e: FormEvent) => {
    e.preventDefault();
    alert("You've been signed out.");
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user?.image ?? avatar}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
            priority
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem asChild>
            <form onSubmit={handleSignOut}>
              <button type="submit" className="w-full text-left">
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
