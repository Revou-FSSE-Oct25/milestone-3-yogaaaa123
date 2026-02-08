'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, addToCart, clearCart, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h1>
        <p className="text-gray-600 mb-6">Belum ada produk di keranjang Anda</p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  // Helper to get clean image URL
  const getImageUrl = (images: string[]) => {
    if (!images || images.length === 0) return 'https://placehold.co/100x100';
    let img = images[0];
    if (img.startsWith('["') && img.endsWith('"]')) {
      try {
        const parsed = JSON.parse(img);
        if (Array.isArray(parsed) && parsed.length > 0) img = parsed[0];
      } catch {
        // ignore
      }
    }
    img = img.replace(/^["']|["']$/g, '');
    return img.startsWith('http') ? img : 'https://placehold.co/100x100';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="p-6">
                <div className="flex items-center">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={getImageUrl(item.images)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <Link href={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-500">{item.category.name}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        // Remove all of this item
                        for (let i = 0; i < item.quantity; i++) {
                          removeFromCart(item.id);
                        }
                      }}
                      className="p-2 text-red-500 hover:text-red-700 ml-4"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total Item:</span>
            <span className="font-medium">{totalItems} item</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium text-gray-900">Total Harga:</span>
            <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="space-y-3">
            <Link
              href={isAuthenticated ? '/checkout' : '/login?returnUrl=/checkout'}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {isAuthenticated ? 'Lanjut ke Checkout' : 'Login untuk Checkout'}
            </Link>
            <button
              onClick={clearCart}
              className="block w-full bg-red-100 text-red-600 text-center py-3 rounded-lg hover:bg-red-200 transition font-medium"
            >
              Kosongkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
