// 'use client'
import Rice from './ricesAsync';
import { RiceSkeleton } from '../skeletons/skeletons';
import { Suspense } from 'react';

export default function RicePage() {
  return (
    <section className=" py-5 px-5 md:px-[100px]">
      <h2 className="text-sm font-medium mb-3">Rices Page</h2>
      <Suspense fallback={<RiceSkeleton />}>
        <Rice />
      </Suspense>
    </section>
  );
}
