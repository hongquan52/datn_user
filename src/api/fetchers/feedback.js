import { API } from "../baseUrl";

export const getAllFeedback = async () => {
    try {
      const response = await API.get(`/api/v1/feedback`);
      return response;
    } catch (error) {}
};
export const getFeedbackByProduct = async (id) => {
    try {
      const response = await API.get(`/api/v1/feedback/product`, {params: {productId: id}});
      return response;
    } catch (error) {}
};
