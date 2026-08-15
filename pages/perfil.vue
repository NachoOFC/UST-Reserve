<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold mb-4">Mi Perfil</h1>
          <p class="text-blue-100 text-lg">
            Consulta la información de tu cuenta
          </p>
        </div>
      </div>

      <!-- Sin autenticación -->
      <div v-if="!user || user.anon" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tu perfil</h2>
        <p class="text-gray-600 mb-8">Necesitas estar autenticado para acceder a esta página</p>
        <button
          @click="$router.push('/login')"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ir al Login
        </button>
      </div>

      <!-- Datos del perfil -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-8 text-center">
            <div class="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
              <span class="text-white font-bold text-3xl">{{ userInitials }}</span>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-1">{{ userName }}</h2>
            <span v-if="userRole" class="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase" :class="user.role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'">
              {{ userRole }}
            </span>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Información de la cuenta</h3>
            </div>
            <div class="divide-y divide-gray-100">
              <div class="px-6 py-4 flex items-center">
                <svg class="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wider">Nombre</p>
                  <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                </div>
              </div>
              <div class="px-6 py-4 flex items-center">
                <svg class="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wider">Correo institucional</p>
                  <p class="text-sm font-medium text-gray-900">{{ userEmail }}</p>
                </div>
              </div>
              <div class="px-6 py-4 flex items-center">
                <svg class="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wider">Rol</p>
                  <p class="text-sm font-medium text-gray-900">{{ userRole }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const { user } = useAuth();

const userName = computed(() => {
  if (!user.value || user.value.anon) return 'Invitado';
  return user.value.name || 'Usuario';
});

const userEmail = computed(() => {
  if (!user.value || user.value.anon) return '';
  return user.value.email || '';
});

const userRole = computed(() => {
  if (!user.value) return '';
  if (user.value.anon) return 'Invitado';
  return user.value.role === 'admin' ? 'Administrador' : 'Estudiante';
});

const userInitials = computed(() => {
  const name = userName.value;
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';
});
</script>
