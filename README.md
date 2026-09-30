# Trabajo Práctico N.º 2 - Comedor IPF

## 1. Árbol de src/app

```text
src/app/
├── (tabs)/
│   ├── _layout.tsx      (Tabs)
│   ├── index.tsx
│   ├── menu/
│   │   ├── _layout.tsx  (Stack)
│   │   ├── index.tsx
│   │   └── [id].tsx
│   └── carrito/
│       ├── _layout.tsx  (Stack)
│       ├── index.tsx
│       └── nota.tsx     (Modal)
├── ayuda/
│   ├── index.tsx
│   └── [...slug].tsx
├── categorias/
│   └── [categoria].tsx
├── cocina/
│   ├── _layout.tsx      (Drawer)
│   ├── index.tsx
│   └── atendidos.tsx
├── _layout.tsx          (Root Stack con render condicional de Login/Cocina)
├── +not-found.tsx
├── buscar.tsx
├── confirmar.tsx        (Modal)
├── login.tsx            (Modal)
├── pedido.tsx           (Redirect)
└── turno/
    └── [numero].tsx
```    
## 2. Navegador de cada layout

- **Raíz (`src/app/_layout.tsx`)**: Utiliza un `<Stack>` como contenedor global. En él se declaran como modales (`presentation: 'modal'`) a `confirmar` y `login`. También inyecta condicionalmente la ruta `cocina` dependiendo del estado global, resolviendo de forma segura la protección de rutas solicitada en la consigna.
- **Tabs (`src/app/(tabs)/_layout.tsx`)**: Utiliza `<Tabs>` importado de `expo-router/js-tabs` para cumplir la regla, administrando los accesos a Inicio, Menú y Carrito, integrando el Badge reactivo para este último.
- **Menú (`src/app/(tabs)/menu/_layout.tsx`)**: Utiliza un `<Stack>` para manejar la navegación desde la lista de platos hacia el detalle (`[id]`).
- **Carrito (`src/app/(tabs)/carrito/_layout.tsx`)**: Utiliza `<Stack>` para albergar el resumen del carrito y exponer la `nota` como modal subyacente.
- **Cocina (`src/app/cocina/_layout.tsx`)**: Implementa un `<Drawer>` (desde `expo-router/drawer`) para separar el flujo operativo de los empleados.

## 3. Justificación de router.replace vs router.push en Confirmación

Al confirmar un pedido, la consigna exige navegar de `/confirmar` a `/turno/[numero]`. Se utiliza `router.replace` para evitar que la pantalla de confirmación quede apilada en el historial. 
Si utilizáramos `push`, el usuario podría presionar el botón "Atrás" desde la pantalla de su Turno y volvería a la Confirmación, lo cual:
1. Representaría un estado inválido (ya que el carrito fue vaciado y transformado en pedido).
2. Podría causar bugs donde el usuario confirme un pedido en blanco si no hay guardas.
Al usar `replace`, el sistema descarta la vista previa y asienta firmemente `/turno/[numero]` en el tope.

## 4. Pruebas y Deep Links

Para testear los Deep Links directamente hacia un plato específico, podés navegar mediante URL o ejecutar en la terminal (con la app corriendo en modo dev):
\`npx uri-scheme open "comedoripf://menu/7" --android\`
*(También soporta el formato \`comedoripf://buscar?q=tarta&categoria=almuerzo\`)*

## 5. Credenciales de Cocina

- **Usuario:** cocina
- **Clave:** 1234
