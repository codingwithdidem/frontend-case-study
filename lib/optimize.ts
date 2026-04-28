import { Product } from '../types';

export function optimizePackages(quantity: number, products: Product[]): { product: Product; count: number }[] {

  const sortedProducts = [...products].sort((a, b) => a.size - b.size);
  
  let remaining = quantity;
  const result: { product: Product; count: number }[] = [];

  for (const product of sortedProducts) {
    const count = Math.floor(remaining / product.size);
    if (count > 0) {
      result.push({ product, count });
      remaining %= product.size;
    }
  }

  return result;
}
