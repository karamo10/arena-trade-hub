import Hero from '@/components/hero/hero';
import AboutUs from '@/components/about-us/about';
import Rice from '@/components/rice/page';
import VegOil from '@/components/oils/page';
import Mayonnaises from '@/components/mayyounaise/page';
import MixProducts from '@/components/mix-product/page';


export default function Home() {
  return (
    <main>
      <Hero />
      <Rice />
      <VegOil />
      <Mayonnaises />
      <MixProducts />
      <AboutUs />
    </main>
  );
}
