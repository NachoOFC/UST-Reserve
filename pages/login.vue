<template>
  <div class="min-h-screen flex items-center justify-center bg-green-50">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border-t-8 border-green-700">
      <div class="flex flex-col items-center mb-6">
        <img src="/Santotomas.png" alt="Santo Tomás" class="h-16 mb-2" />
        <h1 class="text-2xl font-bold text-green-800 mb-1">Acceso a Salas de Estudio</h1>
        <p class="text-green-700 text-sm">Universidad Santo Tomás</p>
      </div>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-green-900 font-semibold mb-1">Correo institucional</label>
          <input v-model="email" type="email" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="usuario@alumnos.santotomas.cl" required />
        </div>
        <div>
          <label class="block text-green-900 font-semibold mb-1">Contraseña</label>
          <div class="relative">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" class="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Contraseña" required />
            <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-green-700 transition" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-green-700 text-white font-bold py-2 rounded hover:bg-green-800 transition">Entrar</button>
      </form>
      <div class="mt-6 flex flex-col items-center">
        <span class="text-gray-500 mb-2">o</span>
        <button @click="loginAnon" class="w-full bg-gray-200 text-green-800 font-semibold py-2 rounded hover:bg-green-100 transition">Seguir como invitado</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const router = useRouter()
const route = useRoute()

const { setUser } = useAuth()

const getSafeRedirect = () => {
  const r = route.query.redirect
  if (typeof r === 'string' && r.startsWith('/') && !r.startsWith('//')) {
    return r
  }
  return '/'
}

const login = async () => {
  error.value = ''
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    const data = await res.json()
    if (data.user) {
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || 'user',
        anon: false
      })
      router.push(getSafeRedirect())
    } else {
      error.value = data.error || 'Error al iniciar sesión'
    }
  } catch (e) {
    error.value = 'Error de red o del servidor'
  }
}

const protectedPaths = ['/reserve', '/mis-reservas', '/perfil', '/configuracion', '/crud']

const loginAnon = () => {
  setUser({
    anon: true,
    name: 'Invitado',
    email: null,
    role: 'guest'
  })
  const target = getSafeRedirect()
  router.push(protectedPaths.includes(target) ? '/' : target)
}
</script>

<style scoped>
body {
  background: #f0fdf4;
}
</style> 