import MixProducts from './mix-productsAsync';
import { RiceSkeleton } from '../skeletons/skeletons';
import { Suspense } from 'react';
export default function MixProductPage() {
  return (
    <section className="py-5 px-5 md:px-[100px]">
      <h2 className="text-sm font-medium mb-3">General Products</h2>
      <Suspense fallback={<RiceSkeleton />}>
        <MixProducts />
      </Suspense>
    </section>
  );
}
