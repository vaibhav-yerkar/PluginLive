export const saveToken = (token) => localStorage.setItem("authToken", token);
export const saveUserName = (userName) =>
  localStorage.setItem("userName", userName);
export const getToken = () => localStorage.getItem("authToken");
export const getUserName = () => localStorage.getItem("userName");
export const removeToken = () => localStorage.removeItem("authToken");
export const isAuthenticated = () => !!getToken();
