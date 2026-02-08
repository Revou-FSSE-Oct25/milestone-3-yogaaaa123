'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  // Parse images if they are JSON strings (Platzi sometimes returns JSON strings in array)
  const safeImages = images.map(img => {
      const cleanImg = img.replace(/^["']|["']$/g, '');
      if (cleanImg.startsWith('["') && cleanImg.endsWith('"]')) {
          try {
              const parsed = JSON.parse(cleanImg);
              if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
          } catch {
            
          }
      }
      return cleanImg;
  }).filter(img => img.startsWith('http'));

  // Ensure at least one image
  const displayImages = safeImages.length > 0 ? safeImages : ['https://placehold.co/600x400'];
  
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      {/* Main Image */}
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-100">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-4 hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 ${
              selectedImage === img ? 'border-green-600' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={img}
              alt={`${title} - ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
