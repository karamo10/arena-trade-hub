import { Product } from '@/types/definition';
import Wrapper from './wrapper';
import { Suspense } from 'react';
import { MayyounaiseSkeleton } from '../skeletons/skeletons';

async function getMayyounaises(): Promise<Product[]> {
  const res = await fetch(
    'https://arena-json-server.onrender.com/products?categorie=mayonnaises',
    {
      cache: 'no-store',
    }
  );
  return res.json();
}

export default async function Mayonnaises() {
  const mayonnaises = await getMayyounaises();

  return (
    <section className="">
      <Suspense fallback={<MayyounaiseSkeleton />}>
        <Wrapper mayonnaises={mayonnaises} />
      </Suspense>
    </section>
  );
}
