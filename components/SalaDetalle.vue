<template>
  <div v-if="sala" class="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-6">
    <h2 class="text-2xl font-bold mb-2">{{ sala.name }}</h2>
    <p class="mb-4 text-gray-700">{{ sala.description }}</p>
    <div v-if="sala.urlPanorama360">
      <div v-if="is3DVista(sala.urlPanorama360)" class="aspect-video w-full mb-4">
        <iframe
          :src="sala.urlPanorama360"
          width="100%"
          height="500"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div v-else>
        <PanoramaViewer :panorama="sala.urlPanorama360" />
      </div>
    </div>
    <div v-else class="text-gray-500">No hay vista 360 disponible.</div>
  </div>
  <div v-else class="text-center py-10 text-gray-400">Cargando sala...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PanoramaViewer from './PanoramaViewer.vue'

const sala = ref(null)
const route = useRoute()

function is3DVista(url) {
  return url && url.includes('3dvista.com')
}

async function fetchSala() {
  try {
    const res = await fetch(`/api/study-rooms/${route.params.id}`)
    if (res.ok) {
      sala.value = await res.json()
    }
  } catch (e) {}
}

onMounted(fetchSala)
</script> 