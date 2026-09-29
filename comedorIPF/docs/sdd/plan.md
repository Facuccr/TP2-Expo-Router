# Plan técnico — Comedor IPF

## 1. Estrategia

Implementar en capas pequeñas:

```text
Base/configuración
    ↓
Datos
    ↓
Estructuras
    ↓
Context
    ↓
Layouts de navegación
    ↓
Pantallas
    ↓
Integración de flujos
    ↓
Verificación
```

No conviene construir todas las pantallas antes del Context porque la navegación protegida y los flujos de pedido dependen del estado global.

## 2. Arquitectura

```text
                    ┌───────────────────────────┐
                    │      Root Layout          │
                    │   Stack + Protected       │
                    │   Context Provider        │
                    └────────────┬──────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
       (tabs)                Root routes            cocina
          │                      │                      │
     ┌────┼────┐            ┌────┴─────┐          Drawer
     │    │    │            │          │          │    │
  Inicio Menú Carrito    Buscar  Confirmar      Cocina Atendidos
          │      │
        Stack  Stack
          │      │
       Detalle  Nota
```

## 3. Árbol de implementación

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── +not-found.tsx
│   ├── index.tsx
│   ├── buscar.tsx
│   ├── confirmar.tsx
│   ├── pedido.tsx
│   ├── turno/
│   │   └── [numero].tsx
│   ├── categorias/
│   │   └── [categoria].tsx
│   ├── ayuda/
│   │   ├── index.tsx
│   │   └── [...slug].tsx
│   ├── login.tsx
│   ├── cocina/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── atendidos.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── menu/
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── [id].tsx
│       └── carrito/
│           ├── _layout.tsx
│           ├── index.tsx
│           └── nota.tsx
├── components/
│   ├── DondeEstoy.tsx
│   ├── PlatoCard.tsx
│   ├── BadgeCarrito.tsx
│   ├── SelectorCategoria.tsx
│   ├── PedidoCard.tsx
│   └── EstadoVacio.tsx
├── context/
│   ├── AppContext.tsx
│   └── types.ts
├── data/
│   ├── categorias.ts
│   └── platos.ts
└── estructuras/
    ├── Pila.ts
    └── Cola.ts
```

Los componentes adicionales son diseño recomendado. Si uno no se necesita, no se crea.

## 4. Modelo de datos

### Plato

```ts
interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}
```

### CartItem

```ts
interface CartItem {
  instanciaId: string;
  plato: Plato;
  cantidad: number;
}
```

Para simplificar el undo, cada "Agregar al carrito" puede registrar una acción con `instanciaId`.

### UndoAction

```ts
interface UndoAction {
  instanciaId: string;
  platoId: number;
}
```

### Pedido

```ts
interface Pedido {
  numero: number;
  items: CartItem[];
  nota: string;
  creadoEn: string;
}
```

## 5. Diseño del Context

El provider tendrá:

```text
session
cartItems
nota
nextOrderNumber
ordersQueue
undoStack
attendedStack
version
```

Operaciones principales:

```text
login
logout
agregarAlCarrito
deshacerUltimo
vaciarCarrito
setNota
confirmarPedido
atenderSiguiente
```

`version` o un mecanismo equivalente permite que las pantallas reaccionen cuando se mutan las clases `Pila` y `Cola`.

## 6. Diseño de Pila

Recomendación de implementación:

```ts
export class Pila<T> {
  #items: T[] = [];

  push(item: T): void;
  pop(): T | undefined;
  tope(): T | undefined;
  get vacia(): boolean;
  get tamanio(): number;
  aArray(): T[];
}
```

`aArray()` debe devolver una copia y no la referencia interna.

## 7. Diseño de Cola

Recomendación:

```ts
export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(item: T): void;
  desencolar(): T | undefined;
  frente(): T | undefined;
  get vacia(): boolean;
  get tamanio(): number;
  aArray(): T[];
}
```

No usar:

```ts
shift()
```

`desencolar()` incrementa el índice `#frente`.

`aArray()` devuelve únicamente los elementos que siguen esperando.

## 8. Navegación

### Root Stack

Debe controlar:

- `(tabs)`;
- `buscar`;
- `categorias/[categoria]`;
- `confirmar`;
- `turno/[numero]`;
- `login`;
- `cocina`.

### Menu Stack

```text
/menu
/menu/[id]
```

### Carrito Stack

```text
/carrito
/carrito/nota
```

### Drawer

```text
/cocina
/cocina/atendidos
```

## 9. Protected routes

El Context provee:

```ts
usuario
```

y el layout deriva:

```ts
const conSesion = usuario !== null;
```

Guardas:

```text
cocina → conSesion
login  → !conSesion
```

## 10. Anchor

El Root Layout debe usar:

```ts
export const unstable_settings = {
  anchor: '(tabs)',
};
```

Esto permite que un deep link que abra una ruta root como `/categorias/bebidas` tenga el grupo `(tabs)` como base configurada.

## 11. Header del detalle

`/menu/[id]` debe mostrar el nombre del plato como título.

La pantalla puede usar `Stack.Screen` u `navigation.setOptions`, siempre que:

```text
id válido → title = nombre del plato
```

## 12. Flujo de pedido

```text
1. Usuario explora Menu.
2. Abre detalle.
3. Agrega plato.
4. Acción entra en Pila de undo.
5. Va a Carrito.
6. Puede deshacer.
7. Puede agregar nota.
8. Abre Confirmar.
9. Confirma.
10. Se crea Pedido.
11. Se asigna número correlativo.
12. Pedido entra en Cola.
13. Se navega con replace a Turno.
14. Cocina inicia sesión.
15. Cocina observa frente().
16. "Atender siguiente" hace desencolar().
17. Pedido atendido entra a Pila de atendidos.
18. Atendidos muestra del tope a la base.
```

## 13. Búsqueda

```text
URL
 ↓
useLocalSearchParams()
 ↓
normalización
 ↓
filtrado
 ↓
render
```

Cuando cambia el texto:

```text
texto
 ↓
router.setParams({ q: texto })
```

No:

```text
router.push(...)
```

## 14. Deep links

Configuración:

```text
scheme: comedoripf
```

Ejemplo de build/app instalada:

```text
comedoripf://menu/7
```

El README final deberá registrar además el deep link de prueba usado específicamente en Expo Go.

## 15. Verificación por fases

### Fase 1
Compilación y rutas.

### Fase 2
Pila y Cola.

### Fase 3
Context y carrito.

### Fase 4
Tabs, Stack y Drawer.

### Fase 5
Login/protección.

### Fase 6
Pedido/cola/turno/cocina.

### Fase 7
Búsqueda, ayuda, redirect y 404.

### Fase 8
Deep links y typed routes.

### Fase 9
Auditoría final contra la consigna.

## 16. Criterio de no-regresión

Cada tarea debe comprobar que:

- no rompe rutas anteriores;
- no crea rutas involuntarias;
- no duplica providers;
- no duplica instancias de Cola/Pila;
- no agrega dependencias innecesarias.
