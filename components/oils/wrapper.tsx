'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Product } from '@/types/definition';
import ProductCard from '../product-card';

export default function Wrapper({ oils }: { oils: Product[] }) {
  

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={5}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      navigation={true}
      pagination={false}
      breakpoints={{
        769: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      modules={[Autoplay, Navigation]}
      className="w-full">
      {oils.map((oil) => (
        <SwiperSlide key={oil.id} className="px-0 sm:px-1">
          <ProductCard product={oil} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
