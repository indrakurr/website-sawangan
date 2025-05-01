import api from "./api";

export const getProfile = () => api.get("/profile");

export const updateProfile = (data) => api.patch("/profile", data);

export const changePassword = (data) =>
  api.patch("/profile/change-password", data);

export const uploadPhoto = (formData) =>
  api.post("/profile/upload-photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
