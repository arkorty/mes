import { ReactNode } from "react";

export type Column<T> = {
  label: string;
  accessor: keyof T;
  className?: string;
  render?: (item: T) => ReactNode;
};

export type Props<T> = {
  items: T[];
  columns: Column<T>[];
  title: string;
  description: string;
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
};
