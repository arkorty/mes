'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  userFieldLabels,
  userFields,
  UserFields,
  UserRole
} from 'types/user.types';
import Image from 'next/image';

const UserForm = ({ initialUser }: { initialUser?: UserFields }) => {
  const [user, setUser] = useState<UserFields>(initialUser || userFields);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof UserFields
  ) => {
    const value =
      field === 'picture'
        ? (e.target as HTMLInputElement).files?.[0] || new File([], '')
        : e.target.value;

    setUser((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setUser((prev) => ({
      ...prev,
      role: parseInt(value)
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', user);
    // TODO: Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{initialUser ? 'Edit User' : 'New User'}</CardTitle>
          <CardDescription>
            {initialUser
              ? 'Edit the details of your existing user below.'
              : 'Create a new user by filling out the form below.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(userFields) as (keyof UserFields)[]).map((field) => {
              if (field === 'address') {
                return (
                  <div key={field} className="md:col-span-2 lg:col-span-3">
                    <Label>{userFieldLabels[field]}</Label>
                    <Textarea
                      value={user.address}
                      onChange={(e) => handleChange(e, field)}
                      placeholder="Enter address"
                    />
                  </div>
                );
              }

              if (field === 'role') {
                return (
                  <div key={field}>
                    <Label>{userFieldLabels[field]}</Label>
                    <Select
                      value={
                        String(user.role) === '-1' ? '' : String(user.role)
                      }
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(UserRole)
                          .filter(
                            (key) =>
                              key !== 'None' &&
                              !isNaN(Number(UserRole[key as any]))
                          )
                          .map((key) => (
                            <SelectItem
                              key={UserRole[key as any]}
                              value={String(UserRole[key as any])}
                            >
                              {key}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              }

              if (field === 'picture') {
                return (
                  <div key={field}>
                    <Label>{userFieldLabels[field]}</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleChange(e, field)}
                    />
                    {initialUser?.picture && (
                      <div className="relative w-full aspect-[4/3] max-w-sm border rounded-md">
                        <Image
                          src={initialUser.picture}
                          alt={initialUser.name}
                          fill
                          className="object-contain rounded"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={field}>
                  <Label>{userFieldLabels[field]}</Label>
                  <Input
                    type={field === 'password' ? 'password' : 'text'}
                    value={(user[field] as string) || ''}
                    onChange={(e) => handleChange(e, field)}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" className="mt-6">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default UserForm;
