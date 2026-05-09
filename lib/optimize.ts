import { Product } from "../types";

export function optimizePackages(
  quantity: number,
  products: Product[],
): { product: Product; count: number }[] {
  // Here the bug is, we should sort the products by size in descending order, but we were sorting in ascending order.
  // This is because we want to use the largest products first, and the smallest products last. I thought it was ok to pick the smallest products first, but Im still not sure if it was the best decision.
  const sortedProducts = [...products].sort((a, b) => b.size - a.size);

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
