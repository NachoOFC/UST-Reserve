<template>
  <div class="min-h-screen bg-gray-50">
    <!-- El header se elimina, solo queda el contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero section para reservas -->
      <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold mb-4">Reservar Sala de Estudio</h1>
          <p class="text-emerald-100 text-lg">
            Selecciona una sala, elige fecha y hora, y confirma tu reserva en pocos pasos
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulario de reserva -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Nueva Reserva</h2>
            
            <form @submit.prevent="submitReservation" class="space-y-6">
              <!-- Selección de sala -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Seleccionar Sala</label>
                
                <!-- Estado de carga -->
                <div v-if="isLoadingRooms" class="text-center py-8">
                  <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-emerald-600">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando salas disponibles...
                  </div>
                </div>

                <!-- Estado de error -->
                <div v-else-if="roomsError" class="text-center py-8">
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <svg class="w-8 h-8 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-red-600 font-medium">{{ roomsError }}</p>
                    <button 
                      @click="fetchRooms"
                      class="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>

                <!-- Lista de salas -->
                <div v-else-if="roomsWithAvailability.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="room in roomsWithAvailability" 
                    :key="room.id"
                    @click="room.available !== false && !room.allReserved ? selectedRoom = room : null"
                    :class="[
                      'p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                      selectedRoom?.id === room.id 
                        ? 'border-emerald-500 bg-emerald-50' 
                        : 'border-gray-200 hover:border-gray-300',
                      room.available === false || room.allReserved ? 'opacity-50 cursor-not-allowed' : ''
                    ]"
                    :aria-disabled="room.available === false || room.allReserved"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="font-semibold text-gray-900">{{ room.name }}</h3>
                      <span class="text-sm font-medium" :class="room.available !== false && !room.allReserved ? 'text-emerald-600' : 'text-gray-400'">
                        <template v-if="room.available === false">No disponible</template>
                        <template v-else-if="room.allReserved">No hay horarios disponibles hoy</template>
                        <template v-else>Disponible</template>
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ room.location }}</p>
                    <div class="flex items-center text-sm text-gray-500">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      <span>Capacidad: {{ room.capacity }} personas</span>
                    </div>
                  </div>
                </div>

                <!-- Sin salas disponibles -->
                <div v-else class="text-center py-8">
                  <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <p class="text-gray-500 mb-2">No hay salas disponibles</p>
                  <p class="text-sm text-gray-400">Intenta más tarde o contacta al administrador</p>
                </div>
          </div>

              <!-- Información personal -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
              <input 
                    v-model="formData.name"
                type="text" 
                required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Tu nombre completo"
              >
            </div>
            <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                    v-model="formData.email"
                type="email" 
                required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="tu.email@ust.cl"
              >
            </div>
          </div>

              <!-- Fecha y hora -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <input 
                    v-model="formData.date"
                type="date" 
                    required
                    :min="today"
                    :max="tomorrow"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Hora de inicio</label>
                  <select
                    v-model="formData.time"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="" disabled>Selecciona una hora</option>
                    <option
                      v-for="h in validHours"
                      :key="h"
                      :value="h"
                      :disabled="isHourReserved(h)"
                    >
                      {{ isHourReserved(h) ? h + ' (Reservada)' : h }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Duración</label>
                  <select
                    v-model="formData.duration"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="1">1 hora</option>
                    <option value="2">2 horas</option>
                  </select>
                </div>
          </div>

              <!-- Botones de acción -->
              <div class="flex space-x-4 pt-4">
                <NuxtLink 
                  to="/"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </NuxtLink>
            <button 
              type="submit" 
                  :disabled="!selectedRoom || !formData.name || !formData.email"
                  class="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                  Confirmar Reserva
            </button>
          </div>
        </form>
      </div>

          <!-- Historial de reservas -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Mis Reservas</h2>
            
            <div v-if="userReservations.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-gray-500 mb-4">No tienes reservas activas</p>
              <p class="text-sm text-gray-400">Haz tu primera reserva usando el formulario de arriba</p>
            </div>

            <div v-else class="space-y-4">
              <div 
                v-for="reservation in userReservations" 
                :key="reservation.id"
                class="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-semibold text-gray-900">{{ reservation.roomName }}</h3>
                  <span :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    reservation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  ]">
                    {{ reservation.status === 'active' ? 'Activa' : 'Completada' }}
                  </span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ formatDate(reservation.date) }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ reservation.time }} ({{ reservation.duration }}h)</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ reservation.location }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
                    <span>{{ reservation.userName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar con información -->
        <div class="space-y-6">
          <!-- Resumen de la reserva -->
          <div v-if="selectedRoom" class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumen de Reserva</h3>
            <div class="space-y-4">
              <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h4 class="font-semibold text-emerald-800">{{ selectedRoom.name }}</h4>
                <p class="text-emerald-600 text-sm">{{ selectedRoom.location }}</p>
              </div>
              
              <div v-if="formData.date && formData.time" class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Fecha:</span>
                  <span class="font-medium">{{ formatDate(formData.date) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Hora:</span>
                  <span class="font-medium">{{ formData.time }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Duración:</span>
                  <span class="font-medium">{{ formData.duration }} hora{{ formData.duration > 1 ? 's' : '' }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Capacidad:</span>
                  <span class="font-medium">{{ selectedRoom.capacity }} personas</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Información útil -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Útil</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Horarios de uso</h4>
                  <p class="text-sm text-gray-600">Lunes a Viernes: 8:00 - 16:00</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Ubicación GPS</h4>
                  <p class="text-sm text-gray-600">Navegación precisa al aula (Muy Pronto)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      validHours: [
        '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
      ],
      availableRooms: [],
      isLoadingRooms: true,
      roomsError: '',
      selectedRoom: null,
      formData: {
        name: '',
        email: '',
        date: '',
        time: '', // <-- valor inicial vacío para forzar selección
        duration: '1',
      },
      userReservations: [
        {
          id: 1,
          roomName: 'Sala de Estudio A101',
          location: 'Edificio A - Piso 1',
          date: '2024-01-15',
          time: '14:00',
          duration: 2,
          status: 'active',
          userName: 'Luis Estudiante',
        },
        {
          id: 2,
          roomName: 'Laboratorio B205',
          location: 'Edificio B - Piso 2',
          date: '2024-01-10',
          time: '10:00',
          duration: 1,
          status: 'completed',
          userName: 'Luis Estudiante',
        },
      ],
      reservedHours: [],
    };
  },
  computed: {
    today() {
      return new Date().toISOString().split('T')[0];
    },
    tomorrow() {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      return t.toISOString().split('T')[0];
    },
    roomsWithAvailability() {
      // Devuelve las salas con info de si tienen horarios disponibles para la fecha seleccionada
      return this.availableRooms.map(room => {
        if (!this.formData.date) return { ...room, allReserved: false };
        // Si todos los horarios están reservados, marcar como allReserved
        const reserved = this.reservedHours;
        const allReserved = this.validHours.every(h => reserved.includes(h));
        return { ...room, allReserved };
      });
    },
    selectKey() {
      // Forzar refresco si cambian sala, fecha o las horas reservadas
      return `${this.selectedRoom ? this.selectedRoom.id : 'none'}-${this.formData.date}-${this.reservedHours.join(',')}`;
    },
  },
  watch: {
    'formData.date': 'fetchReservedHours',
    selectedRoom: 'fetchReservedHours'
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async fetchRooms() {
      this.isLoadingRooms = true;
      this.roomsError = '';
      try {
        const response = await fetch('/api/study-rooms');
        if (response.ok) {
          this.availableRooms = await response.json();
        } else {
          console.error('Error fetching rooms:', response.status);
          this.roomsError = 'Error al cargar las salas. Intenta nuevamente.';
          this.availableRooms = [];
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        this.roomsError = 'Error de conexión. Verifica tu internet.';
        this.availableRooms = [];
      } finally {
        this.isLoadingRooms = false;
      }
    },
    async fetchReservedHours() {
      this.reservedHours = [];
      if (!this.selectedRoom || !this.formData.date) return;
      try {
        const response = await fetch(`/api/reserve?studyRoomId=${this.selectedRoom.id}&fecha=${this.formData.date}`);
        if (response.ok) {
          const data = await response.json();
          this.reservedHours = data.reservedHours || [];
          console.log('Horas reservadas:', this.reservedHours);
        }
      } catch (e) {
        this.reservedHours = [];
      }
    },
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    formatHour(h) {
      if (!h) return '';
      const [hh, mm] = h.split(':');
      return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
    },
    async submitReservation() {
      if (!this.selectedRoom || !this.formData.name || !this.formData.email) {
        this.toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      try {
        const response = await fetch('/api/reserve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyRoomId: this.selectedRoom.id,
            nombre: this.formData.name,
            email: this.formData.email,
            fecha: this.formData.date,
            hora: this.formData.time,
          }),
        });
        const result = await response.json();
        if (result.success) {
          this.userReservations.unshift({
            id: Date.now(),
            roomName: this.selectedRoom.name,
            location: this.selectedRoom.location,
            date: this.formData.date,
            time: this.formData.time,
            duration: parseInt(this.formData.duration),
            status: 'active',
            userName: this.formData.name,
          });
          // Limpiar formulario y sala seleccionada
          this.selectedRoom = null;
          this.formData = {
            name: '',
            email: '',
            date: '',
            time: '',
            duration: '1',
          };
          this.toast.success('¡Reserva realizada con éxito!');
        } else if (result.error) {
          this.toast.error(result.error);
        } else {
          this.toast.error('Error al realizar la reserva. Intenta nuevamente.');
        }
      } catch (error) {
        console.error('Error:', error);
        this.toast.error('Error de conexión. Intenta nuevamente.');
      }
    },
    isHourReserved(hour) {
      return this.reservedHours.includes(hour);
    },
    
  },
  mounted() {
    this.fetchRooms();
    
    // Agregar función de prueba al window para debugging
    if (typeof window !== 'undefined') {
      window.testReservation = this.testReservation;
      console.log('Función de prueba disponible como window.testReservation()');
    }
  },
};
</script>

<style scoped>
</style>