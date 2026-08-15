<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Información del Sistema</h2>
          <button 
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-6">
        
          <!-- Estadísticas en Tiempo Real -->
          <div class="bg-blue-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">Estadísticas en Tiempo Real</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{{ roomsCount }}</p>
                <p class="text-sm text-gray-600">Salas registradas</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-green-600">{{ availableRoomsCount }}</p>
                <p class="text-sm text-gray-600">Disponibles ahora</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-yellow-600">{{ occupiedRoomsCount }}</p>
                <p class="text-sm text-gray-600">Ocupadas ahora</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{{ occupancyPercent }}%</p>
                <p class="text-sm text-gray-600">Ocupación actual</p>
              </div>
            </div>
            <p v-if="topReservedCount > 0" class="mt-3 text-sm text-gray-600 text-center">
              {{ topReservedCount }} salas con mayor cantidad de reservas en el historial
            </p>
          </div>

          <!-- Funcionalidades Disponibles -->
          <div class="bg-purple-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-purple-800 mb-3">Qué hay disponible</h3>
            <div class="space-y-2">
              <div v-for="feature in availableFeatures" :key="feature" class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Funcionalidades Pendientes -->
          <div class="bg-red-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-red-800 mb-3">Qué está pendiente</h3>
            <div class="space-y-2">
              <div v-for="feature in pendingFeatures" :key="feature" class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Horarios de Reserva -->
          <div class="bg-orange-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-orange-800 mb-3">Horarios de Reserva</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700">Lunes a Domingo:</span>
                <span class="font-medium">08:00 - 16:00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Duración por reserva:</span>
                <span class="font-medium">1 hora</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Límite por usuario:</span>
                <span class="font-medium">1 reserva por día</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex space-x-3">
          <button 
            @click="closeModal"
            class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cerrar
          </button>
          <NuxtLink 
            to="/reserve"
            @click="closeModal"
            class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center"
          >
            Hacer Reserva
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemInfoModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    roomsCount: {
      type: Number,
      default: 0
    },
    availableRoomsCount: {
      type: Number,
      default: 0
    },
    occupiedRoomsCount: {
      type: Number,
      default: 0
    },
    occupancyPercent: {
      type: Number,
      default: 0
    },
    topReservedCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      availableFeatures: [
        'Reserva de salas en tiempo real (1 hora por reserva)',
        'Búsqueda de salas por nombre y número',
        'Vista 360° de cada sala',
        'Mis reservas con cancelación',
        'Historial de reservas completadas',
        'Login institucional y acceso como invitado',
        'Gestión administrativa de salas (CRUD)'
      ],
      pendingFeatures: [
        'Notificaciones automáticas (la campana es estática)',
        'Recordatorios antes de la reserva',
        'Reservas recurrentes y reservas múltiples por día',
        'Horario extendido (actualmente solo hasta las 16:00)',
        'Calendario o agenda mensual de disponibilidad',
        'Reportes y estadísticas administrativas'
      ]
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script> 
