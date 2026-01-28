'use client';

import { useState } from 'react';

export default function AddToCart() {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
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
        Add to Cart
      </button>
    </div>
  );
}
