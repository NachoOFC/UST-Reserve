import { _ as __nuxt_component_0 } from './nuxt-link-CMnQ35tH.mjs';
import { mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
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
  name: "ReservePage",
  data() {
    return {
      appTitle: "StudyRoom",
      pageTitle: "Reservar Sala de Estudio",
      pageSubtitle: "Completa los datos para reservar tu espacio ideal",
      submitButtonText: "Confirmar Reserva",
      currentYear: (/* @__PURE__ */ new Date()).getFullYear(),
      navigationItems: [
        { id: "home", text: "Inicio", link: "/" },
        { id: "search", text: "Buscar Sala", link: "/gps" }
      ],
      formData: {
        nombre: "",
        email: "",
        fecha: "",
        hora: "",
        duracion: "",
        tipoSala: "",
        equipos: [],
        comentarios: ""
      },
      formLabels: {
        nombre: "Nombre Completo",
        email: "Email",
        fecha: "Fecha",
        hora: "Hora de Inicio",
        duracion: "Duraci\xF3n",
        tipoSala: "Tipo de Sala",
        equipos: "Equipamiento Necesario",
        comentarios: "Comentarios Adicionales"
      },
      formPlaceholders: {
        nombre: "Ingresa tu nombre completo",
        email: "tu@email.com",
        duracion: "Selecciona duraci\xF3n",
        tipoSala: "Selecciona tipo",
        comentarios: "Agrega cualquier comentario o requerimiento especial..."
      },
      durationOptions: [
        { value: "1", label: "1 hora" },
        { value: "2", label: "2 horas" },
        { value: "3", label: "3 horas" },
        { value: "4", label: "4 horas" },
        { value: "6", label: "6 horas" },
        { value: "8", label: "8 horas" }
      ],
      roomTypeOptions: [
        { value: "individual", label: "Individual" },
        { value: "grupal", label: "Grupal (2-4 personas)" },
        { value: "conferencia", label: "Conferencia (5-10 personas)" },
        { value: "silenciosa", label: "Silenciosa" }
      ],
      equipmentOptions: [
        { value: "proyector", label: "Proyector" },
        { value: "wifi", label: "WiFi" },
        { value: "pizarra", label: "Pizarra" },
        { value: "computadora", label: "Computadora" }
      ],
      infoCards: [
        {
          id: "cancellation",
          title: "Pol\xEDtica de Cancelaci\xF3n",
          description: "Puedes cancelar tu reserva hasta 2 horas antes del inicio sin penalizaci\xF3n.",
          bgColor: "bg-ust-100",
          iconColor: "text-ust-600",
          iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          id: "confirmation",
          title: "Confirmaci\xF3n Inmediata",
          description: "Recibir\xE1s una confirmaci\xF3n por email inmediatamente despu\xE9s de la reserva.",
          bgColor: "bg-ust-accent-100",
          iconColor: "text-ust-accent-600",
          iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
          id: "support",
          title: "Soporte 24/7",
          description: "Nuestro equipo est\xE1 disponible para ayudarte en cualquier momento.",
          bgColor: "bg-ust-100",
          iconColor: "text-ust-600",
          iconPath: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }
      ]
    };
  },
  methods: {
    handleNavigation(navId) {
      console.log("Navegaci\xF3n a:", navId);
      switch (navId) {
        case "home":
          this.$router.push("/");
          break;
        case "search":
          this.$router.push("/gps");
          break;
      }
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      console.log("Datos de reserva:", this.formData);
      this.showSuccessMessage();
      this.resetForm();
    },
    validateForm() {
      if (!this.formData.nombre || !this.formData.email || !this.formData.fecha || !this.formData.hora || !this.formData.duracion || !this.formData.tipoSala) {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        alert("Por favor, ingresa un email v\xE1lido.");
        return false;
      }
      const selectedDate = new Date(this.formData.fecha);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        alert("La fecha no puede ser anterior a hoy.");
        return false;
      }
      return true;
    },
    showSuccessMessage() {
      alert("\xA1Reserva enviada correctamente! Te contactaremos pronto.");
    },
    resetForm() {
      this.formData = {
        nombre: "",
        email: "",
        fecha: "",
        hora: "",
        duracion: "",
        tipoSala: "",
        equipos: [],
        comentarios: ""
      };
    },
    // Método para inicializar la página
    initializePage() {
      console.log("P\xE1gina de reserva inicializada");
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      this.formData.fecha = today;
    }
  },
  mounted() {
    this.initializePage();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-ust-50 to-ust-100 font-sans" }, _attrs))}><header class="gradient-ust text-white shadow-lg"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "flex-shrink-0"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h1 class="text-2xl font-bold"${_scopeId}>${ssrInterpolate($data.appTitle)}</h1>`);
      } else {
        return [
          createVNode("h1", { class: "text-2xl font-bold" }, toDisplayString($data.appTitle), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><nav class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!--[-->`);
  ssrRenderList($data.navigationItems, (navItem) => {
    _push(ssrRenderComponent(_component_NuxtLink, {
      key: navItem.id,
      to: navItem.link,
      class: "text-white hover:text-ust-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
      onClick: ($event) => $options.handleNavigation(navItem.id)
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`${ssrInterpolate(navItem.text)}`);
        } else {
          return [
            createTextVNode(toDisplayString(navItem.text), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div></nav></div></div></header><main class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><h2 class="text-4xl font-bold text-ust-800 sm:text-5xl mb-4">${ssrInterpolate($data.pageTitle)}</h2><p class="text-xl text-ust-700">${ssrInterpolate($data.pageSubtitle)}</p></div><div class="card-ust"><form class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="nombre" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.nombre)}</label><input type="text" id="nombre"${ssrRenderAttr("value", $data.formData.nombre)} required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"${ssrRenderAttr("placeholder", $data.formPlaceholders.nombre)}></div><div><label for="email" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.email)}</label><input type="email" id="email"${ssrRenderAttr("value", $data.formData.email)} required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"${ssrRenderAttr("placeholder", $data.formPlaceholders.email)}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="fecha" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.fecha)}</label><input type="date" id="fecha"${ssrRenderAttr("value", $data.formData.fecha)} required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"></div><div><label for="hora" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.hora)}</label><input type="time" id="hora"${ssrRenderAttr("value", $data.formData.hora)} required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="duracion" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.duracion)}</label><select id="duracion" required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"><option value=""${ssrIncludeBooleanAttr(Array.isArray($data.formData.duracion) ? ssrLooseContain($data.formData.duracion, "") : ssrLooseEqual($data.formData.duracion, "")) ? " selected" : ""}>${ssrInterpolate($data.formPlaceholders.duracion)}</option><!--[-->`);
  ssrRenderList($data.durationOptions, (duration) => {
    _push(`<option${ssrRenderAttr("value", duration.value)}${ssrIncludeBooleanAttr(Array.isArray($data.formData.duracion) ? ssrLooseContain($data.formData.duracion, duration.value) : ssrLooseEqual($data.formData.duracion, duration.value)) ? " selected" : ""}>${ssrInterpolate(duration.label)}</option>`);
  });
  _push(`<!--]--></select></div><div><label for="tipoSala" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.tipoSala)}</label><select id="tipoSala" required class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"><option value=""${ssrIncludeBooleanAttr(Array.isArray($data.formData.tipoSala) ? ssrLooseContain($data.formData.tipoSala, "") : ssrLooseEqual($data.formData.tipoSala, "")) ? " selected" : ""}>${ssrInterpolate($data.formPlaceholders.tipoSala)}</option><!--[-->`);
  ssrRenderList($data.roomTypeOptions, (roomType) => {
    _push(`<option${ssrRenderAttr("value", roomType.value)}${ssrIncludeBooleanAttr(Array.isArray($data.formData.tipoSala) ? ssrLooseContain($data.formData.tipoSala, roomType.value) : ssrLooseEqual($data.formData.tipoSala, roomType.value)) ? " selected" : ""}>${ssrInterpolate(roomType.label)}</option>`);
  });
  _push(`<!--]--></select></div></div><div><label class="block text-sm font-medium text-ust-700 mb-4">${ssrInterpolate($data.formLabels.equipos)}</label><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><!--[-->`);
  ssrRenderList($data.equipmentOptions, (equipment) => {
    _push(`<label class="flex items-center p-3 border border-ust-200 rounded-lg hover:bg-ust-50 transition-colors duration-200"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray($data.formData.equipos) ? ssrLooseContain($data.formData.equipos, equipment.value) : $data.formData.equipos) ? " checked" : ""}${ssrRenderAttr("value", equipment.value)} class="rounded border-ust-300 text-ust-600 focus:ring-ust-500"><span class="ml-3 text-sm text-ust-700">${ssrInterpolate(equipment.label)}</span></label>`);
  });
  _push(`<!--]--></div></div><div><label for="comentarios" class="block text-sm font-medium text-ust-700 mb-2">${ssrInterpolate($data.formLabels.comentarios)}</label><textarea id="comentarios" rows="4" class="w-full px-4 py-3 border border-ust-200 rounded-lg focus:ring-2 focus:ring-ust-500 focus:border-transparent transition-colors duration-200"${ssrRenderAttr("placeholder", $data.formPlaceholders.comentarios)}>${ssrInterpolate($data.formData.comentarios)}</textarea></div><div class="flex justify-center pt-6"><button type="submit" class="btn-ust text-lg px-12 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">${ssrInterpolate($data.submitButtonText)}</button></div></form></div><div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
  ssrRenderList($data.infoCards, (infoCard) => {
    _push(`<div class="card-ust text-center hover:shadow-xl transition-shadow duration-300"><div class="${ssrRenderClass([infoCard.bgColor, "flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto"])}"><svg class="${ssrRenderClass([infoCard.iconColor, "w-8 h-8"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", infoCard.iconPath)}></path></svg></div><h3 class="text-lg font-semibold text-ust-800 mb-3">${ssrInterpolate(infoCard.title)}</h3><p class="text-ust-600 text-sm">${ssrInterpolate(infoCard.description)}</p></div>`);
  });
  _push(`<!--]--></div></main><footer class="bg-ust-800 mt-20"><div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"><div class="text-center"><p class="text-ust-100">\xA9 ${ssrInterpolate($data.currentYear)} ${ssrInterpolate($data.appTitle)}. Todos los derechos reservados.</p></div></div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reserve.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reserve = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { reserve as default };
//# sourceMappingURL=reserve-Dm60uVBy.mjs.map
