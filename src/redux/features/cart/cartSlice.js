import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.cartItems);
      console.log(action.payload._id);
      const isExisting = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!isExisting) {
        state.cartItems.push(action.payload);
        toast.success("Item Status", {
          description: "Item added Successful!",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      } else {
        toast.success("Item Status", {
          description: "Item already added !",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// expor the actions

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
