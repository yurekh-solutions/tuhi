export const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "tuhi2026";

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("admin_token");
  return token === "authenticated";
}

export function setAdminAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", "authenticated");
}

export function clearAdminAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
}
