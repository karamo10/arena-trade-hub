import Hero from '@/components/hero/hero';
import AboutUs from '@/components/about-us/about';
import Rice from '@/components/rice/page';
import VegOil from '@/components/oils/page';
import Mayonnaises from '@/components/mayyounaise/page';
import MixProducts from '@/components/mix-product/page';
import { Suspense } from 'react';


export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<h1 className='text-red text-6xl'>Loading...</h1>}>
        <Rice />
      </Suspense>
      <Suspense fallback={<h1 className='text-red text-xl'>Loading...</h1>}>
        <VegOil />
      </Suspense>
      <Suspense fallback={<h1 className='text-red text-xl'>Loading...</h1>}>
        <Mayonnaises />
      </Suspense>
      <Suspense fallback={<h1 className='text-red text-xl'>Loading...</h1>}>
        <MixProducts />
      </Suspense> 
      <AboutUs />
    </main>
  );
}
