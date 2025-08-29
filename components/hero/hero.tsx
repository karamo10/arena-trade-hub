import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-fulloverflow-hidden h-[400px]">
      <img
        src="/images/hero-img.jpg"
        alt="hero image"
        className="absolute hidden md:block w-full h-full object-cover inset-0"
      />
       {/* <img
        src="/images/heroimage.jpg"
        alt="hero image"
        className="absolute block md:hidden w-full h-full object-cover inset-0"
      /> */}
      <div className="absolute inset-0 bg-black/25 flex items-center">
        <div className="px-5 md:px-[100px] space-y-5">
          <h1 className="w-[95%]  md:w-[75%] capitalize">
            Welcome to arena trade hub logistics & supply
          </h1>
          <Link
            href={'/'}
            className="bg-indigo-950 inline-flex items-center text-white font-medium gap-1 px-2 py-0.5 text-sm rounded hover:bg-indigo-950/75 transition-all" 
          >
            How the website work
            <ArrowRightIcon className="w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
