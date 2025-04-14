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
import { Label } from '@/components/label';
import { ProductFields, VariationFields } from 'types/product.types';
import {
  productFieldLabels,
  productFields,
  variationFieldLabels,
  variationFields
} from 'constants/product-form-data';

const ProductForm = ({
  initialProduct,
  initialVariations = []
}: {
  initialProduct?: ProductFields;
  initialVariations?: VariationFields[];
}) => {
  const [product, setProduct] = useState<ProductFields>(productFields);

  const [variations, setVariations] = useState<VariationFields[]>([
    variationFields
  ]);

  useEffect(() => {
    if (initialProduct) setProduct(initialProduct);

    if (initialVariations.length > 0) {
      const normalized = initialVariations.map((v) => ({
        ...variationFields,
        ...v
      }));
      setVariations(normalized);
    }
  }, [initialProduct, initialVariations]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof ProductFields
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleVariationChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof VariationFields
  ) => {
    const newVariations: any = [...variations];
    newVariations[index][field] =
      e.target.type === 'number' ? +e.target.value : e.target.value;
    setVariations(newVariations);
  };

  const handleAddVariation = () => {
    setVariations([...variations, { ...variationFields }]);
  };

  const handleRemoveVariation = (index: number) => {
    if (variations.length === 1) return;
    const updated = variations.filter((_, i) => i !== index);
    setVariations(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...product,
      variations
    };
    console.log('Submitting:', payload);
    // TODO: Submit to API
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
            {(
              Object.entries(productFields) as [keyof ProductFields, any][]
            ).map(([field]) => (
              <div key={field}>
                <Label>{productFieldLabels[field]}</Label>
                <Input
                  type={typeof product[field] === 'number' ? 'number' : 'text'}
                  value={product[field] ?? ''}
                  onChange={(e) => handleInputChange(e, field)}
                />
              </div>
            ))}
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
                  {(
                    Object.entries(variationFields) as [
                      keyof VariationFields,
                      any
                    ][]
                  ).map(([field]) => (
                    <div key={field}>
                      <Label>{variationFieldLabels[field]}</Label>
                      <Input
                        type={
                          typeof variationFields[field] === 'number'
                            ? 'number'
                            : 'text'
                        }
                        value={
                          variation[field] !== undefined &&
                          variation[field] !== null
                            ? variation[field]
                            : typeof variationFields[field] === 'number'
                              ? 0
                              : ''
                        }
                        onChange={(e) => handleVariationChange(e, index, field)}
                      />
                    </div>
                  ))}
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
