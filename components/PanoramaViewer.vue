<template>
  <div style="overflow: hidden; position: relative; width: 100%; height: 500px;">
    <div ref="viewerContainer" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'

const props = defineProps({
  panorama: {
    type: String,
    default: '/e271ec15-3740-4a2e-87eb-8fe9f8a3f2cd.png',
  },
})

const viewerContainer = ref(null)
let viewerInstance = null

function initViewer() {
  if (viewerInstance) {
    viewerInstance.setPanorama(props.panorama)
  } else {
    viewerInstance = new Viewer({
      container: viewerContainer.value,
      panorama: props.panorama,
    })
  }
}

onMounted(initViewer)
watch(() => props.panorama, initViewer)
</script> 