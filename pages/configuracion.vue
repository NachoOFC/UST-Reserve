<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold mb-4">Configuración</h1>
          <p class="text-blue-100 text-lg">
            Personaliza tu experiencia en la aplicación
          </p>
        </div>
      </div>

      <!-- Sin autenticación -->
      <div v-if="!user || user.anon" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para cambiar la configuración</h2>
        <p class="text-gray-600 mb-8">Necesitas estar autenticado para acceder a esta página</p>
        <button
          @click="$router.push('/login')"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ir al Login
        </button>
      </div>

      <!-- Configuración -->
      <div v-else class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">Preferencias</h3>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="px-6 py-4 flex items-center justify-between">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Notificaciones</p>
                  <p class="text-xs text-gray-500">Recibir avisos sobre mis reservas</p>
                </div>
              </div>
              <button
                @click="notificationsEnabled = !notificationsEnabled"
                class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors"
                :class="notificationsEnabled ? 'bg-emerald-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block w-4 h-4 transform rounded-full bg-white transition-transform"
                  :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>

            <div class="px-6 py-4 flex items-center justify-between">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Recordatorios</p>
                  <p class="text-xs text-gray-500">Recibir recordatorios antes de una reserva</p>
                </div>
              </div>
              <button
                @click="remindersEnabled = !remindersEnabled"
                class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors"
                :class="remindersEnabled ? 'bg-emerald-600' : 'bg-gray-300'"
              >
                <span
                  class="inline-block w-4 h-4 transform rounded-full bg-white transition-transform"
                  :class="remindersEnabled ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const { user } = useAuth();

const readPreference = (key, fallback) => {
  if (process.client) {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored === 'true' : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const notificationsEnabled = ref(readPreference('pref-notifications', true));
const remindersEnabled = ref(readPreference('pref-reminders', true));

watch(notificationsEnabled, (value) => {
  if (process.client) localStorage.setItem('pref-notifications', String(value));
});

watch(remindersEnabled, (value) => {
  if (process.client) localStorage.setItem('pref-reminders', String(value));
});
</script>
