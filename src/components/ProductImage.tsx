import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    );
  }

  return (
    <div className="h-full w-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
      <span className="text-zinc-400 text-sm">No Image</span>
    </div>
  );
}
 
