import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

import { getCleanImageUrl } from '@/utils/imageHelper';

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getCleanImageUrl(product.images);
  

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <Link href={`/product/${product.id}`} className="block relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
