<template>
  <div class="max-w-2xl mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6 text-center">CRUD de Salas de Estudio</h1>

    <!-- Formulario para crear o editar -->
    <form @submit.prevent="onSubmit" class="mb-6 flex flex-col gap-3 bg-white p-4 rounded shadow">
      <input v-model="form.name" type="text" placeholder="Nombre de la sala" class="border p-2 rounded" required />
      <input v-model.number="form.number" type="number" placeholder="Número de sala" class="border p-2 rounded" required />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ form.id ? 'Actualizar' : 'Crear' }} Sala
      </button>
      <button v-if="form.id" type="button" @click="resetForm" class="text-sm text-gray-500 mt-1">Cancelar edición</button>
    </form>

    <!-- Listado de salas -->
    <div v-if="rooms.length" class="bg-white rounded shadow p-4">
      <h2 class="text-xl font-semibold mb-4">Salas registradas</h2>
      <table class="w-full text-left">
        <thead>
          <tr>
            <th class="py-2">ID</th>
            <th class="py-2">Nombre</th>
            <th class="py-2">Número</th>
            <th class="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.id">
            <td class="py-1">{{ room.id }}</td>
            <td class="py-1">{{ room.name }}</td>
            <td class="py-1">{{ room.number }}</td>
            <td class="py-1 flex gap-2">
              <button @click="editRoom(room)" class="text-blue-600">Editar</button>
              <button @click="deleteRoom(room.id)" class="text-red-600">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500 mt-8">No hay salas registradas.</div>
  </div>
</template>

<script>
export default {
  name: 'CrudSalas',
  data() {
    return {
      rooms: [],
      form: { id: null, name: '', number: null }
    }
  },
  methods: {
    async fetchRooms() {
      const res = await fetch('/api/study-rooms')
      this.rooms = await res.json()
    },
    resetForm() {
      this.form = { id: null, name: '', number: null }
    },
    editRoom(room) {
      this.form = { ...room }
    },
    async onSubmit() {
      if (this.form.id) {
        // Actualizar
        await fetch(`/api/study-rooms/${this.form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.form.name, number: this.form.number })
        })
      } else {
        // Crear
        await fetch('/api/study-rooms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.form.name, number: this.form.number })
        })
      }
      this.resetForm()
      await this.fetchRooms()
    },
    async deleteRoom(id) {
      await fetch(`/api/study-rooms/${id}`, { method: 'DELETE' })
      await this.fetchRooms()
    }
  },
  mounted() {
    this.fetchRooms()
  }
}
</script>

<style scoped>
input:focus {
  outline: 2px solid #2563eb;
}
</style> 