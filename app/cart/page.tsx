'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    const phoneNumber = '2203379597';
    let message = '🛒 *New Order*\n\n';

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name}\n   Qty: ${item.quantity}\n   Price: ${
        item.price
      } GMD\n   Subtotal: ${item.price * item.quantity} GMD\n   🔗 Image: ${
        item.image_url
      }\n\n`;
    });

    message += `💰 *Total: ${total} GMD*`;

    const encodedMsg = encodeURIComponent(message);

    const url = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMsg}`;

    const newWindow = window.open(url, '_blank');
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === 'undefined'
    ) {
      window.location.href = appUrl;
    }
  };

  return (
    <section className="p-6 min-h-screen">
      <h2 className="text-xl font-semibold text-center mb-[1.5rem]">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <div className="space-y-4 w-[90%] md:w-[80%] md:max-w-[40%] mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b p-3 rounded"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={64}
                  height={64}
                  quality={100}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-xs md:text-sm font-normal">{item.name}</p>
                  <p className="text-xs md:text-sm font-normal">
                    Price: {item.price} GMD
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-xs md:text-sm">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-10 border text-xs md:text-sm rounded px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <p className="text-xs md:text-sm font-medium md:font-semibold mb-2">
                  {item.price * item.quantity} GMD
                </p>
                <TrashIcon
                  onClick={() => removeItem(item.id)}
                  className="w-4 h-4 md:w-5 md:h-5 text-red-500 hover:text-red-600 cursor-pointer transition-all"
                />
              </div>
            </div>
          ))}
          <h2 className="text-sm md:text-xl font-medium md:font-semibold mt-4">
            Total: {total} GMD
          </h2>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-2 mt-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm md:text-base transition-all"
          >
            Buy on WhatsApp
          </button>
        </div>
      )}
    </section>
  );
}
