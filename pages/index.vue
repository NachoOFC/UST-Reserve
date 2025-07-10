<template>
  <div class="min-h-screen bg-staccent font-sans">
         <div class="bg-blue-500 text-white p-10">
       ¿Ves este fondo azul?
     </div>
    <div class="py-10 px-4 max-w-4xl mx-auto">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-stgreen mb-2">StudyRoom</h1>
        <p class="text-lg text-stgreen-dark">Gestión avanzada de salas de estudio. Encuentra, reserva y administra espacios de forma inteligente y eficiente.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Card Reservar -->
        <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border-t-4 border-stgreen">
          <div class="mb-4 text-stgreen">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-stgreen mb-2">Reservar Sala</h2>
          <p class="text-gray-700 mb-4">Agenda tu sala de estudio con anticipación y asegura tu espacio ideal.</p>
          <NuxtLink to="/reserve" class="btn bg-stgreen text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-stgreen-light transition">Hacer Reserva</NuxtLink>
        </div>
        <!-- Card Buscar -->
        <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border-t-4 border-stgreen-light">
          <div class="mb-4 text-stgreen-light">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-stgreen-light mb-2">Buscar Sala</h2>
          <p class="text-gray-700 mb-4">Encuentra salas disponibles en tiempo real y consulta su ubicación.</p>
          <NuxtLink to="/gps" class="btn bg-stgreen-light text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-stgreen transition">Buscar Ahora</NuxtLink>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h3 class="text-2xl font-bold text-stgreen mb-6 text-center">¿Por qué elegir StudyRoom?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center">
            <div class="mb-2 text-stgreen-dark">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-stgreen-dark mb-1">Disponibilidad 24/7</h4>
            <p class="text-gray-600 text-center">Reserva en cualquier momento del día.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="mb-2 text-stgreen">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-stgreen mb-1">Ubicación Precisa</h4>
            <p class="text-gray-600 text-center">Encuentra salas con GPS integrado.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="mb-2 text-stgreen-light">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 class="font-semibold text-stgreen-light mb-1">Fácil de Usar</h4>
            <p class="text-gray-600 text-center">Interfaz intuitiva y rápida.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<!-- Elimino estilos scoped para que predomine Tailwind -->
<style scoped>
</style>