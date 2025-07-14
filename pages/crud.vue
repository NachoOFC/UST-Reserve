<template>
  <div class="space-y-8">
    <!-- Hero section para CRUD -->
    <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
      <div class="max-w-3xl">
        <h1 class="text-3xl font-bold mb-4">Administración de Salas</h1>
        <p class="text-emerald-100 text-lg">
          Sistema completo de gestión para crear, editar y eliminar salas de estudio
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Panel de acciones -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Acciones</h2>
          
          <div class="space-y-4">
            <button 
              @click="showCreateForm = true"
              class="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Crear Nueva Sala</span>
            </button>
            
            <button 
              @click="refreshRooms"
              class="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Actualizar Lista</span>
            </button>
          </div>

          <!-- Estadísticas -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Salas:</span>
                <span class="font-semibold">{{ rooms.length }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Disponibles:</span>
                <span class="font-semibold text-green-600">{{ availableRoomsCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ocupadas:</span>
                <span class="font-semibold text-red-600">{{ occupiedRoomsCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de salas -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Salas Registradas</h2>
            <div class="text-sm text-gray-500">{{ filteredRooms.length }} de {{ rooms.length }} salas</div>
          </div>

          <!-- Estado de carga -->
          <div v-if="isLoadingRooms" class="text-center py-12">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-emerald-600">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cargando salas...
            </div>
          </div>

          <!-- Lista de salas -->
          <div v-else-if="filteredRooms.length > 0" class="space-y-4">
            <div 
              v-for="room in filteredRooms" 
              :key="room.id"
              class="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-4 mb-3">
                    <h3 class="text-xl font-semibold text-gray-900">{{ room.name }}</h3>
                    <span :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ room.available ? 'Disponible' : 'Ocupada' }}
                    </span>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      <span>{{ room.location }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      <span>Capacidad: {{ room.capacity }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>ID: {{ room.id }}</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>Creada: {{ formatDate(room.created_at) }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Acciones -->
                <div class="flex items-center space-x-2 ml-4">
                  <button 
                    @click="editRoom(room)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar sala"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteRoom(room)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar sala"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sin salas -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <p class="text-gray-500 mb-2">No hay salas registradas</p>
            <p class="text-sm text-gray-400">Crea la primera sala usando el botón de arriba</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de crear/editar sala -->
    <div v-if="showCreateForm || editingRoom" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ editingRoom ? 'Editar Sala' : 'Crear Nueva Sala' }}
            </h2>
            <button 
              @click="closeForm"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre de la Sala</label>
                <input 
                  v-model="formData.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: Sala de Estudio A101"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Número de Sala</label>
                <input 
                  v-model="formData.number"
                  type="number" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: 101"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Capacidad</label>
                <input 
                  v-model="formData.capacity"
                  type="number" 
                  required
                  min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Número de personas"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select 
                  v-model="formData.available"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option :value="true">Disponible</option>
                  <option :value="false">Ocupada</option>
                </select>
              </div>
            </div>

            <div v-if="feedback" class="p-3 rounded-lg text-sm" :class="feedback.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
              {{ feedback }}
            </div>

            <div class="flex space-x-3">
              <button 
                type="button"
                @click="closeForm"
                class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                class="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                {{ editingRoom ? 'Actualizar Sala' : 'Crear Sala' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCreateForm: false,
      editingRoom: null,
      feedback: '',
      rooms: [],
      isLoadingRooms: true,
      formData: {
        name: '',
        number: '',
        capacity: '',
        available: true,
      },
    };
  },
  computed: {
    filteredRooms() {
      return this.rooms;
    },
    availableRoomsCount() {
      return this.rooms.filter(room => room.available).length;
    },
    occupiedRoomsCount() {
      return this.rooms.filter(room => !room.available).length;
    },
  },
  methods: {
    async fetchRooms() {
      this.isLoadingRooms = true;
      try {
        const response = await fetch('/api/study-rooms');
        if (response.ok) {
          this.rooms = await response.json();
        } else {
          console.error('Error fetching rooms:', response.status);
          this.rooms = [];
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        this.rooms = [];
      } finally {
        this.isLoadingRooms = false;
      }
    },
    async refreshRooms() {
      await this.fetchRooms();
      this.feedback = 'Lista actualizada correctamente';
      setTimeout(() => (this.feedback = ''), 3000);
    },
    editRoom(room) {
      this.editingRoom = room;
      this.formData = {
        name: room.name,
        number: room.number,
        capacity: room.capacity,
        available: room.available,
      };
    },
    async deleteRoom(room) {
      if (confirm(`¿Estás seguro de que quieres eliminar la sala "${room.name}"?`)) {
        try {
          const response = await fetch(`/api/study-rooms/${room.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            this.feedback = `Sala "${room.name}" eliminada correctamente`;
            await this.fetchRooms();
            setTimeout(() => (this.feedback = ''), 3000);
          } else {
            this.feedback = 'Error al eliminar la sala';
            setTimeout(() => (this.feedback = ''), 3000);
          }
        } catch (error) {
          console.error('Error:', error);
          this.feedback = 'Error de conexión al eliminar';
          setTimeout(() => (this.feedback = ''), 3000);
        }
      }
    },
    closeForm() {
      this.showCreateForm = false;
      this.editingRoom = null;
      this.formData = {
        name: '',
        number: '',
        capacity: '',
        available: true,
      };
      this.feedback = '';
    },
    async submitForm() {
      this.feedback = 'Intentando crear sala...';
      try {
        const payload = {
          ...this.formData,
          number: Number(this.formData.number),
          capacity: Number(this.formData.capacity),
          available: this.formData.available === 'false' ? false : Boolean(this.formData.available),
        };
        const url = this.editingRoom
          ? `/api/study-rooms/${this.editingRoom.id}`
          : '/api/study-rooms';
        const method = this.editingRoom ? 'PUT' : 'POST';
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          this.feedback = this.editingRoom
            ? 'Sala actualizada correctamente'
            : 'Sala creada correctamente';
          this.closeForm();
          await this.fetchRooms();
          setTimeout(() => (this.feedback = ''), 3000);
        } else {
          this.feedback = 'Error al procesar la solicitud';
        }
      } catch (error) {
        console.error('Error:', error);
        this.feedback = 'Error de conexión';
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    },
  },
  mounted() {
    this.fetchRooms();
  },
};
</script> 