'use client';

import { Product } from '@/types/definition';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product already exists
    const existing = cart.find((item: Product) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // alert(`${product.name} added to cart`);
    setAdded(true);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-1.5 py-1 bg-blue-950 text-[10px] text-white font-extrabold rounded capitalize hover:bg-blue-950/85 transition cursor-pointer"
    >
      {added ? 'Added to cart' : 'Add to cat'}
    </button>
  );
}
