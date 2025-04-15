'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { deleteCategory } from 'app/api/categories';
import { URL_ROUTES } from 'constants/urls.routes';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryTree({ categories }: { categories: any[] }) {
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Accordion type="multiple" className="w-full space-y-4">
      {categories.map((category) => (
        <AccordionItem
          key={category._id}
          value={category._id}
          className="border rounded-lg px-4"
        >
          <AccordionTrigger className="py-4 hover:underline">
            <div className="flex justify-between items-center gap-4 w-full text-left">
              <div className="flex justify-center items-center gap-4">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                  priority
                />
                <div className="text-wrap flex flex-col gap-1 overflow-hidden">
                  <h2 className="font-semibold text-lg">{category.name}</h2>
                  <p className="text-muted-foreground text-sm break-words">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mr-3">
                <Link href={URL_ROUTES.categoryEdit(category._id)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit {category.name}</span>
                </Link>

                <div onClick={() => handleDelete(category._id)}>
                  <Trash className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete {category.name}</span>
                </div>
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="ml-6 space-y-4 pb-4">
            {category.subCategories?.map((sub: any) => (
              <AccordionItem key={sub._id} value={sub._id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4">
                    <Image
                      src={sub.imageUrl}
                      alt={sub.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                    <div className="text-left">
                      <h3 className="font-medium text-base">{sub.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sub.description}
                      </p>
                    </div>
                    <div className="flex gap-3 mr-3">
                      <div>
                        <Link href={`/categories/${sub._id}`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {sub.name}</span>
                        </Link>
                      </div>
                      <div onClick={() => handleDelete(sub._id)}>
                        <Trash className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete {sub.name}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="ml-6">
                  <ul className="space-y-2">
                    {sub.subSubCategories?.map((subsub: any) => (
                      <div
                        key={subsub._id}
                        className="flex justify-between items-center"
                      >
                        <li className="text-sm flex items-center justify-start gap-4">
                          <Image
                            src={subsub.imageUrl}
                            alt={subsub.name}
                            width={50}
                            height={50}
                            className="rounded object-cover"
                          />
                          <span className="font-semibold text-foreground">
                            {subsub.name}
                          </span>{' '}
                          -{' '}
                          <span className="text-muted-foreground">
                            {subsub.description}
                          </span>
                        </li>
                        <div className="flex gap-3 mr-5">
                          <div>
                            <Link href={`/categories/${subsub._id}`}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">
                                Edit {subsub.name}
                              </span>
                            </Link>
                          </div>
                          <div onClick={() => handleDelete(subsub._id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                            <span className="sr-only">
                              Delete {subsub.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
