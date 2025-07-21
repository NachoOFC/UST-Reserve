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
          <!-- Estado del Sistema -->
          <div class="bg-emerald-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-emerald-800 mb-3">Estado del Sistema</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-gray-700">Sistema Operativo</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-gray-700">Base de Datos Conectada</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-gray-700">API Funcionando</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span class="text-gray-700">Reservas Activas</span>
              </div>
            </div>
          </div>

          <!-- Estadísticas Rápidas -->
          <div class="bg-blue-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">Estadísticas Rápidas</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">{{ roomsCount }}</p>
                <p class="text-sm text-gray-600">Salas Registradas</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">12</p>
                <p class="text-sm text-gray-600">Reservas Hoy</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">78%</p>
                <p class="text-sm text-gray-600">Ocupación Promedio</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-blue-600">24/7</p>
                <p class="text-sm text-gray-600">Disponibilidad</p>
              </div>
            </div>
          </div>

          <!-- Funcionalidades Disponibles -->
          <div class="bg-purple-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-purple-800 mb-3">Funcionalidades Disponibles</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Reserva de salas en tiempo real</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Tour 360° de las instalaciones</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Sistema de notificaciones</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Gestión administrativa completa</span>
              </div>
            </div>
          </div>

          <!-- Horarios de Atención -->
          <div class="bg-orange-50 rounded-xl p-4">
            <h3 class="text-lg font-semibold text-orange-800 mb-3">Horarios de Atención</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700">Lunes a Viernes:</span>
                <span class="font-medium">8:00 AM - 10:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Sábados:</span>
                <span class="font-medium">8:30 AM - 9:00 PM</span>
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
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script> 