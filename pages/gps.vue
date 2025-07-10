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
    <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-ust-800 sm:text-5xl mb-4">{{ pageTitle }}</h2>
        <p class="text-xl text-ust-700">{{ pageSubtitle }}</p>
      </div>

      <!-- Search Controls -->
      <div class="card-ust mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="ubicacion" class="block text-sm font-medium text-ust-700 mb-2">{{ searchLabels.ubicacion }}</label>
            <input 
              type="text" 
              id="ubicacion" 
              v-model="searchFilters.ubicacion"
              :placeholder="searchPlaceholders.ubicacion"
              class="w-full px-4 py-2 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
            >
          </div>
          <div>
            <label for="tipoSala" class="block text-sm font-medium text-ust-700 mb-2">{{ searchLabels.tipoSala }}</label>
            <select 
              id="tipoSala" 
              v-model="searchFilters.tipoSala"
              class="w-full px-4 py-2 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">{{ searchPlaceholders.tipoSala }}</option>
              <option 
                v-for="roomType in roomTypeOptions" 
                :key="roomType.value" 
                :value="roomType.value"
              >
                {{ roomType.label }}
              </option>
            </select>
          </div>
          <div>
            <label for="capacidad" class="block text-sm font-medium text-ust-700 mb-2">{{ searchLabels.capacidad }}</label>
            <select 
              id="capacidad" 
              v-model="searchFilters.capacidad"
              class="w-full px-4 py-2 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="">{{ searchPlaceholders.capacidad }}</option>
              <option 
                v-for="capacity in capacityOptions" 
                :key="capacity.value" 
                :value="capacity.value"
              >
                {{ capacity.label }}
              </option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="buscarSalas"
              class="w-full btn-ust"
            >
              {{ searchButtonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="card-ust mb-8">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-ust-800">{{ mapTitle }}</h3>
            <button 
              @click="obtenerUbicacion"
              class="flex items-center px-4 py-2 btn-ust-outline"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ locationButtonText }}
            </button>
          </div>
          <!-- Map Container -->
          <div class="bg-ust-50 rounded-lg h-96 flex items-center justify-center relative overflow-hidden border-2 border-ust-200">
            <!-- Map Placeholder -->
            <div class="text-center">
              <svg class="w-16 h-16 text-ust-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
              </svg>
              <p class="text-ust-700 font-medium">{{ mapPlaceholderText }}</p>
              <p class="text-sm text-ust-600 mt-2">{{ mapIntegrationText }}</p>
            </div>
            <!-- Mock map markers -->
            <div 
              v-for="marker in mapMarkers" 
              :key="marker.id"
              class="absolute w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              :class="marker.color"
              :style="{ top: marker.top, left: marker.left }"
            >
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Results List -->
      <div class="card-ust">
        <div class="p-6">
          <h3 class="text-xl font-bold text-ust-800 mb-6">
            {{ resultsTitle }} ({{ salasFiltradas.length }})
          </h3>
          <div class="space-y-4">
            <div 
              v-for="sala in salasFiltradas" 
              :key="sala.id"
              class="border border-ust-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white hover:bg-ust-50"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <h4 class="text-lg font-semibold text-ust-800 mr-3">{{ sala.nombre }}</h4>
                    <span 
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        sala.disponible ? 'bg-ust-accent-100 text-ust-accent-800' : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ sala.disponible ? statusLabels.disponible : statusLabels.ocupada }}
                    </span>
                  </div>
                  <div class="flex items-center text-ust-600 mb-2">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{{ sala.ubicacion }}</span>
                    <span class="ml-4 text-sm">{{ sala.distancia }}</span>
                  </div>
                  <div class="flex items-center text-ust-600 mb-2">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    <span>{{ sala.capacidad }} {{ capacityLabel }}</span>
                    <span class="ml-4">{{ sala.tipo }}</span>
                  </div>
                  <div class="flex items-center text-ust-600 mb-4">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="equipo in sala.equipos" 
                        :key="equipo"
                        class="px-2 py-1 bg-ust-100 text-ust-700 rounded text-sm"
                      >
                        {{ equipo }}
                      </span>
                    </div>
                  </div>
                  <p class="text-ust-600 text-sm">{{ sala.descripcion }}</p>
                </div>
                <div class="ml-6 flex flex-col space-y-2">
                  <button 
                    @click="verDetalles(sala)"
                    class="px-4 py-2 btn-ust text-sm font-medium"
                  >
                    {{ actionButtons.verDetalles }}
                  </button>
                  <button 
                    @click="verEnMapa(sala)"
                    class="px-4 py-2 btn-ust-outline text-sm font-medium"
                  >
                    {{ actionButtons.verEnMapa }}
                  </button>
                  <NuxtLink 
                    to="/reserve"
                    class="px-4 py-2 bg-ust-accent-500 text-white rounded-lg hover:bg-ust-accent-600 transition-colors text-sm font-medium text-center"
                  >
                    {{ actionButtons.reservar }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-if="salasFiltradas.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-ust-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p class="text-ust-700 text-lg">{{ emptyStateText }}</p>
            <p class="text-ust-600 text-sm mt-2">{{ emptyStateSubtext }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          v-for="stat in stats" 
          :key="stat.id"
          class="card-ust text-center hover:shadow-xl transition-shadow duration-300"
        >
          <div class="text-3xl font-bold mb-2" :class="stat.color">{{ stat.value }}</div>
          <p class="text-ust-600">{{ stat.label }}</p>
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
  name: 'GpsPage',
  
  data() {
    return {
      appTitle: 'StudyRoom',
      pageTitle: 'Buscar Salas Disponibles',
      pageSubtitle: 'Encuentra la sala perfecta cerca de ti',
      mapTitle: 'Mapa de Salas',
      locationButtonText: 'Mi Ubicación',
      mapPlaceholderText: 'Mapa interactivo se cargará aquí',
      mapIntegrationText: 'Integración con Google Maps o similar',
      resultsTitle: 'Salas Encontradas',
      searchButtonText: 'Buscar',
      capacityLabel: 'personas',
      currentYear: new Date().getFullYear(),
      
      navigationItems: [
        { id: 'home', text: 'Inicio', link: '/' },
        { id: 'reserve', text: 'Reservar', link: '/reserve' }
      ],
      
      searchFilters: {
        ubicacion: '',
        tipoSala: '',
        capacidad: ''
      },
      
      searchLabels: {
        ubicacion: 'Ubicación',
        tipoSala: 'Tipo de Sala',
        capacidad: 'Capacidad'
      },
      
      searchPlaceholders: {
        ubicacion: 'Ingresa tu ubicación',
        tipoSala: 'Todos los tipos',
        capacidad: 'Cualquier capacidad'
      },
      
      roomTypeOptions: [
        { value: 'individual', label: 'Individual' },
        { value: 'grupal', label: 'Grupal' },
        { value: 'conferencia', label: 'Conferencia' },
        { value: 'silenciosa', label: 'Silenciosa' }
      ],
      
      capacityOptions: [
        { value: '1', label: '1 persona' },
        { value: '2-4', label: '2-4 personas' },
        { value: '5-10', label: '5-10 personas' },
        { value: '10+', label: '10+ personas' }
      ],
      
      statusLabels: {
        disponible: 'Disponible',
        ocupada: 'Ocupada'
      },
      
      actionButtons: {
        verDetalles: 'Ver Detalles',
        verEnMapa: 'Ver en Mapa',
        reservar: 'Reservar'
      },
      
      emptyStateText: 'No se encontraron salas con los criterios seleccionados',
      emptyStateSubtext: 'Intenta modificar los filtros de búsqueda',
      
      mapMarkers: [
        { id: 1, color: 'bg-red-500', top: '20%', left: '32%' },
        { id: 2, color: 'bg-ust-500', top: '40%', left: '76%' },
        { id: 3, color: 'bg-ust-accent-500', top: '68%', left: '48%' }
      ],
      
      // Mock data for rooms
      salas: [
        {
          id: 1,
          nombre: 'Sala de Estudio Alpha',
          ubicacion: 'Biblioteca Central, Piso 2',
          distancia: '0.2 km',
          capacidad: 4,
          tipo: 'Grupal',
          disponible: true,
          equipos: ['WiFi', 'Proyector', 'Pizarra'],
          descripcion: 'Sala perfecta para trabajo en equipo con excelente iluminación natural.'
        },
        {
          id: 2,
          nombre: 'Sala Silenciosa Beta',
          ubicacion: 'Edificio de Ciencias, Piso 1',
          distancia: '0.5 km',
          capacidad: 1,
          tipo: 'Individual',
          disponible: true,
          equipos: ['WiFi', 'Enchufe'],
          descripcion: 'Espacio individual ideal para concentración máxima.'
        },
        {
          id: 3,
          nombre: 'Sala de Conferencias Gamma',
          ubicacion: 'Centro de Estudiantes, Piso 3',
          distancia: '0.8 km',
          capacidad: 12,
          tipo: 'Conferencia',
          disponible: false,
          equipos: ['WiFi', 'Proyector', 'Sistema de Audio', 'Pizarra'],
          descripcion: 'Amplia sala para presentaciones y reuniones grupales.'
        },
        {
          id: 4,
          nombre: 'Sala de Estudio Delta',
          ubicacion: 'Biblioteca Norte, Piso 1',
          distancia: '1.2 km',
          capacidad: 6,
          tipo: 'Grupal',
          disponible: true,
          equipos: ['WiFi', 'Pizarra', 'Computadora'],
          descripcion: 'Sala equipada con computadora para trabajos digitales.'
        },
        {
          id: 5,
          nombre: 'Sala Individual Epsilon',
          ubicacion: 'Residencia Estudiantil, Piso 2',
          distancia: '0.3 km',
          capacidad: 1,
          tipo: 'Individual',
          disponible: true,
          equipos: ['WiFi', 'Lámpara de escritorio'],
          descripcion: 'Espacio cómodo y tranquilo para estudio individual.'
        }
      ]
    }
  },
  
  computed: {
    salasFiltradas() {
      return this.salas.filter(sala => {
        const matchUbicacion = !this.searchFilters.ubicacion || 
          sala.ubicacion.toLowerCase().includes(this.searchFilters.ubicacion.toLowerCase())
        
        const matchTipo = !this.searchFilters.tipoSala || 
          sala.tipo.toLowerCase() === this.searchFilters.tipoSala.toLowerCase()
        
        const matchCapacidad = !this.searchFilters.capacidad || 
          (this.searchFilters.capacidad === '1' && sala.capacidad === 1) ||
          (this.searchFilters.capacidad === '2-4' && sala.capacidad >= 2 && sala.capacidad <= 4) ||
          (this.searchFilters.capacidad === '5-10' && sala.capacidad >= 5 && sala.capacidad <= 10) ||
          (this.searchFilters.capacidad === '10+' && sala.capacidad > 10)
        
        return matchUbicacion && matchTipo && matchCapacidad
      })
    },
    
    salasDisponibles() {
      return this.salasFiltradas.filter(sala => sala.disponible).length
    },
    
    salasOcupadas() {
      return this.salasFiltradas.filter(sala => !sala.disponible).length
    },
    
    stats() {
      return [
        {
          id: 'disponibles',
          value: this.salasDisponibles,
          label: 'Salas Disponibles',
          color: 'text-ust-600'
        },
        {
          id: 'ocupadas',
          value: this.salasOcupadas,
          label: 'Salas Ocupadas',
          color: 'text-ust-accent-600'
        },
        {
          id: 'tiempo',
          value: '2.5h',
          label: 'Tiempo Promedio',
          color: 'text-ust-700'
        },
        {
          id: 'distancia',
          value: '0.6km',
          label: 'Distancia Promedio',
          color: 'text-ust-800'
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
        case 'reserve':
          this.$router.push('/reserve')
          break
      }
    },
    
    buscarSalas() {
      console.log('Buscando salas con filtros:', this.searchFilters)
      // Aquí implementarías la lógica de búsqueda real
      this.showSearchResults()
    },
    
    obtenerUbicacion() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Ubicación obtenida:', position.coords)
            this.showLocationSuccess()
          },
          (error) => {
            console.error('Error al obtener ubicación:', error)
            this.showLocationError()
          }
        )
      } else {
        this.showLocationNotSupported()
      }
    },
    
    verDetalles(sala) {
      console.log('Ver detalles de:', sala)
      this.showRoomDetails(sala)
    },
    
    verEnMapa(sala) {
      console.log('Ver en mapa:', sala)
      this.showRoomInMap(sala)
    },
    
    showSearchResults() {
      // Aquí puedes agregar lógica para mostrar resultados de búsqueda
      console.log('Mostrando resultados de búsqueda')
    },
    
    showLocationSuccess() {
      alert('Ubicación obtenida correctamente')
    },
    
    showLocationError() {
      alert('No se pudo obtener la ubicación')
    },
    
    showLocationNotSupported() {
      alert('Geolocalización no soportada por este navegador')
    },
    
    showRoomDetails(sala) {
      alert(`Detalles de ${sala.nombre}:\n${sala.descripcion}`)
    },
    
    showRoomInMap(sala) {
      alert(`Mostrando ${sala.nombre} en el mapa`)
    },
    
    // Método para inicializar la página
    initializePage() {
      console.log('Página GPS inicializada')
      // Aquí puedes agregar lógica de inicialización
    }
  },
  
  mounted() {
    this.initializePage()
  }
}
</script>

<style scoped>
</style>