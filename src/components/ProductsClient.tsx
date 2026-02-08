'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import BannerCarousel from '@/components/BannerCarousel';
import Loader from '@/components/Loader';
import { Product } from '@/types';

interface ProductsClientProps {
  initialData: Product[];
}

const CACHE_KEY = 'products_cache';
const CACHE_DURATION = 3 * 60 * 1000; // 3 menit dalam milliseconds

interface CacheData {
  data: Product[];
  timestamp: number;
}

import { useSearchParams } from 'next/navigation';

export default function ProductsClient({ initialData }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [loading, setLoading] = useState(false);
  
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Sync state if URL changes
  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  useEffect(() => {
    // Cek apakah ada cache di localStorage
    const cachedData = getCachedData();

    if (cachedData) {
      // Pakai data dari cache
      console.log('📦 Menggunakan data dari cache');
      setProducts(cachedData);
    } else {
      // Cache expired atau tidak ada, pakai initial data dari SSR
      console.log('🆕 Cache expired/tidak ada, pakai data SSR');
      setProducts(initialData);
      setCacheData(initialData);
    }

    // Optional: Setup interval untuk auto-refresh setelah 3 menit
    const intervalId = setInterval(() => {
      const cached = getCachedData();
      if (!cached) {
        console.log('⏰ Cache expired, fetching fresh data...');
        fetchFreshData();
      }
    }, 30000); // Check setiap 30 detik

    return () => clearInterval(intervalId);
  }, []);

  // Fungsi untuk ambil data fresh dari API (CSR)
  const fetchFreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await res.json();
      setProducts(data);
      setCacheData(data);
      console.log('✅ Data berhasil di-refresh dan di-cache');
    } catch (error) {
      console.error('❌ Gagal fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter produk berdasarkan search term (CSR manipulation)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Banner Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BannerCarousel />
      </div>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Produk Kami
          </h2>
          
          {/* Search Filter (CSR manipulation) */}
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Tidak ada produk yang cocok dengan pencarian &quot;{searchTerm}&quot;
          </p>
        )}
      </div>
    </div>
  );
}

// Helper functions untuk localStorage caching
function getCachedData(): Product[] | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CacheData = JSON.parse(cached);
    const now = Date.now();
    const isExpired = now - timestamp > CACHE_DURATION;

    if (isExpired) {
      // Hapus cache yang expired
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

function setCacheData(data: Product[]): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
}
