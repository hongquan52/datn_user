import { API, APII } from "../baseUrl";

export const getAllUSers = async () => {
  try {
    const response = await API.get(`/users`);
    return response;
  } catch (error) { }
};
export const getUSer = async (userId) => {
  try {
    const response = await API.get(`/api/v1/user/${userId}`);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
// export const getUSer = async (userId) => {
//     try {
//       const response = await API.get(`/users/${userId}`);
//       return response;
//     } catch (error) {
//       console.log(error.message);
//     }
// };
export const createUser = async (formData) => {
  try {
    const response = await API.post("/api/v1/customer", formData);
    return response;
  } catch (error) {}
};
export const updateUSer = async (userId, updateUser) => {
  try {
    const response = await API.put(`/users/${userId}`, updateUser);
    return response;
  } catch (error) { }
};

export const login = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);
    return response;
  } catch (error) {
    console.log("Login error: ",error);
  }
};

// axios.post('https://example.com/postSomething', {
//  email: varEmail,
//  password: varPassword
// },
// {
//   headers: {
//     Authorization: 'Bearer ' + varToken
//   }
// })

