import Hero from '@/components/hero/hero';
import AboutUs from '@/components/about-us/about';
// import Rice from '@/components/rice/rices';
import RicePage from '@/components/rice/rice';
import OilsPage from '@/components/oils/oil';
import MayyounaisesPage from '@/components/mayyounaise/mayyounaises';
import MixProductPage from '@/components/mix-product/mix-products';
import { Suspense } from 'react';
import { RiceSkeleton, MayyounaiseSkeleton } from '@/components/skeletons/skeletons';


export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<RiceSkeleton/>}>
        <RicePage />
      </Suspense>
      <Suspense fallback={<RiceSkeleton/>}>
        <OilsPage />
      </Suspense>
      <Suspense fallback={<MayyounaiseSkeleton/>}>
        <MayyounaisesPage />
      </Suspense>
      <Suspense fallback={<RiceSkeleton/>}>
        <MixProductPage />
      </Suspense> 
      <AboutUs />
    </main>
  );
}
