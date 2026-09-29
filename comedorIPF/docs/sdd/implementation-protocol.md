# Protocolo de implementación para la IA

## Regla 1 — Una tarea a la vez

El agente no debe implementar todo el TP en una sola operación.

Debe trabajar por tareas de `docs/sdd/tasks.md`.

## Regla 2 — Antes de editar

Leer:

1. `AGENTS.md`;
2. `docs/sdd/spec.md`;
3. tarea actual;
4. criterios de aceptación relacionados.

## Regla 3 — Antes de crear un archivo

Comprobar si:

- el archivo está definido en el plan;
- su contenido corresponde a una ruta;
- puede reutilizarse un componente existente.

No crear archivos por costumbre del template.

## Regla 4 — Antes de instalar una dependencia

- revisar `package.json`;
- confirmar necesidad;
- usar `npx expo install`;
- verificar compatibilidad con Expo SDK 57.

## Regla 5 — Después de editar

Ejecutar las verificaciones apropiadas para la tarea.

## Regla 6 — No arreglar con silencios

No usar:

```ts
any
```

solo para ocultar errores.

No usar:

```ts
@ts-ignore
```

para evitar problemas de tipos de rutas.

No borrar una pantalla para hacer desaparecer un error funcional.

## Regla 7 — No duplicar estado

No crear:

```text
new Cola()
```

dentro de cada pantalla de cocina.

No crear:

```text
new Pila()
```

dentro de la pantalla de carrito.

Las instancias deben pertenecer al Context.

## Regla 8 — No duplicar navegación

La ruta debe existir una sola vez en el lugar previsto por el árbol.

## Regla 9 — Mantener el código explicable

La solución debe poder explicarse oralmente:

- qué hace cada layout;
- por qué existe una pila;
- por qué existe una cola;
- por qué se usa `replace`;
- por qué se usa `setParams`;
- cómo funciona `Stack.Protected`.

## Regla 10 — Actualizar el SDD

Cuando una decisión de implementación cambie el comportamiento:

1. modificar `spec.md`;
2. actualizar `plan.md` si corresponde;
3. actualizar `tasks.md`;
4. recién después continuar con código.

## Regla 11 — Cierre de tarea

Una tarea se marca `[x]` solamente cuando:

- el código existe;
- compila;
- los criterios de aceptación relacionados pasan;
- no rompe tareas previamente terminadas.

## Regla 12 — Auditoría

Al final, comparar:

```text
consigna → spec → plan → tasks → código → aceptación
```

Si un requisito no tiene una implementación y una prueba, queda pendiente.
