import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PromoCode } from "../types";

type Selection = {
  subTypeId: string;
  quantity: number;
};

export type PackageState = {
  selections: Selection[];
  appliedPromo: { code: string; promo: PromoCode } | null;
};

const initialState: PackageState = {
  selections: [],
  appliedPromo: null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ subTypeId: string }>) => {
      const item = state.selections.find(
        (s) => s.subTypeId === action.payload.subTypeId,
      );
      if (item) {
        item.quantity += 10;
      } else {
        state.selections.push({
          subTypeId: action.payload.subTypeId,
          quantity: 10,
        });
      }
    },
    decrement: (state, action: PayloadAction<{ subTypeId: string }>) => {
      const itemIndex = state.selections.findIndex(
        (s) => s.subTypeId === action.payload.subTypeId,
      );
      if (itemIndex >= 0) {
        state.selections[itemIndex].quantity = Math.max(
          0,
          state.selections[itemIndex].quantity - 10,
        );
        if (state.selections[itemIndex].quantity === 0) {
          state.selections.splice(itemIndex, 1);
        }
      }
    },
    applyPromo: (
      state,
      action: PayloadAction<{ code: string; promo: PromoCode }>,
    ) => {
      state.appliedPromo = action.payload;
    },
    removePromo: (state) => {
      // Here the bug was the ghost promo code variable defined extra. The actual discount calculation was based on the ghost promo code variable. And it wasnt being removed in the remove promo action.
      // I thought it was ok to keep it but just nulling it out would be the fix. But realised we had to remove it actually :D I didn't want to touch it thinking it might be needed for something else but was wrong
      state.appliedPromo = null;
    },
  },
});

export const { increment, decrement, applyPromo, removePromo } =
  packageSlice.actions;
export default packageSlice.reducer;
