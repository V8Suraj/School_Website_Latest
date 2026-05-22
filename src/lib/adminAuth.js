const ADMIN_CREDENTIALS_KEY = "admin-credentials";
export const ADMIN_SECRET_KEY = "VIDYALAYA-ADMIN-2026";

export const getAdminCredentials = () => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.name || !parsed?.email || !parsed?.password) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const isAdminRegistered = () => getAdminCredentials() !== null;

export const saveAdminCredentials = (credentials) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
};

export const validateAdminLogin = (email, password) => {
  const credentials = getAdminCredentials();
  if (!credentials) return false;

  return credentials.email.toLowerCase() === email.toLowerCase() && credentials.password === password;
};