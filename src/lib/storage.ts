export function storageGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function storageSet<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function storageClear(key: string): void {
  localStorage.removeItem(key)
}
