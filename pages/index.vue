<template>
  <div class="min-h-screen bg-gray-50">
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
              <button
                v-for="item in navItems"
                :key="item.id"
                @click="activeView = item.id"
                :class="activeView === item.id
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-100'"
                class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <component :is="item.icon" class="w-4 h-4" />
                <span>{{ item.label }}</span>
              </button>
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
                  <p class="text-xs text-gray-500">{{ userEmail }}</p>
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

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard -->
      <div v-if="activeView === 'dashboard'" class="space-y-8">
        <!-- Hero section mejorado -->
        <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
          <div class="max-w-3xl">
            <h1 class="text-4xl font-bold mb-4">Bienvenido a TomasinoSpace</h1>
            <p class="text-emerald-100 text-lg mb-6">
              Sistema integral de gestión de salas de estudio con tecnología GPS 360° 
              para la Universidad Santo Tomás
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/reserve" class="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                Reservar Ahora
              </NuxtLink>
              <button @click="activeView = 'rooms'" class="border border-emerald-200 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                Explorar Salas
              </button>
            </div>
          </div>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Salas Disponibles</p>
                <p class="text-2xl font-bold text-gray-900">{{ rooms.length }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Reservas Activas</p>
                <p class="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Ocupación Promedio</p>
                <p class="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Salas destacadas -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Salas Destacadas</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" />
          </div>
        </div>
      </div>

      <!-- Vista Salas -->
      <div v-if="activeView === 'rooms'" class="space-y-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Salas Disponibles</h1>
          <div class="flex items-center space-x-4">
            <button class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
              </svg>
              <span>Filtros</span>
            </button>
            <button class="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Vista GPS 360°</span>
            </button>
          </div>
        </div>
        <!-- Indicador de carga -->
        <div v-if="isLoadingRooms" class="text-center py-12">
          <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-emerald-600">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando salas...
          </div>
        </div>
        <!-- Salas disponibles -->
        <div v-else-if="filteredRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoomCard v-for="room in filteredRooms" :key="room.id" :room="room" />
        </div>
        <!-- Sin salas -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
          <p class="text-gray-500 mb-2">No hay salas disponibles</p>
          <p class="text-sm text-gray-400">Crea una sala desde el panel de administración</p>
        </div>
      </div>

      <!-- Vista CRUD -->
      <div v-if="activeView === 'crud'">
        <CrudView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CrudView from '~/components/CrudView.vue';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z\'/><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width="2" d=\'M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z\'/></svg>' } },
  { id: 'rooms', label: 'Salas', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4\'/></svg>' } },
  { id: 'crud', label: 'CRUD', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M12 4v16m8-8H4\'/></svg>' } }
];

const activeView = ref('dashboard');
const searchTerm = ref('');
const showNotifications = ref(false);
const showUserMenu = ref(false);

// Datos del usuario
const userName = ref('Luis Estudiante');
const userEmail = ref('luis.estudiante@ust.cl');
const userInitials = computed(() => {
  return userName.value.split(' ').map(n => n[0]).join('').toUpperCase();
});

// Notificaciones
const notifications = ref([
  { id: 1, type: 'success', message: 'Reserva confirmada para mañana 14:00', time: '5 min' },
  { id: 2, type: 'info', message: 'Nueva sala disponible en Edificio D', time: '1 hora' },
  { id: 3, type: 'warning', message: 'Mantenimiento programado Sala A101', time: '2 horas' }
]);

// Salas desde la base de datos
const rooms = ref([]);
const isLoadingRooms = ref(true);

async function fetchRooms() {
  try {
    const res = await fetch('/api/study-rooms');
    if (res.ok) {
      rooms.value = await res.json();
    } else {
      console.error('Error fetching rooms:', res.status);
      rooms.value = [];
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    rooms.value = [];
  } finally {
    isLoadingRooms.value = false;
  }
}

onMounted(fetchRooms);

const filteredRooms = computed(() =>
  rooms.value.filter(room =>
    room.name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    String(room.number).includes(searchTerm.value)
  )
);

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
  // Aquí puedes agregar lógica de logout
  console.log('Cerrar sesión');
}

// Funciones de notificaciones
function handleNotificationClick(notification) {
  showNotifications.value = false;
  console.log('Notificación clickeada:', notification);
  // Aquí puedes agregar lógica específica para cada tipo de notificación
}

// RoomCard como componente local mejorado
const RoomCard = {
  props: ['room'],
  template: `
    <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between h-full">
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-bold text-gray-900">{{ room.name }}</h3>
            <span class="px-3 py-1 rounded-full text-sm font-medium"
              :class="room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ room.available ? 'Disponible' : 'Ocupada' }}
            </span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6M9 11h6M9 15h6"/>
            </svg>
            <span class="text-sm">N°: {{ room.number }}</span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="text-sm">Capacidad: {{ room.capacity }} personas</span>
          </div>
          <div class="text-gray-500 text-sm mb-2" v-if="room.description">{{ room.description }}</div>
        </div>
        <div class="mt-4 flex space-x-2">
          <NuxtLink 
            :to="'/reserve'"
            class="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center"
          >
            Reservar
          </NuxtLink>
        </div>
      </div>
    </div>
  `
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>