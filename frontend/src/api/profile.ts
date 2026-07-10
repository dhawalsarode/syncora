import api from "./client";

export const updateProfile = (name: string) =>
  api.patch("/auth/profile", { name });

export const changePassword = (
  currentPassword: string,
  newPassword: string
) =>
  api.patch("/auth/password", {
    currentPassword,
    newPassword,
  });