import { api } from "./api";

// uid argument pages se aata hai, par backend token se user pehchanta hai
export async function getUserProfile() {
  return api("/auth/profile");
}

export async function updateUserProfile(uid, data) {
  return api("/auth/profile", { method: "PUT", body: data });
}