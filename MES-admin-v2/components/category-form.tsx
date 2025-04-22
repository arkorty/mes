'use client';

import { Label } from '@/components/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { addUpdateCategory } from 'app/api/categories';
import { revalidatePath } from 'next/cache';

const CategoryForm = ({
  initialCategory,
  categoryDropdown = []
}: {
  initialCategory?: any;
  categoryDropdown: any[];
}) => {
  const [parentId, setParentId] = useState(initialCategory?.parentId || '');
  const [name, setName] = useState(initialCategory?.name || '');
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState(
    initialCategory?.description || ''
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (initialCategory?._id) formData.append('_id', initialCategory._id);
    if (parentId) formData.append('parentId', parentId);
    formData.append('name', name);
    formData.append('description', description);

    if (image instanceof File) {
      formData.append('picture', image);
    }

    try {
      const response = await addUpdateCategory(formData);

      if (response.success) {
        alert('Category added/updated successfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {initialCategory ? 'Edit Category' : 'Add Category'}
          </CardTitle>
          <CardDescription>
            {initialCategory
              ? 'Edit the details of your category below.'
              : 'Create a new category by filling out the form below.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Parent Category */}
            <div className="flex flex-col space-y-2">
              <Label>Parent Category:</Label>
              <Select
                value={parentId}
                onValueChange={(value: string) => setParentId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent category..." />
                </SelectTrigger>
                <SelectContent>
                  {categoryDropdown.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="flex flex-col space-y-2">
              <Label>Name:</Label>
              <Input
                type="text"
                placeholder="Category name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2 md:col-span-2 lg:col-span-3">
              <Label>Description:</Label>
              <Textarea
                placeholder="Write a short description..."
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col space-y-2">
            <Label>Image:</Label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {initialCategory?.imageUrl && (
              <div className="relative w-full aspect-[4/3] max-w-sm border rounded-md">
                <Image
                  src={initialCategory.imageUrl}
                  alt={initialCategory.name}
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              {initialCategory ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default CategoryForm;
