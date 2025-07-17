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
              <button @click="showInfoModal = true" class="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-lg font-medium hover:bg-emerald-200 transition-colors">
                Información del Sistema
              </button>
            </div>
          </div>
        </div>

        <!-- Stats cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Cantidad de Salas</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalRooms }}</p>
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
                <p class="text-sm text-gray-600">Salas Disponibles</p>
                <p class="text-2xl font-bold text-gray-900">{{ availableRoomsCount }}</p>
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
                <p class="text-sm text-gray-600">Salas Ocupadas</p>
                <p class="text-2xl font-bold text-gray-900">{{ occupiedRoomsCount }}</p>
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
          <div v-if="isLoadingRooms">
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-10 w-10 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          </div>
          <div v-else-if="topReservedRooms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="room in topReservedRooms.slice(0,3)" :key="room.id" class="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer group" @click="openSalaModal(room)">
              <img :src="room.thumbnail || '/santotomas1.jpg'" alt="Miniatura" class="w-full h-32 object-cover rounded-xl mb-4 shadow group-hover:scale-105 transition-transform duration-300" />
              <h3 class="text-xl font-bold text-emerald-800 mb-1 text-center">{{ room.name }}</h3>
              <p class="text-gray-600 text-sm mb-2 text-center">{{ room.description || 'Sala equipada para estudio y reuniones.' }}</p>
              <span class="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow mb-2">{{ room.reservas || 0 }} reservas</span>
              <span class="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">Ver Detalle</span>
            </div>
          </div>
          <div v-else class="text-center py-12">
            <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">No hay salas destacadas</h3>
              <p class="text-gray-600">Las salas aparecerán aquí cuando tengan reservas.</p>
            </div>
          </div>
        </div>

        <!-- Modal de sala -->
        <transition name="fade">
          <div v-if="salaSeleccionada" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in">
              <button @click="closeSalaModal" class="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 text-3xl font-bold focus:outline-none">&times;</button>
              <h2 class="text-3xl font-extrabold mb-2 text-emerald-700 text-center">{{ salaSeleccionada.name }}</h2>
              <p class="mb-4 text-gray-600 text-center text-lg">{{ salaSeleccionada.description || 'Sala equipada para estudio y reuniones. Ambiente cómodo y tranquilo.' }}</p>
              <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <PanoramaViewer :panorama="salaSeleccionada.urlPanorama360 || defaultPanorama" />
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Modal de Información del Sistema -->
      <SystemInfoModal 
        :show="showInfoModal" 
        :rooms-count="rooms.length"
        @close="showInfoModal = false"
      />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { id: 'dashboard', label: 'Dashboard', icon: { template: '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z\'/><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width="2" d=\'M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z\'/></svg>' } }
      ],
      activeView: 'dashboard',
      searchTerm: '',
      showNotifications: false,
      showUserMenu: false,
      userName: 'Luis Estudiante',
      userEmail: 'luis.estudiante@ust.cl',
      notifications: [
        { id: 1, type: 'success', message: 'Reserva confirmada para mañana 14:00', time: '5 min' },
        { id: 2, type: 'info', message: 'Nueva sala disponible en Edificio D', time: '1 hora' },
        { id: 3, type: 'warning', message: 'Mantenimiento programado Sala A101', time: '2 horas' }
      ],
      rooms: [],
      isLoadingRooms: true,
      showInfoModal: false,
      topReservedRooms: [],
      salaSeleccionada: null,
      defaultPanorama: '/e271ec15-3740-4a2e-87eb-8fe9f8a3f2cd.png',
    };
  },
  computed: {
    userInitials() {
      return this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
    },
    filteredRooms() {
      return this.rooms.filter(room =>
        room.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        String(room.number).includes(this.searchTerm)
      );
    },
    totalRooms() {
      return this.rooms.length;
    },
    availableRoomsCount() {
      return this.rooms.filter(room => room.available).length;
    },
    occupiedRoomsCount() {
      return this.rooms.filter(room => room.available === false).length;
    },
  },
  methods: {
    goToProfile() {
      this.showUserMenu = false;
      console.log('Ir al perfil');
    },
    goToReservations() {
      this.showUserMenu = false;
      console.log('Ir a reservas');
    },
    goToSettings() {
      this.showUserMenu = false;
      console.log('Ir a configuración');
    },
    logout() {
      this.showUserMenu = false;
      console.log('Cerrar sesión');
    },
    handleNotificationClick(notification) {
      this.showNotifications = false;
      console.log('Notificación clickeada:', notification);
    },
    async fetchRooms() {
      try {
        const res = await fetch('/api/study-rooms');
        if (res.ok) {
          this.rooms = await res.json();
          await this.fetchTopReservedRooms();
        } else {
          this.rooms = [];
          this.topReservedRooms = [];
        }
      } catch (error) {
        this.rooms = [];
        this.topReservedRooms = [];
      } finally {
        this.isLoadingRooms = false;
      }
    },
    async fetchTopReservedRooms() {
      try {
        const res = await fetch('/api/reserve/top');
        if (res.ok) {
          const top = await res.json();
          this.topReservedRooms = top.map(item => {
            const room = this.rooms.find(r => r.id === item.studyRoomId);
            return room ? { ...room, reservas: item.count } : null;
          }).filter(Boolean);
        } else {
          this.topReservedRooms = [];
        }
      } catch (e) {
        this.topReservedRooms = [];
      }
    },
    openSalaModal(sala) {
      this.salaSeleccionada = sala;
    },
    closeSalaModal() {
      this.salaSeleccionada = null;
    },
  },
  mounted() {
    this.fetchRooms();
  },
  components: {
    RoomCard: {
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
      `,
    },
    PanoramaViewer: {
      props: ['panorama'],
      template: `
        <div style="overflow: hidden; position: relative; width: 100%; height: 500px;">
          <div ref="viewerContainer" style="width: 100%; height: 100%;"></div>
        </div>
      `,
      mounted() {
        // Aquí iría la lógica del visor 360
        // Por ahora solo muestra la imagen
        const container = this.$refs.viewerContainer;
        if (container) {
          container.innerHTML = `<img src="${this.panorama}" style="width: 100%; height: 100%; object-fit: cover;" />`;
        }
      }
    }
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.animate-fade-in {
  animation: fadeInModal 0.4s cubic-bezier(0.4,0,0.2,1);
}
@keyframes fadeInModal {
  0% { opacity: 0; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}
/* Estilos adicionales si son necesarios */
</style>