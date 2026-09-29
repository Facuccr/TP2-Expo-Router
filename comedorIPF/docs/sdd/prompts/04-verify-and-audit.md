# Prompt 04 — Verificación y auditoría de una tanda

Leé `AGENTS.md`, `docs/sdd/spec.md`, `docs/sdd/tasks.md` y `docs/sdd/acceptance.md`.

Auditar el código actual sin agregar funcionalidades.

Verificar:

## Arquitectura
- rutas dentro de `src/app`;
- componentes fuera de `src/app`;
- datos fuera de `src/app`;
- estructuras fuera de `src/app`;
- Context fuera de `src/app`.

## Navegación
- Tabs;
- Stack de Menú;
- Stack de Carrito;
- Root Stack;
- Drawer;
- Protected;
- modal;
- redirect;
- 404.

## Estado
- una Cola global;
- una Pila de undo global;
- una Pila de atendidos global;
- una sesión global.

## Requisitos
Ejecutar los casos de aceptación relacionados con las tareas terminadas.

## Problemas
Para cada problema indicar:

`Problema | Evidencia | Requisito afectado | Corrección mínima`

No hagas una refactorización general.

Si todo está correcto, indicar qué tareas pueden permanecer como `[x]`.
