'use client';

import { useEffect, useState } from 'react';
import {getProductById, updateProduct } from '@/services/api';
import { Product } from '@/types/product-data';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
const categ = [
  { id: 1, name: 'oil' },
  { id: 1, name: 'rice' },
  { id: 1, name: 'general' },
];

export default async function EditProduct({params}: {params: {id: number}}) {
  // const [image, setImage] = useState(null);

  return (
    <div className="w-full ml-0 sm:w-3/12 sm:ml-[2rem] mb-10 ">
      {/* <h2 className="text-xl font-semibold">Edit produt</h2> */}
      <div className="mt-3 w-[90%] mx-auto px-2">
        <div className="mb-4">
          <p className="text-lg font-medium mb-3">Upload image</p>
          <label htmlFor="image" className="text-lg font-medium cursor-pointer">
            {/* <Image
              src={
                image
                  ? URL.createObjectURL(image)
                  : '/images/upload_areas/upload-area.png'
              }
              alt="image uploader"
              width={40}
              height={40}
            /> */}
          </label>
          <input
            // onChange={}}
            id="image"
            name="image"
            type="file"
            required
            hidden
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="text-lg font-medium">
            Product name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Eg: 1 litre cooking oil"
            className="p-4 w-full mt-3 rounded  bg-neutral-50 outline outline-blue-950/95"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-lg font-medium">
            Product price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter GMD amount"
            step="0.05"
            className="p-4 w-full mt-3 rounded  bg-neutral-50 outline outline-blue-950/95"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-lg font-medium">
            Product description
          </label>
          <input
            id="description"
            name="description"
            placeholder="Add description about this product"
            type="text"
            className="p-4 w-full mt-3 rounded bg-neutral-50 outline outline-blue-950/95"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="text-lg font-medium">
            Product category
          </label>
          <select
            name="categories"
            id="categories"
            className="block bg-neutral-50 outline outline-blue-950/95 p-4 mt-3 rounded "
          >
            <option value="" disabled className="">
              Select a category
            </option>
            {categ.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <label htmlFor="instock" className="text-lg font-medium mr-2">
            Instock
          </label>
          <input id="instock" name="instock" type="checkbox" value="instock" className="appearance-none w-5 h-5 border-2 border-blue-950/95 checked:bg-indigo-950/95 rounded-full" />
          </div>
        </div>
        <button type="submit" className="bg-green-900 text-white px-4 py-2 font-medium rounded cursor-pointer">Update</button>
      </div>
    </div>
  );
}
