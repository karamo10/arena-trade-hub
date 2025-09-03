'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/definition';
import { useRouter } from 'next/navigation';
// import { TrashIcon } from '@heroicons/react/16/outline';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/product-card';

export default function AdminDelete() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    fetch("https://arena-json-server.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
// http://localhost:5000/products/${id}
  const deleteProduct = async (id: string) => {
    await fetch(`https://arena-json-server.onrender.com/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-center mb-[1.5rem]">Delete Products</h2>

      <div className="flex items-center justify-center">
        <Link
          href="/admin"
          className="text-blue-500 underline mb-6 inline-block hover:text-blue-900"
        >
          Back to Add Products
        </Link>
      </div>
      <ul className="max-w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <div className="">
            <ProductCard product={p} />
            <TrashIcon
              className="w-6 h-6 text-red-700 cursor-pointer"
              onClick={() => deleteProduct(p.id)}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}