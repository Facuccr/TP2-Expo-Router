# ADR-001 — Navegación raíz y navegadores anidados

## Contexto

El TP exige Tabs, Stack, Stack dentro de Tabs, Drawer y modales.

## Decisión

Usar un Stack raíz como contenedor principal.

Dentro del Stack raíz:

- `(tabs)` representa el navegador de pestañas;
- `confirmar` representa un modal;
- `cocina` representa la sección protegida que contiene un Drawer;
- las rutas de búsqueda, categorías y turno permanecen en el Stack raíz.

Dentro de `(tabs)`:

- Menú tiene Stack propio;
- Carrito tiene Stack propio.

## Consecuencia

La barra de tabs permanece visible cuando se navega a:

```text
/menu/[id]
```

y

```text
/carrito/nota
```

pero no es necesario mantenerla visible para:

```text
/confirmar
```

o la sección de Cocina.
