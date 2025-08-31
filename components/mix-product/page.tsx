'use client';

import { Product } from '@/data/definition';
import ProductCard from '../product-card';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from '../slider_arrows/arrows';

export default function MixProducts() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://arena-json-server.onrender.com/products?categorie=mix')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [ {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    ]
  };

  return (
    <section className="py-8 px-[80px] max-sm:px-4">
      <h2 className="text-sm font-medium mb-3">Mixed Items</h2>
      <Slider {...settings} className="w-[90%] sm:w-[100%] mx-auto">
        {items.map((item) => (
          <div key={item.id} className="px-1">
            <ProductCard product={item} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
