<template>
  <div class="min-h-screen bg-ust-200 font-sans">
    <!-- Header con gradiente UST más alto -->
    <div class="gradient-ust text-white py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4">TomasinoSpace</h1>
        <p class="text-xl opacity-90">Sistema de gestión de salas de estudio - Universidad Santo Tomás</p>
      </div>
    </div>

    <div class="py-12 px-4 max-w-6xl mx-auto">
      <!-- Sección principal -->
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-ust-800 mb-4">Gestión Inteligente de Salas</h2>
        <p class="text-lg text-ust-700 max-w-3xl mx-auto">
          Encuentra, reserva y administra espacios de estudio de forma inteligente y eficiente. 
          Diseñado especialmente para la comunidad de la Universidad Santo Tomás.
        </p>
      </div>

      <!-- Cards principales -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Card Reservar -->
        <div class="card-ust flex flex-col items-center border-t-4 border-ust-500 hover:shadow-xl transition-shadow duration-300">
          <div class="mb-6 text-ust-500">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-ust-800 mb-3">Reservar Sala</h3>
          <p class="text-gray-600 mb-6 text-center">Agenda tu sala de estudio con anticipación y asegura tu espacio ideal para el aprendizaje.</p>
          <NuxtLink to="/reserve" class="btn-ust text-lg px-8 py-3">
            Hacer Reserva
          </NuxtLink>
        </div>

        <!-- Card Buscar -->
        <div class="card-ust flex flex-col items-center border-t-4 border-ust-accent-500 hover:shadow-xl transition-shadow duration-300">
          <div class="mb-6 text-ust-accent-500">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-ust-800 mb-3">Buscar Sala</h3>
          <p class="text-gray-600 mb-6 text-center">Encuentra salas disponibles en tiempo real y consulta su ubicación exacta en el campus.</p>
          <NuxtLink to="/gps" class="btn-ust-outline text-lg px-8 py-3">
            Buscar Ahora
          </NuxtLink>
        </div>

        <!-- Card CRUD -->
        <div class="card-ust flex flex-col items-center border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
          <div class="mb-6 text-blue-500">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-blue-800 mb-3">CRUD de Salas</h3>
          <p class="text-gray-600 mb-6 text-center">Administra, crea, edita y elimina salas de estudio fácilmente.</p>
          <NuxtLink to="/crud" class="btn-ust-outline text-lg px-8 py-3">
            Ir al CRUD
          </NuxtLink>
        </div>
      </div>

      <!-- Sección de características -->
      <div class="card-ust">
        <h3 class="text-3xl font-bold text-ust-800 mb-8 text-center">¿Por qué elegir StudyRoom?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col items-center text-center">
            <div class="mb-4 p-3 bg-ust-100 rounded-full">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="text-ust-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-ust-800 mb-2 text-lg">Disponibilidad 24/7</h4>
            <p class="text-gray-600">Reserva en cualquier momento del día, adaptándose a tu horario de estudio.</p>
          </div>
          
          <div class="flex flex-col items-center text-center">
            <div class="mb-4 p-3 bg-ust-100 rounded-full">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="text-ust-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-ust-800 mb-2 text-lg">Ubicación Precisa</h4>
            <p class="text-gray-600">Encuentra salas con GPS integrado y navegación intuitiva por el campus.</p>
          </div>
          
          <div class="flex flex-col items-center text-center">
            <div class="mb-4 p-3 bg-ust-100 rounded-full">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="text-ust-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-ust-800 mb-2 text-lg">Fácil de Usar</h4>
            <p class="text-gray-600">Interfaz intuitiva y rápida, diseñada pensando en la experiencia del usuario.</p>
          </div>
        </div>
      </div>

      <!-- Footer informativo -->
      <div class="mt-12 text-center">
        <p class="text-ust-600 font-medium">
          Desarrollado para la comunidad de la Universidad Santo Tomás
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    fetch('/api/study-rooms')
      .then(res => res.json())
      .then(data => {
        // Data loaded successfully
      })
      .catch(err => {
        console.error('Error al obtener las salas:', err)
      })
  }
}
</script>

<style scoped>
</style>