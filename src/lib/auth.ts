export const AUTH_STORAGE_KEY = "voltops-auth"
export const DEMO_EMAIL = "nina.v@example.com"
export const DEMO_PASSWORD = "demo123"

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true"
}

export function setAuthenticated(value: boolean) {
  if (value) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true")
    return
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}
