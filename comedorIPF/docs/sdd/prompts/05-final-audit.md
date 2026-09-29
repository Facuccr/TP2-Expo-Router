# Prompt 05 — Auditoría final del Trabajo Práctico

No implementes funcionalidades nuevas salvo correcciones estrictamente necesarias para cumplir la especificación.

Leé:

- `AGENTS.md`
- `docs/sdd/spec.md`
- `docs/sdd/plan.md`
- `docs/sdd/tasks.md`
- `docs/sdd/acceptance.md`
- `docs/sdd/traceability.md`

Hacé una auditoría completa.

## 1. Rutas

Comprobar una por una:

- `/`
- `/menu`
- `/menu/[id]`
- `/categorias/[categoria]`
- `/buscar?q=&categoria=`
- `/carrito`
- `/carrito/nota`
- `/confirmar`
- `/turno/[numero]`
- `/login`
- `/cocina`
- `/cocina/atendidos`
- `/ayuda`
- `/ayuda/...`
- `/pedido`
- 404

## 2. Navegación

Comprobar:

- `<Link>` para interacciones directas;
- `router` después de lógica;
- `replace` en confirmación;
- `router.setParams` en búsqueda;
- protected routes;
- logout sin `router.back()` manual.

## 3. Estructuras

Comprobar:

- Pila con `#items`;
- Cola con `#items`;
- Cola sin `shift()`;
- getters `vacia`;
- getter `tamanio`;
- `aArray()` como copia;
- FIFO;
- LIFO.

## 4. Context

Comprobar:

- provider en layout raíz;
- sesión global;
- carrito global;
- Cola global;
- Pila undo global;
- Pila atendidos global.

## 5. Datos

Comprobar:

- mínimo 12 platos;
- cuatro categorías;
- IDs únicos.

## 6. Configuración

Comprobar:

- Expo SDK 57;
- TypeScript;
- tabs desde `expo-router/js-tabs`;
- Drawer desde `expo-router/drawer`;
- GestureHandlerRootView;
- scheme `comedoripf`;
- typed routes.

## 7. Entregables

Verificar:

- README;
- RESPUESTAS.md;
- evidencia de carrito + undo;
- turno;
- cocina atendiendo;
- login/logout;
- 404;
- deep link anotado;
- sin `node_modules` en el repositorio.

## 8. Resultado

Generá una tabla:

`Requisito | Cumple | Evidencia | Observación`

No asignar puntajes ni decir "mejor/peor". Solo estado objetivo.
