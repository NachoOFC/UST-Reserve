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
          <input v-model="password" type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Contraseña" required />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-green-700 text-white font-bold py-2 rounded hover:bg-green-800 transition">Entrar</button>
      </form>
      <div class="mt-6 flex flex-col items-center">
        <span class="text-gray-500 mb-2">o</span>
        <button @click="loginAnon" class="w-full bg-gray-200 text-green-800 font-semibold py-2 rounded hover:bg-green-100 transition">Entrar como invitado</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

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
      // Guardar nombre y email explícitamente
      localStorage.setItem('user', JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      }))
      router.push('/')
    } else {
      error.value = data.error || 'Error al iniciar sesión'
    }
  } catch (e) {
    error.value = 'Error de red o del servidor'
  }
}

const loginAnon = () => {
  localStorage.setItem('user', JSON.stringify({ anon: true }))
  router.push('/')
}
</script>

<style scoped>
body {
  background: #f0fdf4;
}
</style> 