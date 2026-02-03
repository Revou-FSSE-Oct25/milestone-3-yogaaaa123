'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
            <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Loading products...</div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 text-red-500 dark:bg-black">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Revoshop
                </h1>
                <div className="flex gap-4">
                    <Link href="/login" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                        Login
                    </Link>
                    <Link href="/about" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                        About
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </main>
  );
}
