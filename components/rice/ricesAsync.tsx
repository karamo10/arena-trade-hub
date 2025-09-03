import { Product } from '@/types/definition';
import Wrapper from './wrapper';

async function getRices(): Promise<Product[]> {
  const res = await fetch(
    'https://arena-json-server.onrender.com/products?categorie=rice',
    {
      cache: 'no-cache',
    }
  );
  return res.json();
}

export default async function Rices() {
  const rices = await getRices();

  return (
    <section className="">
      <Wrapper rices={rices} />
    </section>
  );
}
