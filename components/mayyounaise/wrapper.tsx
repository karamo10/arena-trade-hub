'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from '../product-card';
import { Product } from '@/types/definition';

export default function Wrapper({ mayonnaises }: { mayonnaises: Product[] }) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={5}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={false}
      pagination={false}
      breakpoints={{
        769: { slidesPerView: 3 },
        1024: { slidesPerView: 3 },
      }}
      modules={[Autoplay, Navigation]}
      className="w-full"
    >
      {mayonnaises.map((mayonnaise) => (
        <SwiperSlide key={mayonnaise.id} className="px-0 sm:px-1">
          <ProductCard product={mayonnaise} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
