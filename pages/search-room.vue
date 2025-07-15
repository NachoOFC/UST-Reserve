<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] bg-white space-y-8">
    <PanoramaViewer />
    <a
      href="https://cloud.3dvista.com/hosting/6520281/87/index.htm"
      target="_blank"
      rel="noopener noreferrer"
      class="px-10 py-6 bg-emerald-600 text-white rounded-xl text-2xl font-bold shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300"
    >
      Tour 360
    </a>
  </div>
</template>

<script setup>
import PanoramaViewer from '~/components/PanoramaViewer.vue'
</script>

<style scoped>
</style> 