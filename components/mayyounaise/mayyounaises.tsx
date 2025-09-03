import { MayyounaiseSkeleton } from '../skeletons/skeletons';
import Mayonnaises from './mayyoAsync';
import { Suspense } from 'react';

export default function MayyounaisesPage() {
  return (
    <section className=" py-5 px-5 md:px-[100px]">
      <h2 className="text-sm font-medium mb-3">Mayonnaises</h2>
      <Suspense fallback={<MayyounaiseSkeleton />}>
        <Mayonnaises />
      </Suspense>
    </section>
  );
}
