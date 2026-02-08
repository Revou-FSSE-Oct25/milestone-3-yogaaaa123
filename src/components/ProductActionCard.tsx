'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import { Heart, Share2, MessageCircle, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductActionCardProps {
  product: Product;
  stock?: number;
}

export default function ProductActionCard({ product, stock = 50 }: ProductActionCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { addToCart } = useCart();
  const router = useRouter();

  // Mock subtotal calculation
  const subtotal = product.price * quantity;

  const handleIncrement = () => {
    if (quantity < stock) setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    // Add logic to handle quantity in addToCart if supported, otherwise loop or update context
    // For now, simple addToCart (context usually handles +1, so we might need to loop or update context to support qty)
    // The current context increments by 1. We will call it 'quantity' times or update context.
    
    // Better approach: Update context to accept quantity, or just loop for now.
    // Loop is simple for now.
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    // Optional: Toast notification
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white sticky top-24">
      <h3 className="font-bold text-lg mb-4">Atur jumlah dan catatan</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <input 
            type="text" 
            value={quantity} 
            readOnly
            className="w-12 text-center border-x border-gray-300 py-1 text-gray-900 focus:outline-none"
          />
          <button 
            onClick={handleIncrement}
            disabled={quantity >= stock}
            className="p-2 text-rose-600 hover:bg-rose-50 disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-sm text-gray-500">Stok Total: {stock}</span>
      </div>

      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Tulis catatan untuk barang ini" 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full text-sm border-b border-gray-300 focus:border-rose-600 focus:outline-none py-2 transition-colors"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600 font-medium">Subtotal</span>
        <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <button 
          onClick={handleAddToCart}
          className="w-full py-2.5 px-4 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors"
        >
          + Keranjang
        </button>
        <button 
          onClick={handleBuyNow}
          className="w-full py-2.5 px-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
        >
          Beli Langsung
        </button>
      </div>

      <div className="flex justify-center gap-6 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 font-medium">
          <MessageCircle size={18} /> Chat
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 font-medium">
          <Heart size={18} /> Wishlist
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 font-medium">
          <Share2 size={18} /> Share
        </button>
      </div>
    </div>
  );
}
