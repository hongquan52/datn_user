import { API } from "../baseUrl";

export const getAllBrand = async () => {
    try {
      const response = await API.get(`/api/v1/brand`);
      
      return response;
    } catch (error) {}
};