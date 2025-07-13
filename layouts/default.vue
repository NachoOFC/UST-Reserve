<template>
  <div class="min-h-screen bg-ust-50 font-sans">
    <!-- Barra superior institucional -->
    <header class="st-barra-institucional text-white shadow-md">
      <div class="max-w-7xl mx-auto flex items-center h-16 px-4">
        <img src="/image.png" alt="Logo Santo Tomás" class="h-10 w-10 rounded-full mr-4 border-2 border-white bg-white object-contain" />
        <span class="text-2xl font-bold tracking-wide">SANTO TOMÁS</span>
        <nav class="ml-auto flex gap-6">
          <NuxtLink to="/" class="hover:text-ust-accent-400 transition">Inicio</NuxtLink>
          <NuxtLink to="/gps" class="hover:text-ust-accent-400 transition">Buscar Sala</NuxtLink>
          <NuxtLink to="/reserve" class="hover:text-ust-accent-400 transition">Reservar</NuxtLink>
          <NuxtLink to="/crud" class="hover:text-ust-accent-400 transition">CRUD</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="pt-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
// No logic needed for layout
</script>

<style scoped>
.st-barra-institucional {
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.54) 0%, rgba(0,0,0,0)), linear-gradient(to bottom, #004f45, #004f45);
  background-color: #004f45;
}
header {
  /* Sombra sutil para la barra */
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
</style> 