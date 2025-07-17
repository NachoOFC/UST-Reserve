<template>
  <div class="min-h-screen bg-gray-50">
    <template v-if="route?.path !== '/login'">
      <!-- Header con logo Santo Tomás y navegación -->
      <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-24">
            <!-- Logo Santo Tomás y navegación -->
            <div class="flex items-center space-x-8">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-3">
                  <img src="/Santotomas.png" alt="Santo Tomás" class="h-14 w-auto">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-900">TomasinoSpace</h1>
                    <p class="text-sm text-gray-600">Sistema de Reservas</p>
                  </div>
                </div>
              </div>
              <!-- Navegación principal -->
              <nav class="hidden md:flex space-x-1">
                <NuxtLink
                  to="/"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium text-gray-600 hover:bg-gray-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"/></svg>
                  <span>Dashboard</span>
                </NuxtLink>
                <NuxtLink
                  to="/salas"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium text-gray-600 hover:bg-gray-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  <span>Buscar Sala</span>
                </NuxtLink>
                <NuxtLink
                  to="/crud"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                  <span>CRUD</span>
                </NuxtLink>
              </nav>
            </div>
            
            <!-- Buscador y acciones -->
            <div class="flex items-center space-x-4">
              <div class="relative">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  v-model="searchTerm"
                  type="text"
                  placeholder="Buscar salas..."
                  class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <!-- Campanita de notificaciones -->
              <div class="relative">
                <button 
                  @click="showNotifications = !showNotifications"
                  class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75l-2.25 2.25V19.5h12.5V15.75L16.5 13.5V9.75a6 6 0 00-6-6z"/>
                  </svg>
                  <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <!-- Dropdown de notificaciones -->
                  <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div class="px-4 py-2 border-b border-gray-100">
                      <h3 class="font-semibold text-gray-900">Notificaciones</h3>
                    </div>
                  <div v-if="notifications.length === 0" class="px-4 py-3 text-center text-gray-500">
                    No hay notificaciones nuevas
                  </div>
                  <div v-else>
                    <div 
                      v-for="notification in notifications" 
                      :key="notification.id"
                      class="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                      @click="handleNotificationClick(notification)"
                    >
                      <div class="flex items-start space-x-3">
                        <div :class="[
                           'w-2 h-2 rounded-full mt-2',
                           notification.type === 'success' ? 'bg-green-500' :
                           notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                         ]"></div>
                        <div class="flex-1">
                          <p class="text-sm text-gray-900">{{ notification.message }}</p>
                          <p class="text-xs text-gray-500 mt-1">hace {{ notification.time }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Perfil de usuario -->
              <div class="relative">
                <button 
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-sm">{{ userInitials }}</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <!-- Dropdown del perfil -->
                  <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div class="px-4 py-2 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                    <p class="text-xs text-gray-500" v-if="userEmail">{{ userEmail }}</p>
                  </div>
                  <button 
                    @click="goToProfile"
                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Mi perfil
                  </button>
                  <button 
                    @click="goToReservations"
                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Mis reservas
                  </button>
                  <button 
                    @click="goToSettings"
                    class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Configuración
                  </button>
                  <hr class="my-2" />
                  <button 
                    @click="logout"
                    class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </main>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const searchTerm = ref('');
const showNotifications = ref(false);
const showUserMenu = ref(false);

// Datos del usuario
const userName = ref('');
const userEmail = ref('');
const userInitials = computed(() => {
  if (!userName.value) return 'E';
  return userName.value
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'E';
});

// Notificaciones
const notifications = ref([
  { id: 1, type: 'success', message: 'Reserva confirmada para mañana 14:00', time: '5 min' },
  { id: 2, type: 'info', message: 'Nueva sala disponible en Edificio D', time: '1 hora' },
  { id: 3, type: 'warning', message: 'Mantenimiento programado Sala A101', time: '2 horas' }
]);

const router = useRouter();
const route = useRoute();

function setUserFromStorage() {
  if (typeof window === 'undefined') return;
  const userStr = localStorage.getItem('user');
  if (!userStr && (route?.path || '') !== '/login') {
    router.push('/login');
    userName.value = '';
    userEmail.value = '';
    return;
  }
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.anon) {
        userName.value = 'ESTUDIANTE';
        userEmail.value = '';
      } else {
        userName.value = user.name || 'Usuario';
        userEmail.value = user.email || '';
      }
    } catch {
      userName.value = 'ESTUDIANTE';
      userEmail.value = '';
    }
  }
}

onMounted(() => {
  setUserFromStorage();
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', setUserFromStorage);
  }
});

watchEffect(() => {
  if (typeof window !== 'undefined') {
    setUserFromStorage();
  }
});

// Funciones del perfil
function goToProfile() {
  showUserMenu.value = false;
  // Aquí puedes agregar navegación al perfil
  console.log('Ir al perfil');
}

function goToReservations() {
  showUserMenu.value = false;
  // Aquí puedes agregar navegación a reservas
  console.log('Ir a reservas');
}

function goToSettings() {
  showUserMenu.value = false;
  // Aquí puedes agregar navegación a configuración
  console.log('Ir a configuración');
}

function logout() {
  showUserMenu.value = false;
  localStorage.removeItem('user');
  setUserFromStorage();
  router.push('/login');
}

// Funciones de notificaciones
function handleNotificationClick(notification) {
  showNotifications.value = false;
  console.log('Notificación clickeada:', notification);
  // Aquí puedes agregar lógica específica para cada tipo de notificación
}
</script>

<style scoped>
</style> 