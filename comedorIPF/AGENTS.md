# AGENTS.md — Comedor IPF

## 1. Propósito

Este repositorio implementa el Trabajo Práctico N.º 2 de React Native II del Instituto Politécnico Formosa.

La fuente funcional principal es:

- `docs/sdd/spec.md` → qué debe hacer el sistema.
- `docs/sdd/plan.md` → cómo se organizará la implementación.
- `docs/sdd/tasks.md` → orden concreto de trabajo.
- `docs/sdd/acceptance.md` → cómo verificar que cada requisito funciona.
- `docs/sdd/traceability.md` → relación entre consigna, archivos y pruebas.

La consigna original del trabajo está fuera de este paquete SDD. No reemplazar sus requisitos por decisiones del agente.

## 2. Regla principal: SDD

No implementar una funcionalidad nueva solo porque el usuario la describa en un prompt aislado.

Flujo obligatorio:

1. Leer `docs/sdd/spec.md`.
2. Leer la tarea correspondiente en `docs/sdd/tasks.md`.
3. Revisar las restricciones de `docs/sdd/implementation-protocol.md`.
4. Implementar únicamente el alcance de esa tarea.
5. Ejecutar las verificaciones indicadas.
6. Actualizar el estado de la tarea.
7. Mantener la especificación y el código sincronizados.

La especificación es la fuente de verdad del comportamiento. El código es la implementación.

## 3. Restricciones técnicas obligatorias

- React Native con Expo Router.
- Expo SDK 57.
- TypeScript.
- Rutas dentro de `src/app`.
- Componentes reutilizables dentro de `src/components`.
- Datos de ejemplo dentro de `src/data`.
- Estructuras de datos dentro de `src/estructuras`.
- Estado global dentro de `src/context`.
- Tabs desde `expo-router/js-tabs`.
- Drawer desde `expo-router/drawer`.
- `GestureHandlerRootView` en el layout raíz.
- Scheme de la aplicación: `comedoripf`.
- Rutas tipadas activas.
- Paquetes nuevos instalados solamente con `npx expo install`.
- No instalar `@react-navigation/drawer` de forma manual para resolver el Drawer de este TP.
- No usar `Array.prototype.shift()` en `Cola`.
- `Pila` y `Cola` deben usar campos privados JavaScript `#items`.
- No mover componentes reutilizables dentro de `src/app`.
- No usar almacenamiento externo ni backend: este TP es una demostración local y su estado vive en Context.
- No agregar librerías de UI innecesarias.

## 4. Reglas de arquitectura

### `src/app`
Solo rutas, layouts y archivos especiales de Expo Router.

Permitidos:
- `index.tsx`
- `[param].tsx`
- `[...slug].tsx`
- `_layout.tsx`
- `+not-found.tsx`
- archivos que representen una ruta requerida por la especificación

No colocar allí:
- `Button.tsx`
- `Card.tsx`
- `Header.tsx`
- datos
- clases de estructuras
- hooks reutilizables
- lógica global

### `src/components`
Componentes reutilizables.

### `src/data`
Datos estáticos de platos y categorías.

### `src/estructuras`
Implementaciones de:
- `Pila`
- `Cola`

### `src/context`
Provider y estado global del sistema.

## 5. Navegación

Regla obligatoria:

- Usar `<Link>` cuando la navegación nace de una interacción directa del usuario.
- Usar `router` cuando primero debe ejecutarse lógica y luego navegar.

Para el flujo de confirmación:

`/confirmar` → `/turno/[numero]`

usar `router.replace(...)`, no `router.push(...)`, para que "atrás" no vuelva a la confirmación.

Para `/pedido` usar `<Redirect href="/carrito" />`.

## 6. Rutas protegidas

El layout raíz controla:

- `/login` → disponible solo sin sesión.
- `/cocina` y su sección → disponible solo con sesión.

Usar `Stack.Protected`.

No crear guardas duplicados con `<Redirect>` dentro de cada pantalla si el comportamiento ya está cubierto por el layout raíz.

La pérdida de sesión debe permitir que el navegador protegido quite automáticamente la sección de cocina del historial.

## 7. Parámetros

Los parámetros dinámicos llegan como texto.

Ejemplos:

- `/menu/[id]` → convertir/validar `id`.
- `/categorias/[categoria]` → validar categoría.
- `/buscar?q=&categoria=` → usar `useLocalSearchParams()`.

El buscador debe modificar la URL con `router.setParams(...)`, no crear una pantalla nueva por cada texto escrito.

## 8. Calidad y estilo

- TypeScript claro y directo.
- Preferir componentes funcionales.
- Preferir arrow functions para funciones internas cuando sea natural.
- Evitar abstracciones innecesarias.
- No introducir patrones avanzados que no sean necesarios para la defensa oral.
- Mantener nombres en español coherentes con la consigna.
- No agregar comentarios artificiales o extensos.
- No ocultar errores de TypeScript con `any` salvo que exista una razón documentada.
- No borrar una funcionalidad para hacer pasar una verificación.

## 9. Dependencias

Antes de instalar cualquier dependencia:

1. comprobar si ya existe;
2. comprobar si Expo SDK 57 la necesita;
3. usar `npx expo install <paquete>`;
4. no usar `npm install` para dependencias del ecosistema Expo/React Native en este TP.

## 10. Limpieza inicial

Después de que el alumno cree el proyecto Expo, el primer trabajo del agente será limpiar el template automático.

La limpieza:

- debe detectar qué archivos son del ejemplo inicial;
- puede eliminar las pantallas/demo que serán reemplazadas;
- puede eliminar componentes demo que ya no se usarán;
- no debe borrar `package.json`, `app.json/app.config.*`, `tsconfig.json`, assets necesarios, configuración Git ni archivos de configuración sin comprobar antes;
- no debe instalar dependencias durante la limpieza;
- no debe implementar funcionalidades todavía.

Usar `docs/sdd/prompts/00-preflight-and-cleanup.md`.

## 11. Verificación mínima por tarea

Antes de marcar una tarea como completada:

- TypeScript sin errores.
- Rutas compilables.
- No introducir rutas fuera de la estructura definida.
- Verificar el escenario de aceptación de la tarea.
- Si una verificación no puede ejecutarse, dejar constancia del motivo.

## 12. Qué hacer ante un conflicto

Prioridad:

1. Consigna del TP.
2. `docs/sdd/spec.md`.
3. `docs/sdd/plan.md`.
4. `docs/sdd/tasks.md`.
5. Código existente.
6. Preferencias del agente.

Si una petición nueva contradice la consigna, no modificar silenciosamente la especificación. Informar el conflicto y proponer una modificación explícita del SDD antes de tocar el código.

## 13. Regla de cambios

No reestructurar todo el proyecto para una tarea pequeña.

Cada cambio debe ser:
- trazable a una tarea;
- pequeño;
- verificable;
- fácil de explicar en una defensa oral.
