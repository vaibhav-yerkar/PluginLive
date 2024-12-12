import axios from "axios";

export const getToken = () => localStorage.getItem("authToken");

export const uploadVideoToS3 = async (file) => {
  const token = getToken();
  const { data: presignedUrl } = await axios.post("/api/upload", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await axios.put(presignedUrl, file, {
    headers: { "Content-Type": file.type },
  });
  return { videoUrl: presignedUrl.split("?")[0] };
};

export const fetchHistory = async (token) =>
  await axios.get("/api/reports", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchReport = async (id, token) =>
  await axios.get(`/api/reports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// export const loginUser = async (formData) => {
//   const response = await axios.post("/api/login", formData, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };

// export const signupUser = async (formData) => {
//   const response = await axios.post("/api/signup", formData, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return response.data;
// };
