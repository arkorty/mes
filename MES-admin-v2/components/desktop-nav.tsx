import { NavItem } from '@/components/nav-item';
import { APP_NAME } from 'constants/strings';
import { URL_ROUTES } from 'constants/urls.routes';
import {
  ChartColumnStacked,
  Package,
  ShoppingCart,
  Users2
} from 'lucide-react';
import Link from 'next/link';

const DesktopNav = () => {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href={URL_ROUTES.orders}
            className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
          >
            <span>MES</span>
            <span className="sr-only">{APP_NAME}</span>
          </Link>
          <NavItem href={URL_ROUTES.orders} label="Orders">
            <ShoppingCart className="h-5 w-5 text-black" />
          </NavItem>

          <NavItem href={URL_ROUTES.products} label="Products">
            <Package className="h-5 w-5 text-black" />
          </NavItem>

          <NavItem href={URL_ROUTES.users} label="Users">
            <Users2 className="h-5 w-5 text-black" />
          </NavItem>

          <NavItem href={URL_ROUTES.categories} label="Categories">
            <ChartColumnStacked className="h-5 w-5 text-black" />
          </NavItem>
        </nav>
      </aside>
    </>
  );
};

export default DesktopNav;
