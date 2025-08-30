import data from '@/data/products.json';
import { Product } from '@/data/definition';
import AddToCartButton from '@/components/button/add-to-cart-';

interface ProductPageProps {
  params: Promise<{ id: string }>; // 👈 make params a Promise
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params; // 👈 await here

  const res = await fetch(`http://localhost:5000/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  const product: Product = await res.json();
 
  return (
    <div className="min-h-screen flex justify-center py-4 relative">
      <div className="flex flex-col gap-2 items-center md:flex-row h-[400px] bg-red-800">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-[200px] h-[200px] mb-2 md:w-[300px] md:h-[300px] object-cover rounded-md"
        />
        <div>
          <h2 className="md:text-lg font-medium mb-4">{product.name}</h2>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-sm font-medium text-gray-800/85 md:text-sm md:font-semibold">
              GMD {product.price}
            </p>
            <AddToCartButton product={product} />
          </div>

          {!product.instock && (
            <p className="text-xs md:text-sm text-red-500 mb-2">*Out of Stock</p>
          )}

          <div className="bg-green">
            <p className="text-sm font-medium mb-1">Product description</p>
            <hr className="mb-1" />
            <p className="w-80 text-xs md:text-sm">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
