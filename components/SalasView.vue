<template>
  <div>
    <!-- Hero/título grande -->
    <div class="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 mb-10 shadow-lg flex flex-col items-center justify-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-2 text-center drop-shadow-lg">Explora las Salas de Estudio</h1>
      <p class="text-emerald-100 text-lg text-center max-w-2xl">Encuentra el espacio perfecto para tu estudio, reuniones o trabajo colaborativo. Haz clic en una sala para ver su vista 360°.</p>
    </div>

    <!-- Buscador -->
    <div class="mb-8">
      <div class="relative max-w-xl mx-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por nombre, número o edificio..."
          class="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <p v-if="searchQuery.trim()" class="text-sm text-gray-500 text-center mt-3">
        {{ filteredSalas.length }} {{ filteredSalas.length === 1 ? 'sala encontrada' : 'salas encontradas' }}
      </p>
    </div>

    <!-- Grid de salas -->
    <div v-if="filteredSalas.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="sala in filteredSalas"
        :key="sala.id"
        class="group bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-6 cursor-pointer relative overflow-hidden"
        @click="openSala(sala)"
      >
        <div class="w-full h-44 rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-gray-100">
          <img
            :src="sala.thumbnail || defaultThumbnail"
            alt="Miniatura de sala"
            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-1 text-center">{{ sala.name }}</h3>
        <p class="text-gray-600 text-sm mb-4 text-center min-h-[48px]">
          {{ sala.description || 'Sala equipada para estudio y reuniones. Ambiente cómodo y tranquilo.' }}
        </p>
        <div class="flex items-center gap-2 mt-auto">
          <span class="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition">Ver en 360°</span>
        </div>
        <div class="absolute top-0 right-0 m-3 flex flex-col items-end gap-1">
          <span class="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow">N° {{ sala.number }}</span>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-else-if="!isLoading" class="text-center py-16">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No se encontraron salas</h3>
        <p class="text-gray-600">Prueba con otro nombre, número o edificio.</p>
      </div>
    </div>

    <!-- Modal de sala -->
    <transition name="fade">
      <div v-if="salaSeleccionada" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in">
          <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 text-3xl font-bold focus:outline-none">&times;</button>
          <h2 class="text-3xl font-extrabold mb-2 text-emerald-700 text-center">{{ salaSeleccionada.name }}</h2>
          <p class="mb-4 text-gray-600 text-center text-lg">{{ salaSeleccionada.description || 'Sala equipada para estudio y reuniones. Ambiente cómodo y tranquilo.' }}</p>
          <div class="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <PanoramaViewer :panorama="salaSeleccionada.urlPanorama360 || defaultPanorama" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PanoramaViewer from './PanoramaViewer.vue'

const salas = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const defaultThumbnail = '/santotomas1.jpg'
const defaultPanorama = '/e271ec15-3740-4a2e-87eb-8fe9f8a3f2cd.png'
const salaSeleccionada = ref(null)

const route = useRoute()
const router = useRouter()
let intervalId = null

if (typeof route.query.q === 'string') {
  searchQuery.value = route.query.q
}

watch(() => route.query.q, (q) => {
  searchQuery.value = typeof q === 'string' ? q : ''
})

watch(searchQuery, (q) => {
  const trimmed = q.trim()
  const query = trimmed ? { q: trimmed } : {}
  if (route.query.q !== query.q) {
    router.replace({ query })
  }
})

const filteredSalas = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return salas.value
  return salas.value.filter(sala =>
    String(sala.name || '').toLowerCase().includes(q) ||
    String(sala.number ?? '').toLowerCase().includes(q) ||
    String(sala.id ?? '').includes(q) ||
    String(sala.location || '').toLowerCase().includes(q) ||
    String(sala.description || '').toLowerCase().includes(q)
  )
})

function openSala(sala) {
  salaSeleccionada.value = sala
}
function closeModal() {
  salaSeleccionada.value = null
}

async function fetchSalas() {
  try {
    const res = await fetch('/api/study-rooms')
    if (res.ok) {
      salas.value = await res.json()
    }
  } catch (e) {}
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSalas()
  intervalId = setInterval(fetchSalas, 5000)
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
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
</style> 