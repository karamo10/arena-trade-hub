"use client";

import ProductCard from '../product-card';
import { Product } from '@/data/definition';
import { useEffect, useState } from 'react';
import React from 'react';
import Slider from 'react-slick';

export default function Mayonnaises() {
  const [mayonnaises, setMayonnaises] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/products?categorie=mayonnaises')
      .then((res) => res.json())
      .then((data) => setMayonnaises(data));
  }, []);

   const settings = {
    dots: true,
    infinite: true,
    // speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section className="py-8 px-[80px] max-sm:px-4">
      <h2 className="text-sm font-medium mb-3">Mayyounaises</h2>
      <Slider {...settings} className=''>
        {mayonnaises.map((mayonnaise) => (
          <div key={mayonnaise.id} className="px-1">
             <ProductCard product={mayonnaise} />
         </div>
        ))}
      </Slider>
    </section>
  );
}
