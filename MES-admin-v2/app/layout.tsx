import { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Mountain Expedition Supply',
  description:
    'An admin panel built for CMS for Mountain Expedition Supply.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
}
