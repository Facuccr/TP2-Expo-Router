# ADR-003 — Link, router y replace

## Decisión

### `<Link>`

Se usa cuando el usuario toca un elemento que naturalmente representa una navegación:

- tarjeta de plato;
- acceso a Ayuda;
- acceso a Menú;
- acceso a Carrito.

### `router`

Se usa después de lógica:

- login exitoso;
- logout;
- confirmación de pedido;
- acciones que primero modifican estado.

### `router.replace`

Se usa:

```text
/confirmar → /turno/[numero]
```

porque la confirmación ya fue consumida y no debe quedar en la pila de navegación.
