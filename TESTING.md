# Pruebas de Restricciones de Reservas

## Nuevas Restricciones Implementadas

1. **Solo usuarios autenticados pueden reservar** - Los invitados (modo anónimo) no pueden hacer reservas.
2. **Máximo 1 reserva por día por usuario** - Un usuario puede tener múltiples reservas, pero solo 1 por fecha.
3. **Cancelación de reservas** - Los usuarios pueden cancelar sus reservas futuras desde "Mis Reservas".

## Cómo Probar

### Prueba 1: Bloquear reservas de invitados

1. Abre el navegador en modo incógnito o borra `localStorage`
2. Ve a la página principal y haz clic en "Continuar como invitado" (si existe esa opción)
3. Intenta ir a `/reserve` y hacer una reserva
4. **Resultado esperado**: 
   - El frontend debe mostrar un toast/error: "Debes iniciar sesión para hacer una reserva..."
   - Te redirige a `/login` después de 2 segundos
   - Si el frontend no detecta (y envía la petición), el backend rechaza con: "Debes iniciar sesión con una cuenta registrada..."

### Prueba 2: Limitar a 1 reserva por día (nueva lógica)

1. Inicia sesión con un usuario registrado (con email y password en la base de datos)
2. Haz una reserva exitosa para **mañana** (fecha específica)
3. Intenta hacer una segunda reserva para la **misma fecha** (puede ser otra hora u otra sala)
4. **Resultado esperado**:
   - Al seleccionar la fecha, aparece un toast de advertencia: "Ya tienes una reserva para el [fecha]..."
   - Si intentas enviar el formulario, muestra error: "Ya tienes una reserva para esta fecha. Solo se permite 1 reserva por día."
   - El backend también rechaza con: "Ya tienes una reserva para esta fecha..."
5. Haz una reserva para **pasado mañana** (fecha diferente)
6. **Resultado esperado**: ✅ Reserva exitosa (porque es otra fecha)

### Prueba 3: Usuario sin contraseña (creado automáticamente)

Si en algún momento se crearon usuarios sin contraseña en la base de datos (antes de esta actualización):

1. Intenta hacer login con un email que existe pero sin password en la base
2. Login debe fallar con: "Este usuario no tiene contraseña asignada..."
3. Si intentas reservar con ese email directamente (bypass), el backend rechaza con: "Debes iniciar sesión con una cuenta registrada..."

### Prueba 4: Página "Mis Reservas"

1. Inicia sesión con un usuario que tiene reservas
2. Ve a `/mis-reservas` (o haz clic en "Mis Reservas" en el menú)
3. **Resultado esperado**:
   - Verás tus reservas activas (≥ hoy) en formato de cards
   - Verás tu historial de reservas pasadas (< hoy) en una tabla
   - Cada reserva activa tiene un botón "Cancelar Reserva"
4. Haz clic en "Cancelar Reserva" en una reserva activa
5. **Resultado esperado**:
   - Aparece un modal de confirmación
   - Al confirmar, la reserva se elimina
   - La lista se recarga automáticamente
   - Toast de éxito: "Reserva cancelada exitosamente"

### Prueba 5: Advertencia automática al seleccionar fecha

1. Inicia sesión y crea una reserva para mañana
2. Ve a `/reserve`
3. Selecciona la **misma fecha** en el calendario
4. **Resultado esperado**:
   - Automáticamente aparece un toast de advertencia (sin hacer clic en enviar)
   - El mensaje dice: "Ya tienes una reserva para el [fecha]. Solo se permite 1 reserva por día."
5. Selecciona una **fecha diferente**
6. **Resultado esperado**: No aparece advertencia

### Prueba 6: No se pueden cancelar reservas pasadas

1. Usa SQL o el backend para crear una reserva con fecha pasada
2. Ve a `/mis-reservas`
3. La reserva aparece en "Historial" (no en "Activas")
4. **Resultado esperado**: No hay botón de cancelar en reservas del historial
5. Si intentas hacer DELETE directo a `/api/reserve/[id]` con una reserva pasada:
6. **Resultado esperado**: Backend rechaza con "No puedes cancelar una reserva pasada"

## Verificación en Base de Datos

Puedes verificar las reservas activas de un usuario ejecutando:

```sql
SELECT * FROM reserve 
WHERE user_id = <ID_DEL_USUARIO> 
  AND reservation_date >= CURRENT_DATE;
```

Si hay 1 o más filas, ese usuario ya tiene reservas activas y no podrá crear otra.

## Notas de Seguridad

- Las contraseñas están en texto plano (solo para académico/desarrollo). En producción, usa bcrypt o similar.
- La validación de invitados se hace en frontend Y backend (defensa en profundidad).
- La validación de "1 reserva por usuario" solo se hace en backend (más segura).

## Próximos Pasos (Opcional)

- Agregar página "Mis Reservas" donde el usuario vea su reserva activa y pueda cancelarla.
- Permitir 1 reserva futura adicional si la actual ya pasó (cambiar lógica de `>= CURRENT_DATE`).
- Notificar al usuario en el frontend cuando ya tiene una reserva (antes de enviar el formulario).
