import api from "./api";

export const register = (data) => api.post("/auth/register", data);

export const login = (credentials) => api.post("/auth/login", credentials);

export const logout = () => api.delete("/auth/logout");

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (payload) =>
  api.post("/auth/reset-password", payload);

export const oauthGoogle = (tokenId) =>
  api.post("/auth/google", { tokenId });
