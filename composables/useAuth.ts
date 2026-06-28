export const useAuth = () => {
  const user = useState('auth-user', () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  })

  const setUser = (data: Record<string, unknown> | null) => {
    user.value = data
    if (data) {
      localStorage.setItem('user', JSON.stringify(data))
    } else {
      localStorage.removeItem('user')
    }
  }

  const clearUser = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, setUser, clearUser }
}
