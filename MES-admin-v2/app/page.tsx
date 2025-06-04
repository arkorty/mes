'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import { API_ROUTES } from 'constants/api.routes';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post(API_ROUTES.adminLogin, {
        email,
        password
      });
      if (data.success) {
        alert('login successful');
        router.push('/orders');
      }
    } catch (error) {
      alert('incorrect credentials');
      console.error(JSON.stringify(error, null, 2));
    }
    setEmail('');
    setPassword('');
  };
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
        </CardHeader>
        <CardFooter>
          <form className="w-full space-y-4" onSubmit={handleLogin}>
            <div>
              <Label>Email: </Label>
              <Input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label>Password: </Label>
              <Input
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
