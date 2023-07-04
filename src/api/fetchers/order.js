import { API } from "../baseUrl";

const userID = sessionStorage.getItem("userID")

export const getAllOrder = async () => {
    try {
      const response = await API.get(`/api/v1/bill/user`, {params: {userId: userID}});
      
      
      return response;
    } catch (error) {}
  }
  export const getOrder = async (billId) => {
    try {
      const response = await API.get(`/api/v1/bill/product`, {params: {billId: billId}});
      
      
      return response;
    } catch (error) {}
  }
export const getDelivery = async (billId) => {
  try {
    const response = await API.get(`/api/v1/delivery/bill`, {params: {billId: billId}});
    
    
    return response;
  } catch (error) {}
}




