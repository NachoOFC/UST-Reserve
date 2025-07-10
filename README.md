# AyudaST - Despliegue en Netlify

## Pasos para desplegar en Netlify

1. **Haz push de tu código a GitHub, GitLab o Bitbucket.**

2. **Entra a [Netlify](https://app.netlify.com/) y crea un nuevo sitio desde Git.**

3. **Configura los siguientes parámetros:**

- **Build command:**

```
npm run build
```

- **Publish directory:**

```
.\.output\public
```

> Si usas Nuxt 3 con preset `netlify`, la carpeta de salida es `.output/public`.

4. **(Opcional) Variables de entorno:**

Si necesitas variables de entorno, agrégalas en la sección "Environment variables" de Netlify.

5. **Haz deploy!**

---

## Notas
- Si tienes errores de estilos, asegúrate de que el build se haya hecho después de cualquier cambio en `tailwind.config.mjs`.
- Si usas rutas personalizadas, revisa la documentación de Nuxt 3 + Netlify para redirects.

---

¡Listo para desplegar en Netlify 🚀!
