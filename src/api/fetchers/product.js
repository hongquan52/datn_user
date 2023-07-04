import { API } from "../baseUrl";

// export const getAllProducts = async () => {
//   try {
//     const response = await API.get(`/api/v1/product`);
//     // const response = await API.get(`/products`)
//     return response;
//   } catch (error) {}
// };
export const getAllProducts = async () => {
    try {
      const response = await API.get(`/api/v1/product`);
      // const response = await API.get(`/products`)
      return response;
    } catch (error) {}
};

export const getHotProducts = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/bill/product/sales`);
    
    return response;
  } catch (error) {}
}

export const getProduct = async (productId) => {
  try {
    console.log(productId)
    const response = await API.get(`/api/v1/product/${productId}`);
    return response;
  } catch (error) {
    console.log(error.message);

  }
};

export const deleteProduct = async (productId) => {
  try {
    await API.delete(`/api/v1/product/${productId}`);
  } catch (error) {}
};