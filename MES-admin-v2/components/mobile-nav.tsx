import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { APP_NAME } from 'constants/strings';
import { NAV_ROUTES, URL_ROUTES } from 'constants/urls.routes';
import {
  ChartColumnStacked,
  Package,
  PanelLeft,
  ShoppingCart,
  Users2
} from 'lucide-react';
import Link from 'next/link';

const MobileNav = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs pt-16">
          <SheetHeader className="mt-2 mb-6">
            <SheetTitle className='text-2xl'>{APP_NAME}</SheetTitle>
            <SheetDescription aria-describedby={undefined} />
          </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
            {NAV_ROUTES.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                className="flex items-center gap-4 px-2.5"
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
