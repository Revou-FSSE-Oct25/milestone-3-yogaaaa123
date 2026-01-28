import { Product } from '@/types/product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCleanImageUrl } from '@/utils/imageHelper';
import AddToCart from '@/components/AddToCart';
import ProductImage from '@/components/ProductImage';




async function getProduct(id: string): Promise<Product | null> {
  console.log('Fetching product with ID:', id); // DEBUG log
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: 'no-store' });
    console.log('API Response status:', res.status); // DEBUG log
    if (!res.ok) {
        console.error('API Error:', await res.text());
        return null;
    }
    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: `${product.title} | SSG Store`,
    description: product.description,
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const imageUrl = getCleanImageUrl(product.images);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md dark:bg-zinc-900">
        <div className="grid sm:grid-cols-2">
          <div className="relative h-64 w-full bg-zinc-100 sm:h-auto dark:bg-zinc-800">
             <ProductImage
              src={imageUrl}
              alt={product.title}
            />
          </div>
          <div className="p-6">
            <div className="mb-3">
              <span className="inline-block rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                {product.category.name}
              </span>
            </div>
            <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {product.title}
            </h1>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
              {product.description}
            </p>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                ${product.price}
              </span>
             
            </div>
            <div className="flex flex-col gap-3">
               <AddToCart price={product.price} />
              <Link
                href="/"
                className="w-full rounded-md border border-zinc-300 py-2 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
