import { Product } from '@/types/product-data';
import { User } from '@/types/user-type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// console.log("API_URL:", API_URL);

async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function register(name: string, email: string, password: string) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// Products
export async function getProducts(): Promise<Product[]> {
  return request('/products');
}

// get products by it categories
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return request(`/products?categories=${category}`);
}

// get productBySlug
export async function getProductBySlug(slug: string): Promise<Product> {
  return request(`/products/${slug}`);
}

export async function getProductById(id: number): Promise<Product> {
    return request(`/products/${id}`);
}

export async function createProduct(
  product: Omit<Product, 'id'> & { image: File },
  token: string
): Promise<Product> {
  const fd = new FormData();
  fd.append('name', product.name);
  fd.append('price', String(product.price));
  fd.append('categories', product.categories || 'general');
  fd.append('description', product.description || '');
  fd.append('instock', String(product.instock ?? true));
  fd.append('image', product.image);

  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function updateProduct(
  id: number,
  product: Partial<Product> & { image?: File },
  token: string
): Promise<Product> {
  const fd = new FormData();

  if (product.name) fd.append('name', product.name);
  if (product.price) fd.append('price', String(product.price));
  if (product.categories) fd.append('categories', product.categories);
  if (product.description) fd.append('description', product.description);
  fd.append('instock', String(product.instock ?? true));
  if (product.image) fd.append('image', product.image);

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
  // return request(`/products/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //         Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(product),
  // });
}

export async function deleteProduct(
  id: number,
  token: string
): Promise<{ message: string }> {
  return request(`/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// export async function createAdmin(name: string, email: string, password: string, token: string) {
//     return request("/auth/create-admin", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({name, email, password}),
//     })
// }
