# ADR-002 — Estado global en Context

## Contexto

La consigna exige que la sesión, el carrito, la cola y las pilas vivan en un Context cuyo provider esté en el layout raíz.

## Decisión

Crear un único `AppProvider`.

El provider es dueño de:

- sesión;
- carrito;
- Cola;
- Pila de undo;
- Pila de atendidos;
- contador de pedidos;
- nota.

Las pantallas consumen acciones del contexto.

## Consecuencia

Las pantallas no crean sus propias colas o pilas, evitando que el orden de los pedidos o el historial se pierdan al cambiar de pantalla.
