import { API, APII } from "../baseUrl";


export const getAddressByUser = async (userId) => {
  try {
    const response = await API.get(`/api/v1/address/user?userId=${userId}`);
    return response;
  } catch (error) {
    console.log(error.message); 
  }
};
export const deleteAddressDetail = async (userId, addressId) => {
  try {
    const response = await API.delete(`api/v1/address/user`, {params: {userId: userId, addressId: addressId}});
    return response;
  } catch (error) {
    console.log(error.message); 
  }
};