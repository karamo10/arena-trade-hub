'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/data/definition';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/product-card';

export default function AdminDashboard() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    image_url: '',
    price: 0,
    categorie: '',
    description: '',
    instock: true,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/login');
      return;
    };

    // / fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchProducts();
  }, [router]);

  // Adding product
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image_url) {
      alert('Please fill in all fields before adding a product!');
      return;
    }
    const res = await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    const product = await res.json();
    setProducts([...products, product]);

    setNewProduct({
      name: '',
      image_url: '',
      price: 0,
      categorie: '',
      description: '',
      instock: true,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        throw new Error('File upload failed');
      }
      const data = await res.json();

      setNewProduct((prev) => ({
        ...prev,
        image_url: data.url,
      }));
    } catch (err) {
      console.error('upload error:', err);
      alert('failed to upload image. Please try again');
    }
  };

  // Updating the product
  const updateProduct = async () => {
    if (!editingProduct) return;

    const res = await fetch(
      `http://localhost:5000/products/${editingProduct.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      }
    );

    if (!res.ok) {
      alert('Failed to update product');
      return;
    }

    const updated = await res.json();
    // Replace updated product in state
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

    setEditingProduct(null); 
    alert('Product updated');
  };

  return (
    <div className="p-6 min-h-screen px-[80px] max-sm:px-4">
      <h2 className="text-xl font-semibold text-center mb-8">
        Admin Dashboard
      </h2>
      <p className="text-center mb-1 font-medium">Create a new product</p>
      
      <div className="mb-12 text-center flex flex-col max-w-[400px] mx-auto py-4 px-4 bg-blue-950/95 rounded">
        <input
          type="text"
          placeholder="Product name"
          className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm"
          onChange={handleFileUpload}
        />
        <input
          type="number"
          placeholder="Price"
          className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm"
          min={0}
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  price: Number(e.target.value),
                })
              : setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
        />
        <input
          type="text"
          placeholder="product categories"
          className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm"
          value={
            editingProduct ? editingProduct.categorie : newProduct.categorie
          }
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  categorie: e.target.value,
                })
              : setNewProduct({ ...newProduct, categorie: e.target.value })
          }
        />
        <textarea
          placeholder="product description"
          className="p-2 w-full mb-4 rounded bg-white outline outline-blue-950/95 placeholder:text-xs md:placeholder:text-sm resize-none h-14 min-[5]:"
          value={
            editingProduct
              ? editingProduct.description
              : newProduct.description || 'No description available'
          }
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              : setNewProduct({ ...newProduct, description: e.target.value })
          }
        ></textarea>
        <div className=" flex items-center mb-4">
          <input
            type="checkbox"
            defaultChecked={
              editingProduct ? editingProduct.instock : newProduct.instock
            }
            className="mr-1"
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({
                    ...editingProduct,
                    instock: e.target.checked,
                  })
                : setNewProduct({ ...newProduct, instock: e.target.checked })
            }
          />
          <label htmlFor="checkbox" className="text-white text-sm">
            instock
          </label>
        </div>
        {/* Button */}
        <button
          className="bg-blue-700 w-full text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition-all"
          onClick={editingProduct ? updateProduct : addProduct}
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>
      {/* All products */}
      <h3 className="text-lg font-semibold mb-4">All Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div>
            <ProductCard product={product} />
          <button
              className="mt-2 bg-blue-600 text-white px-3 py-0 rounded text-xs cursor-pointer"
              onClick={() => setEditingProduct(product)}
            >
              Edit
            </button>
          </div>
        
        ))}
      </div>
      {/* The logout button */}
      <div className="flex items-center justify-between max-w-[50%] mx-auto">
        <button
          onClick={() => {
            localStorage.removeItem('isAdmin');
            router.push('/');
          }}
          className=" text-red-500 font-bold hover:text-red-700 cursor-pointer"
        >
          Logout
        </button>
        {/* navigation button to delete product page */}
        <Link
          href="/admin/delete"
          className="text-blue-500 underline inline-block hover:text-blue-900"
        >
          Go to Delete Products
        </Link>
        <Link
          href="/admin/edit"
          className="text-blue-500 underline inline-block hover:text-blue-900"
        >
          Edit Products
        </Link>
      </div>
    </div>
  );
}
