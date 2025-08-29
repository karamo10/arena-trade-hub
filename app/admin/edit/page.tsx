'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/data/definition';
import ProductCard from '@/components/product-card';
import { useRouter } from 'next/navigation';

export default function EditProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/login');
      return;
    }
    
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  });

  // const updateProduct = async () => {
  //   if (!editingProduct) return;

  //   const res = await fetch(
  //     `http://localhost:5000/products/${editingProduct.id}`,
  //     {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(editingProduct),
  //     }
  //   );

  //   if (!res.ok) {
  //     alert('Failed to update product');
  //     return;
  //   }

  //   const updated = await res.json();
  //   // Replace updated product in state
  //   setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

  //   setEditingProduct(null);
  //   alert('Product updated');
  // };

  return (
    <section className="min-h-screen px-[80px]">
      <div className="mb-12 text-center flex flex-col max-w-[400px] mx-auto py-4 px-4 bg-blue-950/95 rounded">
        <input type="text" value={editingProduct?.name} className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm" />
        <input type="number" value={editingProduct?.price} className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm" />
        <input type="text" value={editingProduct?.categorie} className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm" />
        <textarea value={editingProduct?.description} className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm resize-none h-14 min-[5]"></textarea>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            defaultChecked={editingProduct?.instock}
            id="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm"
          />
          <label htmlFor="checkbox" className="text-white text-sm">
            instock
          </label>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <button onClick={() => setEditingProduct(product)}>edit</button>
          </div>
        ))}
      </div>
    </section>
  );
}
