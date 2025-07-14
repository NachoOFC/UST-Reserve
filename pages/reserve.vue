<template>
  <div class="min-h-screen bg-gradient-to-br from-ust-50 to-ust-100 font-sans">
    <!-- Header -->
    <header class="gradient-ust text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0">
              <h1 class="text-2xl font-bold">{{ appTitle }}</h1>
            </NuxtLink>
          </div>
          <nav class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink 
                v-for="navItem in navigationItems" 
                :key="navItem.id"
                :to="navItem.link" 
                class="text-white hover:text-ust-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                @click="handleNavigation(navItem.id)"
              >
                {{ navItem.text }}
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-ust-800 sm:text-5xl mb-4">{{ pageTitle }}</h2>
        <p class="text-xl text-ust-700">{{ pageSubtitle }}</p>
      </div>

      <!-- Listado de salas -->
      <div v-if="!selectedRoom">
        <div v-if="rooms.length" class="space-y-6">
          <div v-for="room in rooms" :key="room.id" class="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-ust-institucional">
            <div>
              <h3 class="text-xl font-bold text-ust-institucional mb-1">{{ room.name }}</h3>
              <p class="text-gray-600">Sala N° {{ room.number }} | Capacidad: {{ room.capacity }} personas</p>
            </div>
            <button @click="selectRoom(room)" class="bg-[#3a9a3a] hover:bg-[#2d7a2d] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-4 md:mt-0">Reservar</button>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 mt-8">No hay salas registradas.</div>
      </div>

      <!-- Formulario de reserva -->
      <div v-else class="card-ust mt-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="mb-4">
            <span class="block text-lg font-bold text-ust-institucional">Reservando: {{ selectedRoom.name }} (Sala N° {{ selectedRoom.number }})</span>
            <button type="button" @click="selectedRoom = null" class="ml-4 text-sm text-ust-institucional underline">Cambiar sala</button>
          </div>
          <!-- Personal Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="nombre" class="block text-sm font-medium text-ust-700 mb-2">{{ formLabels.nombre }}</label>
              <input 
                type="text" 
                id="nombre" 
                v-model="formData.nombre"
                required
                class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
                :placeholder="formPlaceholders.nombre"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-ust-700 mb-2">{{ formLabels.email }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                required
                class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
                :placeholder="formPlaceholders.email"
              >
            </div>
          </div>

          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="fecha" class="block text-sm font-medium text-ust-700 mb-2">{{ formLabels.fecha }}</label>
              <input 
                type="date" 
                id="fecha" 
                v-model="formData.fecha"
                required
                :min="minDate"
                class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
              >
            </div>
            <div>
              <label for="hora" class="block text-sm font-medium text-ust-700 mb-2">{{ formLabels.hora }}</label>
              <select
                id="hora"
                v-model="formData.hora"
                required
                class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="">Selecciona hora de inicio</option>
                <option v-for="h in validHours" :key="h" :value="h">{{ h }}</option>
              </select>
            </div>
          </div>

          <!-- Duration -->
          <div>
            <label for="duracion" class="block text-sm font-medium text-ust-700 mb-2">{{ formLabels.duracion }}</label>
            <select 
              id="duracion" 
              v-model="formData.duracion"
              required
              class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">{{ formPlaceholders.duracion }}</option>
              <option 
                v-for="duration in durationOptions" 
                :key="duration.value" 
                :value="duration.value"
              >
                {{ duration.label }}
              </option>
            </select>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center pt-6">
            <button 
              type="submit" 
              class="bg-[#3a9a3a] hover:bg-[#2d7a2d] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg mt-4"
            >
              {{ submitButtonText }}
            </button>
          </div>
        </form>
      </div>

      <!-- Information Cards -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="infoCard in infoCards" 
          :key="infoCard.id"
          class="card-ust text-center hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto" :class="infoCard.bgColor">
            <svg class="w-8 h-8" :class="infoCard.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="infoCard.iconPath"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-ust-800 mb-3">{{ infoCard.title }}</h3>
          <p class="text-ust-600 text-sm">{{ infoCard.description }}</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-ust-800 mt-20">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-ust-100">&copy; {{ currentYear }} {{ appTitle }}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ReservePage',
  data() {
    return {
      appTitle: 'StudyRoom',
      pageTitle: 'Reservar Sala de Estudio',
      pageSubtitle: 'Selecciona una sala para reservar',
      submitButtonText: 'Confirmar Reserva',
      currentYear: new Date().getFullYear(),
      navigationItems: [
        { id: 'home', text: 'Inicio', link: '/' },
        { id: 'search', text: 'Buscar Sala', link: '/gps' }
      ],
      rooms: [],
      selectedRoom: null,
      minDate: new Date().toISOString().split('T')[0],
      formData: {
        nombre: '',
        email: '',
        fecha: '',
        hora: '',
        duracion: ''
      },
      formLabels: {
        nombre: 'Nombre Completo',
        email: 'Email',
        fecha: 'Fecha',
        hora: 'Hora de Inicio',
        duracion: 'Duración'
      },
      formPlaceholders: {
        nombre: 'Ingresa tu nombre completo',
        email: 'tu@email.com',
        duracion: 'Selecciona duración'
      },
      durationOptions: [
        { value: '1', label: '1 hora' }
      ],
      infoCards: [
        {
          id: 'cancellation',
          title: 'Política de Cancelación',
          description: 'Puedes cancelar tu reserva hasta 2 horas antes del inicio sin penalización.',
          bgColor: 'bg-ust-100',
          iconColor: 'text-ust-600',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 'confirmation',
          title: 'Confirmación Inmediata',
          description: 'Recibirás una confirmación por email inmediatamente después de la reserva.',
          bgColor: 'bg-ust-accent-100',
          iconColor: 'text-ust-accent-600',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 'support',
          title: 'Soporte 24/7',
          description: 'Nuestro equipo está disponible para ayudarte en cualquier momento.',
          bgColor: 'bg-ust-100',
          iconColor: 'text-ust-600',
          iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ],
      validHours: [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"
      ]
    }
  },
  methods: {
    handleNavigation(navId) {
      switch(navId) {
        case 'home':
          this.$router.push('/')
          break
        case 'search':
          this.$router.push('/gps')
          break
      }
    },
    async fetchRooms() {
      const res = await fetch('/api/study-rooms')
      this.rooms = await res.json()
    },
    selectRoom(room) {
      this.selectedRoom = room
    },
    async handleSubmit() {
      if (!this.validateForm()) return;
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: this.formData.nombre,
          email: this.formData.email,
          fecha: this.formData.fecha,
          hora: this.formData.hora,
          studyRoomId: this.selectedRoom.id
        })
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        this.showSuccessMessage();
        this.resetForm();
        this.selectedRoom = null;
      }
    },
    validateForm() {
      if (!this.formData.nombre || !this.formData.email || !this.formData.fecha || 
          !this.formData.hora || !this.formData.duracion) {
        alert('Por favor, completa todos los campos obligatorios.')
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.formData.email)) {
        alert('Por favor, ingresa un email válido.')
        return false
      }
      const selectedDate = new Date(this.formData.fecha)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        alert('La fecha no puede ser anterior a hoy.')
        return false
      }
      return true
    },
    showSuccessMessage() {
      alert('¡Reserva enviada correctamente! Te contactaremos pronto.')
    },
    resetForm() {
      this.formData = {
        nombre: '',
        email: '',
        fecha: '',
        hora: '',
        duracion: ''
      }
    },
    initializePage() {
      const today = new Date().toISOString().split('T')[0]
      this.formData.fecha = today
    }
  },
  mounted() {
    this.initializePage()
    this.fetchRooms()
  }
}
</script>

<style scoped>
</style>