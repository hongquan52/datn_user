import { createSlice } from '@reduxjs/toolkit'



const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // =========== add item ============
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.uid === newItem.uid
      );
      state.totalQuantity++;

      if (!existingItem) {
        // ===== note: if you use just redux you should not mute state array instead of clone the state array, but if you use redux toolkit that
        // will not a problem because redux toolkit clone the array behind the scene

        //
        
        //
        state.cartItems.push({
          uid: newItem.uid,
          name: newItem.name,
          image: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,

        });

      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        // initial value = 0
        0
      );
      //

      //
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    removeItem(state, action) {
      const uid = action.payload;
      const existingItem = state.cartItems.find((item) => item.uid === uid);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.uid !== uid);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
      
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const uid = action.payload;
      const existingItem = state.cartItems.find((item) => item.uid === uid);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.uid !== uid);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
  },
});

export const cartActions = cartSlice.actions
export default cartSlice