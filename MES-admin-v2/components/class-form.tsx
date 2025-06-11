import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const resolveValueFromDot = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj) || '';
};

const ClassForm = ({
  title,
  description,
  fields,
  handleChange,
  handleSubmit,
  formData,
  props
}: any) => {
  const [optionsMap, setOptionsMap] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const fetchAllAsyncOptions = async () => {
      const asyncFields = fields.filter(
        (f: any) =>
          f.type === 'select' &&
          f.isAsync &&
          typeof f.fetchOptions === 'function'
      );

      for (const field of asyncFields) {
        const options = await field.fetchOptions();
        setOptionsMap((prev) => ({ ...prev, [field.name]: options }));
      }
    };

    fetchAllAsyncOptions();
  }, [fields]);

  const renderField = (field: any) => {
    const fieldValue =
      resolveValueFromDot(formData, field.name) ?? field.getValue?.(props);

    if (field.type === 'text' || field.type === 'number') {
      return (
        <div key={field.name} className="space-y-1">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type}
            value={fieldValue}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="space-y-1 md:col-span-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Textarea
            id={field.name}
            value={fieldValue}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      );
    }

    if (field.type === 'select') {
      const options = field.isAsync
        ? optionsMap[field.name] || []
        : field.options || [];
      return (
        <div key={field.name} className="space-y-1">
          <Label>{field.label}</Label>
          <Select
            value={fieldValue}
            onValueChange={(val) => handleChange(field.name, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt: any) => (
                <SelectItem
                  key={field.isAsync ? field.getOptionValue(opt) : opt.value}
                  value={field.isAsync ? field.getOptionValue(opt) : opt.value}
                >
                  {field.isAsync ? field.getOptionLabel(opt) : opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field.type === 'file') {
      const file = formData?.[field.name];
      const isFile = file instanceof File;
      const imageUrl = isFile ? URL.createObjectURL(file) : file;

      return (
        <div key={field.name} className="space-y-1">
          <Label>{field.label}</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(field.name, e.target.files?.[0])}
          />
          {imageUrl && (
            <div className="relative w-full aspect-[4/3] max-w-sm border rounded-md">
              <Image
                src={imageUrl}
                alt={field.label}
                fill
                className="object-contain rounded"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
        </div>
      );
    }

    if (field.type === 'array') {
      const values: string[] = resolveValueFromDot(formData, field.name) || [];
      const [inputValue, setInputValue] = useState('');

      const handleAdd = (val: string) => {
        const trimmed = val.trim();
        if (trimmed && !values.includes(trimmed)) {
          handleChange(field.name, [...values, trimmed]);
        }
      };

      const handleRemove = (val: string) => {
        handleChange(
          field.name,
          values.filter((item) => item !== val)
        );
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ',' || e.key === 'Enter') {
          e.preventDefault();
          handleAdd(inputValue);
          setInputValue('');
        }

        if (e.key === 'Backspace' && !inputValue) {
          handleRemove(values[values.length - 1]);
        }
      };

      return (
        <div key={field.name} className="space-y-1">
          <Label htmlFor={field.name}>{field.label}</Label>
          <div className="flex flex-wrap gap-2 border rounded-md px-2 py-1">
            {values.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
            <input
              id={field.name}
              className="flex-grow bg-transparent focus:outline-none"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fields.map(renderField)}
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

export default ClassForm;
