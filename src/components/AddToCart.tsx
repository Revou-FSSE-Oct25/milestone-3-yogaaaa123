'use client';

import { useState, useEffect } from 'react';

export default function AddToCart({ price }: { price: number }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const total = price * quantity;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setMessage(`terimakasih sudah membeli`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
             Total
         </span>
         <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
           ${total}
         </span>
      </div>
      
      {message && (
        <div className="rounded-md bg-green-100 p-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {message}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center rounded-lg border border-zinc-300 dark:border-zinc-700">
          <button
              onClick={decreaseQuantity}
              className="px-4 py-3 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="min-w-[3rem] text-center font-semibold text-zinc-900 dark:text-zinc-50">
            {quantity}
          </span>
          <button
              onClick={increaseQuantity}
              className="px-4 py-3 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Add to Cart - ${total}
        </button>
      </div>
    </div>
  );
}
 
 
