'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  productFormFields,
  variationFormFields
} from 'constants/product-form-data';
import { addUpdateProduct } from 'app/api/products';

const ProductForm = ({
  initialProduct,
  initialVariations = [],
  categories = []
}: {
  initialProduct?: Record<string, any>;
  initialVariations?: Record<string, any>[];
  categories: any[];
}) => {
  const categoryData = categories;
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
  const [variationImages, setVariationImages] = useState<File[]>([]);

  const defaultProductState = productFormFields.reduce(
    (acc, field) => {
      acc[field.key] = field.defaultValue;
      return acc;
    },
    {} as Record<string, any>
  );

  const defaultVariationState = variationFormFields.reduce(
    (acc, field) => {
      acc[field.key] = field.defaultValue;
      return acc;
    },
    {} as Record<string, any>
  );

  const [product, setProduct] = useState(
    initialProduct
      ? { ...defaultProductState, ...initialProduct }
      : defaultProductState
  );

  const [variations, setVariations] = useState(
    initialVariations.length
      ? initialVariations.map((v) => ({ ...defaultVariationState, ...v }))
      : [{ ...defaultVariationState }]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string
  ) => {
    const value =
      e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

    setProduct((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectChange = (val: string, key: string) => {
    setProduct((prev) => ({
      ...prev,
      [key]: val
    }));
    // Cascading dropdown logic
    if (key === 'categoryId') {
      const selectedCategory = categoryData.find((c) => c._id === val);
      setSubCategories(selectedCategory?.subCategories || []);
      setSubSubCategories([]);
      setProduct((prev) => ({
        ...prev,
        subCategoryId: '',
        subSubCategoryId: ''
      }));
    }

    if (key === 'subCategoryId') {
      const selectedSub = subCategories.find((s) => s._id === val);
      setSubSubCategories(selectedSub?.subSubCategories || []);
      setProduct((prev) => ({
        ...prev,
        subSubCategoryId: ''
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSizeMB = 2;

    if (key === 'coverImage') {
      const file = files[0];
      if (!file) return;

      if (!allowedTypes.includes(file.type)) {
        alert(
          'Only .webp, .jpg, .jpeg, .png files are allowed for cover image'
        );
        return;
      }

      if (file.size > maxFileSizeMB * 1024 * 1024) {
        alert('Cover image must be less than 2MB');
        return;
      }

      setProduct((prev) => ({
        ...prev,
        [key]: file
      }));
    }

    if (key === 'otherImages') {
      const selectedFiles = Array.from(files);

      if (selectedFiles.length > 4) {
        alert('You can only upload up to 4 images');
        return;
      }

      for (let file of selectedFiles) {
        if (!allowedTypes.includes(file.type)) {
          alert(
            'Only .webp, .jpg, .jpeg, .png files are allowed for other images'
          );
          return;
        }

        if (file.size > maxFileSizeMB * 1024 * 1024) {
          alert(`File ${file.name} is larger than 2MB`);
          return;
        }
      }

      setProduct((prev) => ({
        ...prev,
        [key]: selectedFiles
      }));
    }
  };

  const handleVariationChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const value =
      e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.type === 'checkbox'
          ? e.target.checked
          : e.target.value;

    const updated = [...variations];
    updated[index][key] = value;
    setVariations(updated);
  };

  const handleBaseVariationChange = (index: number) => {
    const updated = variations.map((variation, i) => ({
      ...variation,
      isBaseVariation: i === index
    }));
    setVariations(updated);
  };

  const handleVariationFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxFileSizeMB = 2;

    if (!allowedTypes.includes(file.type)) {
      alert(
        'Only .webp, .jpg, .jpeg, .png files are allowed for variation images'
      );
      return;
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert('Variation image must be less than 2MB');
      return;
    }

    setVariationImages((prev) => {
      const updated = [...prev];
      updated[index] = file; // map index to variation
      return updated;
    });
  };

  const handleAddVariation = () => {
    setVariations((prev) => [...prev, { ...defaultVariationState }]);
  };

  const handleRemoveVariation = (index: number) => {
    if (variations.length > 1) {
      const updated = [...variations];
      updated.splice(index, 1);
      setVariations(updated);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (initialProduct?._id) {
      formData.append('_id', initialProduct._id);
    }

    Object.entries(product).forEach(([key, value]) => {
      if (key === 'coverImage' && value instanceof File) {
        formData.append('coverImage', value);
      } else if (key === 'otherImages' && Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append('otherImages', file);
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    variations.forEach((variation, index) => {
      variation.imageIndex = index;
      formData.append('variationImages', variationImages[index]);
    });

    formData.append(
      'variations',
      JSON.stringify(variations.map(({ variationImage, ...rest }) => rest))
    );

    // debug
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]} = ${pair[1]}`);
    // }
    
    try {
      const res = await addUpdateProduct(formData);
      if (res.success) alert('Product added/updated successfully');
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {initialProduct ? 'Edit Product' : 'New Product'}
          </CardTitle>
          <CardDescription>
            {initialProduct
              ? 'Edit the details of your product below.'
              : 'Create a new product by filling out the form below.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productFormFields
              .filter((field) => !(initialProduct && field.key === 'sku'))
              .map((field) => {
                const isFileUpload =
                  field.key === 'coverImage' || field.key === 'otherImages';
                return (
                  <div key={field.key}>
                    <Label>{field.label}</Label>
                    {field.type === 'select' ? (
                      <Select
                        defaultValue={product[field.key]}
                        onValueChange={(val) =>
                          handleSelectChange(val, field.key)
                        }
                        required={field.required ?? false}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              field.key === 'categoryId'
                                ? `Select ${field.label}`
                                : field.key === 'subCategoryId'
                                  ? `Select Category first`
                                  : `Select Sub Category first`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {(field.key === 'categoryId'
                            ? categoryData
                            : field.key === 'subCategoryId'
                              ? subCategories
                              : field.key === 'subSubCategoryId'
                                ? subSubCategories
                                : field.dropDown || []
                          ).map((item: any) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : isFileUpload ? (
                      <Input
                        type="file"
                        accept="image/webp,image/jpeg,image/jpg,image/png"
                        multiple={field.key === 'otherImages'}
                        onChange={(e) => handleFileChange(e, field.key)}
                        required
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={product[field.key] ?? ''}
                        onChange={(e) => handleInputChange(e, field.key)}
                        required={field.required ?? false}
                      />
                    )}
                  </div>
                );
              })}
          </div>

          {/* Variations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Variations</h3>
            {variations.map((variation, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg space-y-2 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {variationFormFields.map((field) => {
                    const isFileUpload = field.key === 'variationImage';
                    return (
                      <div
                        key={field.key}
                        className={`flex ${field.type === 'checkbox' ? 'flex-row items-center gap-1' : 'flex-col justify-start gap-2'}`}
                      >
                        <Label>{field.label}</Label>
                        {field.type === 'checkbox' ? (
                          <Checkbox
                            checked={variation[field.key]}
                            onCheckedChange={() =>
                              handleBaseVariationChange(index)
                            }
                          />
                        ) : isFileUpload ? (
                          <Input
                            type="file"
                            accept="image/webp,image/jpeg,image/jpg,image/png"
                            onChange={(e) =>
                              handleVariationFileChange(e, index)
                            }
                            required
                          />
                        ) : (
                          <Input
                            type={field.type}
                            value={variation[field.key] ?? ''}
                            onChange={(e) =>
                              handleVariationChange(e, index, field.key)
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveVariation(index)}
                  disabled={variations.length === 1}
                >
                  Remove Variation
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddVariation}
              variant="outline"
            >
              Add Variation
            </Button>
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

export default ProductForm;
