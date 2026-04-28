export type PackageSize = 10 | 20 | 30;

export type Product = {
  id: string;
  size: PackageSize;
  price: number;
};

export type SubType = {
  id: string;
  name: string;
  products: Product[];
};

export type ProductType = {
  id: string;
  name: string;
  tab: 'menstrual' | 'daily';
  subTypes: SubType[];
};

export type PromoCode =
  | { type: 'percentage'; value: number }
  | { type: 'fixed'; value: number }
  | { type: 'freeShipping' };


