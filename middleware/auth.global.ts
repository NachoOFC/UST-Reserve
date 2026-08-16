export default defineNuxtRouteMiddleware((to) => {
  // La sesión vive solo en localStorage (cliente). En el servidor no hay sesión.
  if (import.meta.server) {
    return
  }

  const { user } = useAuth()
  const isRealUser = !!user.value && !user.value.anon

  const loginRedirect = () => `/login?redirect=${encodeURIComponent(to.fullPath)}`

  if (to.path === '/login') {
    if (isRealUser) {
      return navigateTo('/')
    }
    return
  }

  // /crud: solo administradores
  if (to.path === '/crud') {
    if (isRealUser && user.value.role === 'admin') {
      return
    }
    if (isRealUser) {
      return navigateTo('/')
    }
    return navigateTo(loginRedirect())
  }

  // Rutas que requieren sesión (usuario real, no invitado)
  const protectedPaths = ['/reserve', '/mis-reservas', '/perfil', '/configuracion']
  if (protectedPaths.includes(to.path) && !isRealUser) {
    return navigateTo(loginRedirect())
  }
})
