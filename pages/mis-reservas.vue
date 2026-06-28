<template>
  <div class="min-h-screen bg-gray-50">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero section -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl font-bold mb-4">Mis Reservas</h1>
          <p class="text-blue-100 text-lg">
            Administra tus reservas de salas de estudio
          </p>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-blue-600">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando tus reservas...
        </div>
      </div>

      <!-- Sin autenticación -->
      <div v-else-if="!user || user.anon" class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <svg class="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus reservas</h2>
        <p class="text-gray-600 mb-8">Necesitas estar autenticado para acceder a esta página</p>
        <button
          @click="$router.push('/login')"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Ir al Login
        </button>
      </div>

      <!-- Contenido principal -->
      <div v-else>
        <!-- Reservas Activas -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Reservas Activas ({{ activeReservations.length }})
          </h2>

          <div v-if="activeReservations.length === 0" class="bg-white rounded-xl shadow p-8 text-center">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <p class="text-gray-500 mb-4">No tienes reservas activas</p>
            <button
              @click="$router.push('/reserve')"
              class="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Hacer una Reserva
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="reservation in activeReservations"
              :key="reservation.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-green-500 hover:shadow-xl transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">{{ reservation.room_name }}</h3>
                    <p class="text-sm text-gray-600">
                      <span v-if="reservation.building_name">{{ reservation.building_name }}</span>
                      <span v-if="reservation.building_name && reservation.room_number"> • </span>
                      <span v-if="reservation.room_number">Sala {{ reservation.room_number }}</span>
                    </p>
                  </div>
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Activa
                  </span>
                </div>

                <div class="space-y-2 mb-4">
                  <div class="flex items-center text-sm text-gray-700">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {{ formatDate(reservation.reservation_date) }}
                  </div>
                  <div class="flex items-center text-sm text-gray-700">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ formatTime(reservation.start_time) }} - {{ formatTime(reservation.end_time) }}
                  </div>
                  <div class="flex items-center text-sm text-gray-700">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    Capacidad: {{ reservation.room_capacity }} personas
                  </div>
                </div>

                <button
                  @click="confirmCancelReservation(reservation)"
                  class="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                >
                  Cancelar Reserva
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Historial de Reservas -->
        <div v-if="pastReservations.length > 0">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Historial ({{ pastReservations.length }})
          </h2>

          <div class="bg-white rounded-xl shadow overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="reservation in pastReservations" :key="reservation.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ reservation.room_name }}</div>
                      <div class="text-sm text-gray-500">
                        <span v-if="reservation.building_name">{{ reservation.building_name }}</span>
                        <span v-if="reservation.building_name && reservation.room_number"> • </span>
                        <span v-if="reservation.room_number">Sala {{ reservation.room_number }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ formatDate(reservation.reservation_date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ formatTime(reservation.start_time) }} - {{ formatTime(reservation.end_time) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Completada
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de Confirmación -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showCancelModal = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">¿Cancelar Reserva?</h3>
          <p class="text-sm text-gray-600">
            ¿Estás seguro de que deseas cancelar tu reserva para 
            <strong>{{ reservationToCancel?.room_name }}</strong> 
            el <strong>{{ formatDate(reservationToCancel?.reservation_date) }}</strong>?
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="showCancelModal = false"
            class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            No, mantener
          </button>
          <button
            @click="cancelReservation"
            :disabled="isCanceling"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {{ isCanceling ? 'Cancelando...' : 'Sí, cancelar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      isLoading: true,
      activeReservations: [],
      pastReservations: [],
      showCancelModal: false,
      reservationToCancel: null,
      isCanceling: false,
    };
  },
  setup() {
    const toast = useToast();
    const { user } = useAuth();
    return { toast, user };
  },
  methods: {
    async loadReservations() {
      this.isLoading = true;
      try {
        if (!this.user || this.user.anon) {
          this.isLoading = false;
          return;
        }

        console.log('🔍 Cargando reservas para:', this.user.email);
        const response = await fetch(`/api/reserve/my?email=${encodeURIComponent(this.user.email)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Datos recibidos:', data);

        if (data.error) {
          console.error('❌ Error del API:', data.error);
          this.toast.error(data.error);
          this.activeReservations = [];
          this.pastReservations = [];
        } else {
          this.activeReservations = data.active || [];
          this.pastReservations = data.past || [];
          console.log('✅ Reservas cargadas:', {
            activas: this.activeReservations.length,
            pasadas: this.pastReservations.length
          });
        }
      } catch (error) {
        console.error('💥 Error loading reservations:', error);
        this.toast.error('Error al obtener reservas');
        this.activeReservations = [];
        this.pastReservations = [];
      } finally {
        this.isLoading = false;
      }
    },
    confirmCancelReservation(reservation) {
      this.reservationToCancel = reservation;
      this.showCancelModal = true;
    },
    async cancelReservation() {
      if (!this.reservationToCancel) return;

      this.isCanceling = true;
      try {
        const response = await fetch(`/api/reserve/${this.reservationToCancel.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.user.email,
          }),
        });

        const result = await response.json();

        if (result.success) {
          this.toast.success('Reserva cancelada exitosamente');
          this.showCancelModal = false;
          this.reservationToCancel = null;
          // Recargar reservas
          await this.loadReservations();
        } else {
          this.toast.error(result.error || 'Error al cancelar reserva');
        }
      } catch (error) {
        console.error('Error canceling reservation:', error);
        this.toast.error('Error de conexión');
      } finally {
        this.isCanceling = false;
      }
    },
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
    formatTime(timeString) {
      if (!timeString) return '';
      return timeString.slice(0, 5); // HH:MM
    },
  },
  mounted() {
    if (this.user && !this.user.anon) {
      this.loadReservations();
    } else {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
</style>
