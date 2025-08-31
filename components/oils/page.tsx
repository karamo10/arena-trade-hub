'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../product-card';
import { Product } from '@/data/definition';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../slider_arrows/arrows';


export default function VegOil() {
  const [oils, setOils] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://arena-json-server.onrender.com/products?categorie=oil')
      .then((res) => res.json())
      .then((data) => setOils(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-8 px-[80px] max-sm:px-4">
      <h2 className="text-sm font-medium mb-3">Veg Oils</h2>
      <Slider {...settings} className="relative w-[90%] sm:w-[100%] mx-auto">
        {oils.map((oil) => (
          <div key={oil.id} className="px-1">
            <ProductCard product={oil} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
