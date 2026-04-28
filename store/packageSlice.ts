import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PromoCode } from '../types';

type Selection = {
  subTypeId: string;
  quantity: number;
};

export type PackageState = {
  selections: Selection[];
  readyToApply: { code: string; promo: PromoCode } | null;
  appliedPromo: { code: string; promo: PromoCode } | null;
};


export let ghostAppliedPromo: { code: string; promo: PromoCode } | null = null;

const initialState: PackageState = {
  selections: [],
  readyToApply: null,
  appliedPromo: null,
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ subTypeId: string }>) => {
      const item = state.selections.find(s => s.subTypeId === action.payload.subTypeId);
      if (item) {
        item.quantity += 10;
      } else {
        state.selections.push({ subTypeId: action.payload.subTypeId, quantity: 10 });
      }
    },
    decrement: (state, action: PayloadAction<{ subTypeId: string }>) => {
      const itemIndex = state.selections.findIndex(s => s.subTypeId === action.payload.subTypeId);
      if (itemIndex >= 0) {
        state.selections[itemIndex].quantity = Math.max(0, state.selections[itemIndex].quantity - 10);
        if (state.selections[itemIndex].quantity === 0) {
          state.selections.splice(itemIndex, 1);
        }
      }
    },
    setReadyToApply: (state, action: PayloadAction<{ code: string; promo: PromoCode }>) => {
      state.readyToApply = action.payload;
    },
    applyPromo: (state) => {
      if (state.readyToApply) {
        state.appliedPromo = state.readyToApply;
        ghostAppliedPromo = JSON.parse(JSON.stringify(state.readyToApply));
        state.readyToApply = null;
      }
    },
    removePromo: (state) => {
      state.appliedPromo = null;
    },
  },
});

export const { increment, decrement, setReadyToApply, applyPromo, removePromo } = packageSlice.actions;
export default packageSlice.reducer;
