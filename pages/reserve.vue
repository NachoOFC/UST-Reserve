<template>
  <div class="min-h-screen bg-staccent font-sans">
    <!-- Header -->
    <header class="bg-stgreen text-white shadow-sm">
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
                class="text-white hover:text-staccent px-3 py-2 rounded-md text-sm font-medium"
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
        <h2 class="text-4xl font-extrabold text-stgreen sm:text-5xl">{{ pageTitle }}</h2>
        <p class="mt-4 text-xl text-stgreen-dark">{{ pageSubtitle }}</p>
      </div>
      <!-- Reservation Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Personal Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="nombre" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.nombre }}</label>
              <input 
                type="text" 
                id="nombre" 
                v-model="formData.nombre"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
                :placeholder="formPlaceholders.nombre"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.email }}</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
                :placeholder="formPlaceholders.email"
              >
            </div>
          </div>
          <!-- Date and Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="fecha" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.fecha }}</label>
              <input 
                type="date" 
                id="fecha" 
                v-model="formData.fecha"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
              >
            </div>
            <div>
              <label for="hora" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.hora }}</label>
              <input 
                type="time" 
                id="hora" 
                v-model="formData.hora"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
              >
            </div>
          </div>
          <!-- Duration and Room Type -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="duracion" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.duracion }}</label>
              <select 
                id="duracion" 
                v-model="formData.duracion"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
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
            <div>
              <label for="tipoSala" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.tipoSala }}</label>
              <select 
                id="tipoSala" 
                v-model="formData.tipoSala"
                required
                class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
              >
                <option value="">{{ formPlaceholders.tipoSala }}</option>
                <option 
                  v-for="roomType in roomTypeOptions" 
                  :key="roomType.value" 
                  :value="roomType.value"
                >
                  {{ roomType.label }}
                </option>
              </select>
            </div>
          </div>
          <!-- Equipment -->
          <div>
            <label class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.equipos }}</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label 
                v-for="equipment in equipmentOptions" 
                :key="equipment.value"
                class="flex items-center"
              >
                <input 
                  type="checkbox" 
                  v-model="formData.equipos"
                  :value="equipment.value"
                  class="rounded border-stgreen-light text-stgreen focus:ring-stgreen"
                >
                <span class="ml-2 text-sm text-stgreen">{{ equipment.label }}</span>
              </label>
            </div>
          </div>
          <!-- Comments -->
          <div>
            <label for="comentarios" class="block text-sm font-medium text-stgreen mb-2">{{ formLabels.comentarios }}</label>
            <textarea 
              id="comentarios" 
              v-model="formData.comentarios"
              rows="4"
              class="w-full px-4 py-3 border border-stgreen-light rounded-lg focus:ring-2 focus:ring-stgreen focus:border-transparent"
              :placeholder="formPlaceholders.comentarios"
            ></textarea>
          </div>
          <!-- Submit Button -->
          <div class="flex justify-center pt-6">
            <button 
              type="submit" 
              class="bg-stgreen hover:bg-stgreen-light text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
          class="bg-staccent rounded-lg shadow-md p-6"
        >
          <div class="flex items-center justify-center w-12 h-12 rounded-full mb-4" :class="infoCard.bgColor">
            <svg class="w-6 h-6" :class="infoCard.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="infoCard.iconPath"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-stgreen mb-2">{{ infoCard.title }}</h3>
          <p class="text-stgreen-dark text-sm">{{ infoCard.description }}</p>
        </div>
      </div>
    </main>
    <!-- Footer -->
    <footer class="bg-stgreen-dark mt-20">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-staccent">&copy; {{ currentYear }} {{ appTitle }}. Todos los derechos reservados.</p>
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
      pageSubtitle: 'Completa los datos para reservar tu espacio ideal',
      submitButtonText: 'Confirmar Reserva',
      currentYear: new Date().getFullYear(),
      
      navigationItems: [
        { id: 'home', text: 'Inicio', link: '/' },
        { id: 'search', text: 'Buscar Sala', link: '/gps' }
      ],
      
      formData: {
        nombre: '',
        email: '',
        fecha: '',
        hora: '',
        duracion: '',
        tipoSala: '',
        equipos: [],
        comentarios: ''
      },
      
      formLabels: {
        nombre: 'Nombre Completo',
        email: 'Email',
        fecha: 'Fecha',
        hora: 'Hora de Inicio',
        duracion: 'Duración',
        tipoSala: 'Tipo de Sala',
        equipos: 'Equipamiento Necesario',
        comentarios: 'Comentarios Adicionales'
      },
      
      formPlaceholders: {
        nombre: 'Ingresa tu nombre completo',
        email: 'tu@email.com',
        duracion: 'Selecciona duración',
        tipoSala: 'Selecciona tipo',
        comentarios: 'Agrega cualquier comentario o requerimiento especial...'
      },
      
      durationOptions: [
        { value: '1', label: '1 hora' },
        { value: '2', label: '2 horas' },
        { value: '3', label: '3 horas' },
        { value: '4', label: '4 horas' },
        { value: '6', label: '6 horas' },
        { value: '8', label: '8 horas' }
      ],
      
      roomTypeOptions: [
        { value: 'individual', label: 'Individual' },
        { value: 'grupal', label: 'Grupal (2-4 personas)' },
        { value: 'conferencia', label: 'Conferencia (5-10 personas)' },
        { value: 'silenciosa', label: 'Silenciosa' }
      ],
      
      equipmentOptions: [
        { value: 'proyector', label: 'Proyector' },
        { value: 'wifi', label: 'WiFi' },
        { value: 'pizarra', label: 'Pizarra' },
        { value: 'computadora', label: 'Computadora' }
      ],
      
      infoCards: [
        {
          id: 'cancellation',
          title: 'Política de Cancelación',
          description: 'Puedes cancelar tu reserva hasta 2 horas antes del inicio sin penalización.',
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 'confirmation',
          title: 'Confirmación Inmediata',
          description: 'Recibirás una confirmación por email inmediatamente después de la reserva.',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          id: 'support',
          title: 'Soporte 24/7',
          description: 'Nuestro equipo está disponible para ayudarte en cualquier momento.',
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600',
          iconPath: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        }
      ]
    }
  },
  
  methods: {
    handleNavigation(navId) {
      console.log('Navegación a:', navId)
      // Aquí puedes agregar lógica específica para cada navegación
      switch(navId) {
        case 'home':
          this.$router.push('/')
          break
        case 'search':
          this.$router.push('/gps')
          break
      }
    },
    
    handleSubmit() {
      // Validar formulario
      if (!this.validateForm()) {
        return
      }
      
      // Aquí puedes agregar la lógica para enviar los datos
      console.log('Datos de reserva:', this.formData)
      this.showSuccessMessage()
      this.resetForm()
    },
    
    validateForm() {
      // Validaciones básicas
      if (!this.formData.nombre || !this.formData.email || !this.formData.fecha || 
          !this.formData.hora || !this.formData.duracion || !this.formData.tipoSala) {
        alert('Por favor, completa todos los campos obligatorios.')
        return false
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.formData.email)) {
        alert('Por favor, ingresa un email válido.')
        return false
      }
      
      // Validar fecha (no puede ser anterior a hoy)
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
        duracion: '',
        tipoSala: '',
        equipos: [],
        comentarios: ''
      }
    },
    
    // Método para inicializar la página
    initializePage() {
      console.log('Página de reserva inicializada')
      // Establecer fecha mínima como hoy
      const today = new Date().toISOString().split('T')[0]
      this.formData.fecha = today
    }
  },
  
  mounted() {
    this.initializePage()
  }
}
</script>

<!-- Elimino estilos scoped para que predomine Tailwind -->
<style scoped>
</style>