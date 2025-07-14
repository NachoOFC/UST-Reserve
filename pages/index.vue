<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Elimino el header duplicado, solo queda el contenido principal -->
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

     
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z\'/><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width="2" d=\'M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z\'/></svg>' } },
  { id: 'rooms', label: 'Salas', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4\'/></svg>' } }
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