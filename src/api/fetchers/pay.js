import { API } from "../baseUrl";

export const pay = async (formData) => {
  try {
    const response = await API.post("/api/v1/order/pay", formData);
    return response;
  } catch (error) {}
};

