<template>
  <div class="min-h-screen bg-gray-50">
    <template v-if="route?.path !== '/login'">
      <!-- Header con logo Santo Tomás y navegación -->
      <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Logo y título -->
            <div class="flex items-center space-x-3">
              <img src="/Santotomas.png" alt="Santo Tomás" class="h-12 w-auto">
              <div>
                <h1 class="text-xl font-bold text-gray-900">TomasinoSpace</h1>
                <p class="text-xs text-gray-600">Sistema de Reservas</p>
              </div>
            </div>

            <!-- Navegación principal -->
            <nav class="hidden lg:flex items-center space-x-2">
              <NuxtLink
                to="/"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                <span>Dashboard</span>
              </NuxtLink>
              <NuxtLink
                to="/salas"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                <span>Buscar Sala</span>
              </NuxtLink>
              <NuxtLink
                to="/mis-reservas"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                <span>Mis Reservas</span>
              </NuxtLink>
              <NuxtLink
                to="/crud"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>CRUD</span>
              </NuxtLink>
            </nav>
            
            <!-- Acciones de usuario -->
            <div class="flex items-center space-x-3">
              <!-- Buscador -->
              <div class="relative hidden lg:block">
                <input
                  v-model="searchQuery"
                  @input="handleSearch"
                  type="text"
                  placeholder="Buscar salas..."
                  class="w-56 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <svg class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              
              <!-- Campanita de notificaciones -->
              <div class="relative">
                <button 
                  @click="showNotifications = !showNotifications"
                  class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                  <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">{{ notifications.length }}</span>
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

const searchQuery = ref('');
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

// Notificaciones (Sistema pendiente de implementar)
const notifications = ref([
  // TODO: Implementar sistema de notificaciones real
  // - Notificaciones de confirmación de reserva
  // - Recordatorios de reservas próximas
  // - Alertas de mantenimiento de salas
  // - Cancelaciones y cambios
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

// Función de búsqueda
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/salas?q=${encodeURIComponent(searchQuery.value)}`);
  }
}

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