# Admin Dashboard

A modern, responsive admin dashboard built with Next.js App Router (v15) and Tailwind CSS.

## Overview

This project is a comprehensive admin interface for managing products, orders, users, and categories. It features a clean, intuitive UI powered by Next.js and styled with Tailwind CSS.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **React** for UI components

## Features

- **Dashboard**: Overview of key metrics and stats
- **Products Management**: Add, edit, and delete products
- **Order Processing**: View and manage customer orders
- **User Management**: Manage user accounts and permissions
- **Category Management**: Organize products into categories
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during navigation and operations

## Getting Started

### Prerequisites

- Node.js 18+ (or the version recommended for Next.js 15)
- npm or yarn or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd admin-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Deployment

This project can be deployed using [Vercel](https://vercel.com/), the creators of Next.js:

```bash
npm install -g vercel
vercel
```

## Usage

### Authentication

Access the admin dashboard by navigating to `/admin/login` and entering your credentials.

### Dashboard

The main dashboard at `/admin` shows key metrics and provides navigation to all sections.

### Managing Products

Add, edit, or remove products through the `/admin/products` section.

### Processing Orders

View and manage customer orders in the `/admin/orders` section.

### User Management

Manage user accounts and permissions in the `/admin/users` section.

## Customization

### Styling

This project uses Tailwind CSS for styling. Modify the `tailwind.config.js` file to customize the theme:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        // Add your custom colors
      },
      // Add other theme customizations
    },
  },
  // ...
};
```