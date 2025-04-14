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
            <SheetTitle>{APP_NAME}</SheetTitle>
            <SheetDescription aria-describedby={undefined} />
          </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/orders"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground active:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground active:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/users"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground active:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground active:text-foreground"
            >
              <ChartColumnStacked className="h-5 w-5" />
              Categories
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
