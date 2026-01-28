import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20', {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err) {
    if (err instanceof Error) {
        error = err.message;
    } else {
        error = 'Unknown error';
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    Latest Products 
                </h1>
                <a href="/about" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                    About Us
                </a>
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
