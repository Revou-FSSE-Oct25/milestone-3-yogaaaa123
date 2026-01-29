import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] || '';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
{imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 text-sm">No Image</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`}>
            <h3 className="line-clamp-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50 hover:underline" title={product.title}>
            {product.title}
            </h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
