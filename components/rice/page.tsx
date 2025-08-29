'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../product-card';
import { Product } from '@/data/definition';
import React from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../slider_arrows/arrows';

export default function Rice() {
  const [rices, setRice] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/products?categorie=rice')
      .then((res) => res.json())
      .then((data) => setRice(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    // speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <h2 className="text-sm font-medium mb-3">Rice</h2>
      <Slider {...settings} className="">
        {rices.map((rice) => (
          <div key={rice.id} className="px-1">
            <ProductCard product={rice} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
