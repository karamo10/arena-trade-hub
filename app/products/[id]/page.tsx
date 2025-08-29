import data from '@/data/products.json';
import { Product } from '@/data/definition';
import AddToCartButton from '@/components/button/add-to-cart-';

const products: Product[] = data.products;

// Generate static params from products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

interface ProductPageComponentProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageComponentProps) {
  // 👇 Await the params because it's now typed as Promise
  const { id } = await params;

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

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
