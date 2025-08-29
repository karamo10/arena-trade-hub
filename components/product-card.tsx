import { Product } from '@/data/definition';
import Link from 'next/link';

export default function ProductCard({ product }: {product: Product}) {
  return (
    <Link href={`/products/${product.id}`} className="flex items-center flex-col md:flex-row py-1 bg-white shadow-lg rounded relative">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover bg-neutral-800"
      />
      <div className="text-center px-2">
        <p className="text-xs md:text-sm font-light capitalize">{product.name}</p>
        <span className="text-xs md:text-sm md:font-semibold mt-1">GMD{product.price}</span>
      </div>
      <span className={`text-[10px] md:text-xs font-semibold absolute top-0 right-1 ${product.instock ? "" : "text-red-500"} `}>{product.instock ? "" : "*out of stock"}</span>
    </Link>
  );
}
