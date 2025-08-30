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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/login');
      return;
    }

    // / fetching the products from backend
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://arena-json-server.onrender.com/products'
        );
        if (!res.ok) throw new Error('Failed to fetch products');
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
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.image_url ||
      !newProduct.categorie ||
      !newProduct.description
    ) {
      // alert('Please fill in all fields before adding a product!');
      // setShowModalMessage("Hello");
      setShowModal(true);
      return;
    }
    const res = await fetch('https://arena-json-server.onrender.com/products', {
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

      if (editingProduct) {
        setEditingProduct((prev) =>
          prev ? { ...prev, image_url: data.url } : null
        );
      } else {
        setNewProduct((prev) => ({
          ...prev,
          image_url: data.url,
        }));
      }
    } catch (err) {
      console.error('upload error:', err);
      alert('failed to upload image. Please try again');
    }
  };

  // Updating the product
  const updateProduct = async () => {
    if (!editingProduct) return;

    const res = await fetch(
      `https://arena-json-server.onrender.com/products/${editingProduct.id}`,
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

    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

    setEditingProduct(null);
    // alert('Product updated');
    setShowModal(true);
  };

  return (
    <div className="p-6 min-h-screen px-[80px] max-sm:px-4">
       <div className="flex flex-col sm:flex-row items-center justify-between max-w-[60%] mx-auto bg-blue-950/85 p-2 rounded mb-8">
        <button
          onClick={() => {
            localStorage.removeItem('isAdmin');
            router.push('/');
          }}
          className="text-sm text-red-500 font-bold hover:text-red-500/90 cursor-pointer"
        >
          Sign out
        </button>

        <Link
          href="/admin/delete"
          className="text-sm text-white inline-block hover:text-white/90"
        >
          Go to Delete Products
        </Link>
      </div>
      <h2 className="text-xl font-semibold text-center mb-4">
        Admin Dashboard
      </h2>
     
      <p className="text-sm text-center mb-1 font-medium capitalize">
        Create and edit a product
      </p>
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
        {/* <input
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
        /> */}
        <select
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
        >
          <option value="">Select category</option>
          <option value="rice" className="text-xs">
            rice
          </option>
          <option value="oil" className="text-xs">
            oil
          </option>
          <option value="mayonnaises" className="text-xs">
            mayonnaises
          </option>
          <option value="mix" className="text-xs">
            mix
          </option>
        </select>
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

        <button
          className="bg-blue-700 w-full text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer transition-all"
          onClick={editingProduct ? updateProduct : addProduct}
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-4">All Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id}>
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
      {/* Show Modal Display */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md w-[300px] text-center">
            <p className="text-sm">{'Please fill in all fields before adding a product!'}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 px-4 py-1 bg-blue-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
