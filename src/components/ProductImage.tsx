import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
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
