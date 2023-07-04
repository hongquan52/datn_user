import { API } from "../baseUrl";

const userID = sessionStorage.getItem("userID");
console.log("userID in cart.js: ", userID);
export const getCart = async () => {
    try {
      const response = await API.get(`/api/v1/cart/user`, {params: {userId: userID }});
      
      return response;
    } catch (error) {}
  }
export const getProductInCart = async (id) => {
  try {
    const response = await API.get(`/api/v1/cart/product`, {params: {cartId: id }});
    
    return response;
  } catch (error) {}
}

export const updateCart = async (uid) => {
    try {
      const response = await API.put(`localhost:3000/api/v1/cart/${uid}`);
      
      return response;
    } catch (error) {}
}

export const deleteCart = async (productId, cartId) => {
  try {
    await API.delete(`/api/v1/cart/product`, {params: {cartId: cartId, productId: productId}});
  } catch (error) {}
};