import { Product } from '@/types/definition';
import Wrapper from './wrapper';
import { Suspense } from 'react';
import { RiceSkeleton } from '../skeletons/skeletons';

async function getMixProduct(): Promise<Product[]> {
  const res = await fetch("https://arena-json-server.onrender.com/products?categorie=mix", {
    cache: 'no-cache'
  })
  return res.json();
}

export default async function MixProducts() {
  const items = await getMixProduct();

  return (
    <section className="">
      <Suspense fallback={<RiceSkeleton />}>
        <Wrapper items={items} />
      </Suspense>
    </section>
  )
}
