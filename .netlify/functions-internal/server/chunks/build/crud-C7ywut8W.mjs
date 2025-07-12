import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  name: "CrudSalas",
  data() {
    return {
      rooms: [],
      form: { id: null, name: "", number: null }
    };
  },
  methods: {
    async fetchRooms() {
      const res = await fetch("/api/study-rooms");
      this.rooms = await res.json();
    },
    resetForm() {
      this.form = { id: null, name: "", number: null };
    },
    editRoom(room) {
      this.form = { ...room };
    },
    async onSubmit() {
      if (this.form.id) {
        await fetch(`/api/study-rooms/${this.form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.form.name, number: this.form.number })
        });
      } else {
        await fetch("/api/study-rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.form.name, number: this.form.number })
        });
      }
      this.resetForm();
      await this.fetchRooms();
    },
    async deleteRoom(id) {
      await fetch(`/api/study-rooms/${id}`, { method: "DELETE" });
      await this.fetchRooms();
    }
  },
  mounted() {
    this.fetchRooms();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10" }, _attrs))} data-v-de5f93d4><h1 class="text-3xl font-bold mb-6 text-center" data-v-de5f93d4>CRUD de Salas de Estudio</h1><form class="mb-6 flex flex-col gap-3 bg-white p-4 rounded shadow" data-v-de5f93d4><input${ssrRenderAttr("value", $data.form.name)} type="text" placeholder="Nombre de la sala" class="border p-2 rounded" required data-v-de5f93d4><input${ssrRenderAttr("value", $data.form.number)} type="number" placeholder="N\xFAmero de sala" class="border p-2 rounded" required data-v-de5f93d4><button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" data-v-de5f93d4>${ssrInterpolate($data.form.id ? "Actualizar" : "Crear")} Sala </button>`);
  if ($data.form.id) {
    _push(`<button type="button" class="text-sm text-gray-500 mt-1" data-v-de5f93d4>Cancelar edici\xF3n</button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</form>`);
  if ($data.rooms.length) {
    _push(`<div class="bg-white rounded shadow p-4" data-v-de5f93d4><h2 class="text-xl font-semibold mb-4" data-v-de5f93d4>Salas registradas</h2><table class="w-full text-left" data-v-de5f93d4><thead data-v-de5f93d4><tr data-v-de5f93d4><th class="py-2" data-v-de5f93d4>ID</th><th class="py-2" data-v-de5f93d4>Nombre</th><th class="py-2" data-v-de5f93d4>N\xFAmero</th><th class="py-2" data-v-de5f93d4>Acciones</th></tr></thead><tbody data-v-de5f93d4><!--[-->`);
    ssrRenderList($data.rooms, (room) => {
      _push(`<tr data-v-de5f93d4><td class="py-1" data-v-de5f93d4>${ssrInterpolate(room.id)}</td><td class="py-1" data-v-de5f93d4>${ssrInterpolate(room.name)}</td><td class="py-1" data-v-de5f93d4>${ssrInterpolate(room.number)}</td><td class="py-1 flex gap-2" data-v-de5f93d4><button class="text-blue-600" data-v-de5f93d4>Editar</button><button class="text-red-600" data-v-de5f93d4>Eliminar</button></td></tr>`);
    });
    _push(`<!--]--></tbody></table></div>`);
  } else {
    _push(`<div class="text-center text-gray-500 mt-8" data-v-de5f93d4>No hay salas registradas.</div>`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/crud.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const crud = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-de5f93d4"]]);

export { crud as default };
//# sourceMappingURL=crud-C7ywut8W.mjs.map
