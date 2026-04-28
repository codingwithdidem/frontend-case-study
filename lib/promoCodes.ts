import { PromoCode } from '../types';

export const PROMO_CODES: Record<string, PromoCode> = {
  BEIJE20: { type: 'percentage', value: 20 },
  FLAT50: { type: 'fixed', value: 50 },
  KARGO: { type: 'freeShipping' },
};
