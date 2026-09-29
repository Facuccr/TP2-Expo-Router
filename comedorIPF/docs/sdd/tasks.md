# Tareas de implementación — Comedor IPF

Estados:
- `[ ]` pendiente
- `[~]` en progreso
- `[x]` terminado
- `[!]` bloqueado

No marcar una tarea como `[x]` si no pasó sus criterios de aceptación.

---

## EPIC 0 — Preparación

### T001 — Inspección del template Expo
- [x] Confirmar que el proyecto corre.
- [x] Confirmar Expo SDK 57.
- [x] Confirmar TypeScript.
- [x] Confirmar Expo Router.
- [x] Revisar scripts disponibles.
- [x] No cambiar dependencias todavía.

**Aceptación:** el proyecto es ejecutable y su configuración se entiende.

### T002 — Limpieza del template automático
- [x] Detectar rutas/demo generadas por create-expo-app.
- [x] Eliminar las pantallas demo que serán reemplazadas.
- [x] Eliminar componentes demo que no se reutilizarán.
- [x] Mantener configuración.
- [x] Mantener assets necesarios.
- [x] No instalar dependencias.

**Aceptación:** queda una base limpia sin pantallas demo innecesarias.

### T003 — Activar estructura `src/app`
- [x] Crear `src/app`.
- [x] Asegurar que Expo Router detecta la nueva estructura.
- [x] Crear los layouts base.

**Aceptación:** una ruta mínima ubicada en `src/app` puede ejecutarse.

---

## EPIC 1 — Datos y estructuras

### T010 — Modelo de datos
- [x] Crear tipos `Categoria`, `Plato`, `CartItem`, `Pedido`, `UndoAction`.
- [x] Centralizar tipos compartidos.

### T011 — Datos de platos
- [x] Crear `src/data/platos.ts`.
- [x] Agregar mínimo 12 platos.
- [x] Repartirlos en las cuatro categorías.
- [x] IDs únicos.

### T012 — Clase Pila
- [x] Campo privado `#items`.
- [x] `push`.
- [x] `pop`.
- [x] `tope`.
- [x] `vacia`.
- [x] `tamanio`.
- [x] `aArray` como copia.

**Aceptación:** cumple LIFO y no expone el array interno.

### T013 — Clase Cola
- [x] Campo privado `#items`.
- [x] Campo privado para el frente.
- [x] `encolar`.
- [x] `desencolar`.
- [x] `frente`.
- [x] `vacia`.
- [x] `tamanio`.
- [x] `aArray`.
- [x] No usar `shift`.

**Aceptación:** cumple FIFO.

---

## EPIC 2 — Estado global

### T020 — Tipos del Context
- [x] Definir estado y acciones.
- [x] Definir tipos de contexto.

### T021 — AppProvider
- [x] Sesión.
- [x] Carrito.
- [x] Cola.
- [x] Pila de undo.
- [x] Pila de atendidos.
- [x] Número correlativo.
- [x] Nota.
- [x] mecanismo de actualización de UI.

### T022 — Operaciones de carrito
- [x] Agregar plato.
- [x] Registrar undo.
- [x] Deshacer.
- [x] Calcular cantidad.
- [x] Calcular total.
- [x] Vaciar tras confirmación.

### T023 — Operaciones de pedido
- [x] Crear número correlativo.
- [x] Copiar snapshot del carrito.
- [x] Encolar.
- [x] Guardar nota.

### T024 — Operaciones de cocina
- [x] Obtener frente.
- [x] Atender siguiente.
- [x] Apilar atendido.
- [x] Consultar historial.

**Aceptación:** una única instancia lógica de Cola/Pila vive en el provider.

---

## EPIC 3 — Layout raíz y navegación

### T030 — Root Stack
- [x] `GestureHandlerRootView`.
- [x] `Stack`.
- [x] `(tabs)`.
- [x] `anchor`.
- [x] `confirmar` modal.

### T031 — Tabs
- [x] Importar Tabs desde `expo-router/js-tabs`.
- [x] Inicio.
- [x] Menú.
- [x] Carrito.
- [x] Iconos de `@expo/vector-icons`.

### T032 — Stack Menú
- [x] `/menu`.
- [x] `/menu/[id]`.

### T033 — Stack Carrito
- [x] `/carrito`.
- [x] `/carrito/nota`.

### T034 — Drawer Cocina
- [x] Importar Drawer desde `expo-router/drawer`.
- [x] `/cocina`.
- [x] `/cocina/atendidos`.

### T035 — Protected
- [x] Guard para cocina.
- [x] Guard inverso para login.
- [x] Verificar desaparición tras logout.

---

## EPIC 4 — Pantallas de consulta

### T040 — Inicio
- [x] Saludo.
- [x] Accesos a Menú, Buscar, Ayuda y Cocina.

### T041 — Menú
- [x] Agrupar o presentar platos por categoría.
- [x] Link a detalle.

### T042 — Detalle de plato
- [x] Validar id.
- [x] Mostrar nombre.
- [x] Mostrar precio.
- [x] Mostrar descripción.
- [x] Agregar al carrito.
- [x] Header con nombre.

### T043 — Categoría
- [x] Validar categoría.
- [x] Mostrar platos.
- [x] Mostrar error si no existe.

### T044 — Buscador
- [x] Leer `q`.
- [x] Leer `categoria`.
- [x] Filtrar.
- [x] Actualizar URL con `router.setParams`.
- [x] Crear Link compartible.

### T045 — Ayuda
- [x] Índice.
- [x] Catch-all.
- [x] Mostrar contenido según slug.

---

## EPIC 5 — Carrito y pedido

### T050 — Carrito
- [x] Lista.
- [x] Total.
- [x] Badge.
- [x] Deshacer.
- [x] Acceso a nota.
- [x] Confirmación.

### T051 — Nota
- [x] Editar nota.
- [x] Conservarla en Context.

### T052 — Confirmar
- [x] Modal.
- [x] Resumen.
- [x] Botón confirmar.
- [x] Crear pedido.
- [x] `router.replace`.

### T053 — Turno
- [x] Recibir número.
- [x] Mostrar número.
- [x] Calcular pedidos adelante.
- [x] Manejar pedido no encontrado.

---

## EPIC 6 — Cocina

### T060 — Login
- [x] Usuario.
- [x] Clave.
- [x] Credenciales fijas.
- [x] Establecer sesión.
- [x] Verificar que modal desaparece.

### T061 — Cocina
- [x] Mostrar frente.
- [x] Mostrar cantidad en espera.
- [x] Atender siguiente.
- [x] Mostrar estado sin pedidos.

### T062 — Atendidos
- [x] Obtener Pila.
- [x] Mostrar tope primero.
- [x] Mostrar datos del pedido.

### T063 — Logout
- [x] Cerrar sesión.
- [x] Verificar que cocina desaparece.
- [x] Verificar que historial protegido tampoco es accesible.

---

## EPIC 7 — Rutas especiales

### T070 — Redirect legado
- [ ] `/pedido` → `/carrito`.

### T071 — 404
- [ ] `+not-found.tsx`.
- [ ] Mostrar URL inexistente.

### T072 — DondeEstoy
- [ ] Crear componente.
- [ ] Mostrar pathname.
- [ ] Mostrar segments.
- [ ] Mostrar params.
- [ ] Insertar al final de cada pantalla.
- [ ] Respetar `DEBUG`.

### T073 — Typed routes
- [ ] Activar.
- [ ] Corregir todos los href.
- [ ] No usar rutas inexistentes.

---

## EPIC 8 — Configuración y deep links

### T080 — Scheme
- [ ] Configurar `comedoripf`.
- [ ] Verificar formato.

### T081 — Deep link
- [ ] Probar `/menu/7`.
- [ ] Anotar el link utilizado en README.
- [ ] Verificar que un id inexistente no rompe la app.

### T082 — Dependencias
- [ ] Revisar paquetes necesarios.
- [ ] Instalar solo con `npx expo install`.
- [ ] Verificar compatibilidad con SDK 57.

---

## EPIC 9 — Calidad y entregables

### T090 — Verificación funcional
- [ ] Carrito.
- [ ] Undo.
- [ ] Confirmación.
- [ ] Turno.
- [ ] Login.
- [ ] Logout.
- [ ] Cocina.
- [ ] Atendidos.
- [ ] Búsqueda.
- [ ] Categorías.
- [ ] Ayuda.
- [ ] Redirect.
- [ ] 404.

### T091 — Verificación estructural
- [ ] `src/app` solo contiene rutas/layouts/especiales.
- [ ] Componentes fuera de `src/app`.
- [ ] Datos fuera de `src/app`.
- [ ] Estructuras fuera de `src/app`.
- [ ] Context fuera de `src/app`.

### T092 — Auditoría de consigna
- [ ] Revisar G1.
- [ ] Revisar G2.
- [ ] Revisar G3.
- [ ] Revisar G4 opcional.
- [ ] Revisar G5.
- [ ] Revisar G6.
- [ ] Revisar G7.

### T093 — README final
- [ ] Árbol de `src/app`.
- [ ] Navegador de cada layout.
- [ ] Justificación `replace` vs `push`.
- [ ] Capturas/video.
- [ ] Deep link de prueba.
- [ ] Credenciales de cocina.

### T094 — RESPUESTAS.md
- [ ] Completar Partes A-F.
- [ ] Mantener respuestas en palabras propias del alumno.
