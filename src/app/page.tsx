import ProductsClient from '@/components/ProductsClient';
import { Product } from '@/types';

// Server-side function untuk fetch data
async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products', {
      next: { revalidate: 180 }, // Cache di server selama 3 menit (180 detik)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Server Component (default di Next.js App Router)
export default async function Home() {
  // Data di-fetch di server (SSR)
  const initialProducts = await fetchProducts();

  // Pass initial data ke Client Component
  return <ProductsClient initialData={initialProducts} />;
}
