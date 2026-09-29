# Especificación funcional — Comedor IPF

## 1. Identificación

**Proyecto:** Comedor IPF  
**Materia:** Taller Complementario – React Native II  
**TP:** Trabajo Práctico N.º 2  
**Plataforma:** React Native + Expo Router  
**SDK objetivo:** Expo SDK 57  
**Lenguaje:** TypeScript  
**Estado:** Especificación base para implementación

## 2. Objetivo

Construir una aplicación móvil para que los alumnos consulten platos, armen un carrito, deshagan la última acción de agregado y confirmen un pedido.

Los pedidos confirmados deben entrar en una cola FIFO. El personal de cocina inicia sesión, observa el pedido que está al frente y lo atiende en orden de llegada.

El sistema además debe demostrar una pila LIFO para deshacer acciones del carrito y otra pila LIFO para el historial de pedidos atendidos.

## 3. Alcance

Incluido:

- navegación con Expo Router;
- Stack;
- Tabs;
- Stack anidado en Tabs;
- Drawer;
- rutas dinámicas;
- catch-all;
- query params;
- rutas protegidas;
- redirect;
- deep links;
- Pila propia;
- Cola propia;
- Context global;
- carrito;
- pedidos;
- turno;
- cocina;
- historial de atendidos;
- 404;
- pantalla de diagnóstico `DondeEstoy`.

No incluido:

- backend;
- base de datos;
- pagos;
- usuarios reales;
- almacenamiento persistente;
- notificaciones push;
- sincronización con un servidor;
- consumo de API externa.

## 4. URLs obligatorias

| URL | Pantalla | Navegador |
|---|---|---|
| `/` | Inicio | Tab Inicio |
| `/menu` | Lista de platos | Tab Menú + Stack propio |
| `/menu/[id]` | Detalle de plato | Stack de Menú |
| `/categorias/[categoria]` | Platos de una categoría | Stack raíz |
| `/buscar?q=&categoria=` | Buscador | Stack raíz |
| `/carrito` | Carrito | Tab Carrito + Stack propio |
| `/carrito/nota` | Nota para cocina | Stack de Carrito |
| `/confirmar` | Resumen de pedido | Stack raíz, modal |
| `/turno/[numero]` | Turno y pedidos adelante | Stack raíz |
| `/login` | Login de cocina | Modal, solo sin sesión |
| `/cocina` | Pedido al frente | Drawer, solo con sesión |
| `/cocina/atendidos` | Historial de atendidos | Drawer, solo con sesión |
| `/ayuda` | Índice de ayuda | Stack raíz |
| `/ayuda/[...slug]` | Artículos de ayuda | Catch-all |
| `/pedido` | Compatibilidad con URL vieja | Redirect a `/carrito` |
| cualquier otra | 404 | `+not-found.tsx` |

## 5. Árbol de rutas previsto

```text
src/app/
├── _layout.tsx
├── +not-found.tsx
├── index.tsx
├── buscar.tsx
├── confirmar.tsx
├── pedido.tsx
├── turno/
│   └── [numero].tsx
├── categorias/
│   └── [categoria].tsx
├── ayuda/
│   ├── index.tsx
│   └── [...slug].tsx
├── login.tsx
├── cocina/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── atendidos.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── menu/
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   └── [id].tsx
    └── carrito/
        ├── _layout.tsx
        ├── index.tsx
        └── nota.tsx
```

## 6. Layout raíz

`src/app/_layout.tsx` debe:

- proveer el Context global;
- envolver la aplicación en `GestureHandlerRootView`;
- declarar el Stack raíz;
- declarar `(tabs)`;
- proteger `cocina`;
- proteger `login` para que exista solo sin sesión;
- configurar `confirmar` como modal;
- establecer el anchor `(tabs)` para los deep links correspondientes.

La configuración conceptual es:

```text
Root
├── Tabs
├── Root screens
├── Protected Cocina
└── Unauthenticated Login
```

## 7. Tabs

Las pestañas visibles obligatorias son:

- Inicio
- Menú
- Carrito

La tab Menú debe tener su propio Stack para que:

```text
/menu → /menu/[id]
```

mantenga visible la barra de Tabs.

La tab Carrito debe tener su propio Stack para:

```text
/carrito → /carrito/nota
```

## 8. Drawer

La sección Cocina se resuelve con un Drawer.

Pantallas del Drawer:

- Cocina
- Atendidos

La sección completa debe existir únicamente cuando existe sesión.

El cierre de sesión debe provocar la desaparición de la sección protegida sin que sea necesario invocar `router.back()` manualmente.

## 9. Datos de platos

Crear como mínimo 12 platos en:

`src/data/platos.ts`

Distribución obligatoria:

- desayuno;
- almuerzo;
- bebidas;
- kiosco.

Cada plato debe tener, como mínimo:

```ts
type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}
```

Los IDs deben ser únicos.

## 10. Validación de rutas dinámicas

### `/menu/[id]`

- leer `id` desde `useLocalSearchParams`;
- tratarlo inicialmente como texto;
- convertirlo a número;
- buscar el plato;
- si no existe, mostrar un mensaje claro y no romper la pantalla.

Ejemplo conceptual:

```text
"/menu/7" → id = "7" → Number(id) = 7
```

### `/categorias/[categoria]`

Validar que la categoría pertenezca a:

```text
desayuno
almuerzo
bebidas
kiosco
```

Si no pertenece, mostrar mensaje de categoría inexistente.

## 11. Buscador

URL:

```text
/buscar?q=&categoria=
```

El estado visible de búsqueda debe vivir en la URL.

La pantalla debe:

- leer `q`;
- leer `categoria`;
- filtrar platos;
- actualizar parámetros mediante `router.setParams`;
- no hacer `router.push` por cada cambio de texto;
- permitir compartir la búsqueda mediante un `<Link>`.

No crear rutas nuevas para cada búsqueda.

## 12. Carrito

El carrito debe permitir:

- ver ítems;
- ver cantidad total;
- ver total monetario;
- agregar platos;
- abrir la nota para cocina;
- deshacer el último agregado;
- confirmar pedido.

Badge:

- muestra cantidad total de unidades agregadas.

## 13. Pila de deshacer

Cada agregado de plato crea una acción en una instancia de `Pila`.

Regla:

```text
Agregar A → push(A)
Agregar B → push(B)
Agregar C → push(C)

Deshacer → pop(C)
```

Al hacer `pop`:

- identificar la instancia de carrito que debe quitarse;
- quitar únicamente esa última adición;
- actualizar la interfaz.

El botón "Deshacer último" está deshabilitado cuando la pila está vacía.

## 14. Confirmación de pedido

Flujo:

```text
Carrito
   ↓
Confirmar
   ↓
/confirmar (modal)
   ↓
Confirmar
   ↓
asignar número
   ↓
encolar pedido
   ↓
/turno/[numero]
```

La navegación de `/confirmar` a `/turno/[numero]` debe usar `router.replace(...)`.

Motivo:

- el pedido ya fue confirmado;
- la pantalla de confirmación no debe reaparecer al tocar atrás;
- `push` dejaría una entrada de confirmación en la pila.

## 15. Cola de pedidos

Crear una clase `Cola`.

No usar `shift()`.

Interfaz mínima:

```ts
class Cola<T> {
  encolar(item: T): void;
  desencolar(): T | undefined;
  frente(): T | undefined;
  get vacia(): boolean;
  get tamanio(): number;
  aArray(): T[];
}
```

La cola debe representar FIFO.

Cuando se confirma un pedido:

- obtener el próximo número correlativo;
- crear el pedido;
- encolarlo.

La cocina nunca puede saltear el frente.

## 16. Pantalla de turno

`/turno/[numero]` debe mostrar:

- número de turno;
- cantidad de pedidos adelante;
- estado si el pedido ya no está en la cola o no se encuentra.

La posición se calcula usando el orden actual de la Cola.

Desafío opcional:

```text
espera estimada = posición en cola × 3 minutos
```

## 17. Cocina

`/cocina` debe mostrar:

- pedido que está al frente;
- cantidad total de pedidos en espera;
- botón "Atender siguiente".

Al atender:

1. desencolar el pedido del frente;
2. agregar ese pedido a la Pila de atendidos.

No se puede elegir un pedido arbitrario.

## 18. Historial de atendidos

`/cocina/atendidos` muestra:

- último pedido atendido primero;
- luego los anteriores.

Debe obtener los datos a partir de la Pila de atendidos y mostrarlos desde el tope hacia la base.

## 19. Pila de atendidos

Crear otra instancia de `Pila`.

Interfaz mínima:

```ts
class Pila<T> {
  push(item: T): void;
  pop(): T | undefined;
  tope(): T | undefined;
  get vacia(): boolean;
  get tamanio(): number;
  aArray(): T[];
}
```

El método `aArray()` debe devolver una copia para no exponer el almacenamiento interno.

## 20. Estado global

Crear un Context global en `src/context`.

Debe contener, como mínimo:

- sesión de cocina;
- carrito;
- Cola de pedidos;
- Pila de deshacer;
- Pila de atendidos;
- contador de pedidos.

Las estructuras deben ser propiedad del provider, no creadas de nuevo dentro de cada pantalla.

El provider debe estar en el layout raíz.

## 21. Sesión de cocina

El login usa credenciales fijas en código.

La consigna no determina los valores exactos de usuario y clave. Decisión de implementación:

```text
usuario: cocina
clave: 1234
```

Guardar estas constantes en un lugar central y fácil de cambiar.

No almacenar contraseñas en un backend.

No usar autenticación real.

## 22. Protected routes

Conceptualmente:

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="cocina" />
</Stack.Protected>

<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" />
</Stack.Protected>
```

La lógica exacta puede adaptarse a la estructura final de Expo Router, pero el comportamiento debe mantenerse.

## 23. Redirect

`src/app/pedido.tsx` debe redirigir:

```text
/pedido → /carrito
```

Debe ser un redirect, no una pantalla intermedia.

## 24. 404

`src/app/+not-found.tsx` debe mostrar:

- mensaje de ruta no encontrada;
- URL inexistente;
- posibilidad de volver a una ruta válida.

## 25. Pantalla DondeEstoy

Crear:

`src/components/DondeEstoy.tsx`

Debe mostrar:

- `usePathname()`;
- `useSegments()`;
- `useLocalSearchParams()`.

Debe agregarse al final de cada pantalla.

Puede ocultarse mediante:

```ts
const DEBUG = true;
```

Cuando `DEBUG` sea false, no se muestra.

## 26. Deep links

En configuración de la app:

```text
scheme = comedoripf
```

El ejemplo de deep link debe permitir abrir directamente un plato.

Ejemplo conceptual:

```text
comedoripf://menu/7
```

El README final debe incluir un deep link de prueba para Expo Go y explicar su formato.

## 27. Typed routes

Activar rutas tipadas.

No dejar `href` con rutas mal escritas.

Ejemplo que debe producir error de TypeScript:

```tsx
<Link href="/prodcutos" />
```

Los links del código deben referenciar exclusivamente rutas reales.

## 28. Estructuras de carpetas

```text
src/
├── app/
├── components/
├── context/
├── data/
└── estructuras/
```

No crear otros directorios de aplicación salvo que una decisión del SDD lo justifique y se documente.

## 29. UI

No existe una guía visual específica en la consigna.

Criterios:

- interfaz simple;
- legible;
- botones claramente identificables;
- precios visibles;
- estados de carga/ausencia de resultados comprensibles;
- mensajes de error simples;
- no priorizar decoración sobre los criterios de evaluación.

No introducir una librería de UI solo para estilizar.

## 30. Comportamientos obligatorios verificables

### Búsqueda
Escribir texto actualiza `q` en la URL sin apilar pantallas.

### Agregado + deshacer
Agregar tres veces y deshacer debe quitar únicamente la última acción.

### Cola
Confirmar varios pedidos debe conservar el orden de llegada.

### Cocina
Atender siempre quita el frente.

### Historial
El último atendido aparece primero.

### Login
Sin sesión, login existe.
Con sesión, login deja de existir.

### Logout
Al cerrar sesión, las pantallas protegidas dejan de estar disponibles.

### Confirmación
Atrás desde turno no retorna a confirmación.

### Parámetros
`/menu/999` no rompe la aplicación.

### Categoría
`/categorias/pizzas` muestra categoría inválida.

### 404
Una ruta inexistente muestra `+not-found.tsx`.

## 31. Decisiones explícitas

### D1 — Estado local
No se utiliza backend ni persistencia porque la consigna no lo exige.

### D2 — Credenciales
Se usan `cocina / 1234` como dato fijo de demostración.

### D3 — Re-render de estructuras
Las estructuras `Pila` y `Cola` pueden ser instancias estables dentro del Context. Las mutaciones deben acompañarse de una señal de actualización del provider para refrescar las pantallas.

### D4 — Ítems del carrito
Cada agregado genera una identidad de instancia para que "Deshacer" quite exactamente la última adición incluso si el mismo plato fue agregado varias veces.

### D5 — Eliminación de demo
El template automático de Expo se reemplaza por la estructura del TP; se conserva únicamente la configuración y los recursos realmente necesarios.

## 32. Fuera de alcance

No implementar:

- API REST;
- MongoDB;
- Firebase;
- autenticación OAuth;
- pagos;
- notificaciones;
- estados persistidos al cerrar la app;
- roles adicionales;
- panel administrativo web.

Cualquier ampliación debe generar una modificación explícita de la especificación antes de implementarse.
