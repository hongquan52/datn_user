import { API } from '../baseUrl'

export const getAllProductType = async () => {
    try {
        const response = await API.get(`/api/v1/category`);
        return response;
    }
    catch (error) {
    }
}
