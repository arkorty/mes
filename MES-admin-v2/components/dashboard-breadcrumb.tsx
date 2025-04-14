'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { TITLE_MAP } from 'constants/strings';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const getHref = (index: number) => {
    return '/' + pathSegments.slice(0, index + 1).join('/');
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbSeparator />
        {pathSegments.map((segment, index) => (
          <BreadcrumbItem key={index}>
            {index < pathSegments.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={getHref(index)}>
                    {TITLE_MAP[segment] ?? decodeURIComponent(segment)}
                  </Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>
                {TITLE_MAP[segment] ?? decodeURIComponent(segment)}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
