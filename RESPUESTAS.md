# Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

- Alumno: Cristaldo Facundo

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

a) *LIFO*, segun su significado en ingles, last in, first out, significa que el ultimo elemento que sale es el primero en salir,
este corresponde a la pila.
*FIFO*, en ingles, first in, first out, el primer elementoq ue llega es el primero en salir, este corresponde a la cola.

b) en LIFO, el elemento entra por el tope y sale por el tope, miestras que en FIFO el elemnto entra por el final y sale por el frente.

c) LIFO, podria ser en una pila de una baraja de cartas, donde el ultimo que se dejo es el que se va a agarrar primero 
Un ejemlo sencillo es el del boton de "volver", cada pantalla que se abre se apila y al presionar el boton se retira la 
ultima pantalla de la pila.
FIFO podria ser la cola de un supermercado o un banco o cualquier cola de algun lugar, en una app cuando queremos subir alguna foto o archivo, el primero que se seleccionó es el primero que se manda.

### A2. Seguimiento de una pila

Cada console log imprimiria: 
1. "Perfil"
2. "Perfil"
3. "Productos"
4. false

y al final la pila quedaria asi:

```javascript
#items = ['Inicio', 'Productos'];
```

### A3. Seguimiento de una cola

la clase cola imprimiria:

1. 'Beto'
2. 'Beto'
3. false

mientras que al final seria

```javascript
#items = ['Caro','Dani']
```

### A4. Análisis de la implementación

a) el # significa que la propiedad solo es accesible desde dentro de la clase, esto evita que codigo externo modifique el array y rompa las reglas de la pila.

b) el metodo .shift() lo que hace es que elimina el primer elemento del array y oblica a acomodar cada item moviendolo un lugar 
hacia la izquierda, esto, en colas muy grandes, exige mucho procesamiento y seria muy lento. Las colas serias resuelven esto 
manteniendo una variable privada que guarda el indice del frente; al desencolar, simplemente le suman 1 a ese índice para ignorar el primer elemento, sin mover el resto de los datos de lugar.

c) el metodo usado por la pila es el .pop() y la cola utiliza .shift(). La razon por la que no usan lo mismo es que la logica de 
sallida son totalmente opuestas, la pila necesita extraer el ultimo que se coloco mientras que la cola sacar el primero que ingresó, sacandolo desde el principio del array.

### A5. Programación: una cola eficiente

implementacion:

```javascript
class ColaEficiente {
  #items = [];
  #frenteIndex = 0; //se guarda en un campo privado el indice del frente

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    
    // guardo el valor actual del frente para devolverlo dsp
    const elemento = this.#items[this.#frenteIndex];
    
    // En lugar de usar shift(), avanzamos el índice un lugar
    this.#frenteIndex++; 
    
    return elemento;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frenteIndex];
  }

  get vacia() {
    // la cola está vacia si el puntero del frente alcanzó la longitud total del array
    return this.#frenteIndex === this.#items.length;
  }

  get tamanio() {
    // El tamaño es el total de elementos en el array menos los que ya salieron
    return this.#items.length - this.#frenteIndex;
  }
}
```

### A6. Pila y cola dentro de Expo Router

a) la estructura que describe el historial de un Stack es *LIFO* , la pantalla visible es el *"tope"* y cuando el usuario utilice algun bootn para ir hacia atras se usara el metodo *.pop()*, para de esta manera quitar la ultima pantalla puesta

b) la estructura usada para las acciones de navegación es el *FIFO* para manejar las colas, en caso de que el usuario toque dos links muy rapido las dos acciones se van a procesar en el orden en el que lleegaron.

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
| :--- | :--- |
| `src/app/(tabs)/index.tsx` | / |
| `src/app/acerca.tsx` | /acerca |
| `src/app/(tabs)/perfil.tsx` | /perfil |
| `src/app/(tabs)/productos/index.tsx` | /productos/ |
| `src/app/(tabs)/productos/[id].tsx` | productos/[id] (ej: productos/2)|
| `src/app/docs/[...slug].tsx` | /docs/[slug] (atrapa varios segmentos, ej: /docs/a/b/c)|
| `src/app/_layout.tsx` | no genera una pantalla |
| `src/app/+not-found.tsx` | renderiza la pantalla 404 al intentar acceder a una ruta que no existe|
| `src/app/Boton.tsx` | es un componente, no deberia estar en /app, es un *problema* y generaria una ruta de un componente reutilzable |


### B2. De la URL al archivo

| URL | Archivo |
| :--- | :--- |
| `/categorias/bebidas (y cualquier otra categoría)` | src/app/categorias/[categoria].tsx |
| `/buscar?q=mate&categoria=kiosco` | src/app/buscar.tsx |
| `/ayuda/pagos/tarjeta y /ayuda/horarios` | src/app/ayuda/pagos/tarjeta y src/app/ayuda/horarios |
| `/ayuda (con una pantalla propia)` | src/app/ayuda/index.tsx |


### B3. Verdadero o falso

Indicá V o F y justificá las falsas.
a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración. *F* 
- Falso, puesto que no es necesario registrar en ninguna tabla, con el simple hecho de ir creando archivos o carpetas dentro de la carpeta /app ya se registra automaticamente como una pantalla nueva.

b) Los archivos _layout.tsx son pantallas que el usuario puede visitar. *F*
- Es falso, ya que estos archivos simplemente sirven para actuar como contenedor, que permiten definir la estructura compartida de las pantallas reales.

c) Una carpeta entre paréntesis, como (tabs), no aparece en la URL. *V*

d) Para agregar una librería conviene usar npm install, porque siempre trae la última versión. *F*
- no no conviene usar npm install puesto que esto puede traer una verrsion que expo GO no tiene, para ello es mejor usar npx expo install.

e) En package.json, "main": "expo-router/entry" reemplaza al viejo App.tsx. *V*

f) La ruta /_sitemap lista todas las rutas de la app y sirve para depurar. *V*

g) Si existen docs/index.tsx y docs/[...slug].tsx, la URL /docs muestra docs/index.tsx. *V*

h) En SDK 57, expo-router usa el mismo número de versión mayor que el SDK (57). *V*

## Parte C · Navegar: <Link>, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | apila una nueva pantalla |
| `router.navigate(href)` | tambien apila, pero solo cuando la pantalla no sea la actual, caso contrario, actua como .push() |
| `router.replace(href)` | cambia el tope por otra pantalla especificada |
| `router.back()` | saca el tope y vuelve a la pantalla anterior|
| `router.dismissTo(href)` | cambia o desapila hasta encontrar la ruta especificada |
| `router.dismissAll()` | desapila todo y vuelve a la primera pantalla |
| `router.canGoBack()` | pregunta si hay algo debajo, devuelve booleano |
| `router.setParams({...})` | cambia los parametros de la pantalla actual |


### C2. Simulación de la pila

| # | Instrucción | Pila resultante |
|---|---|---|
| 1 | `router.push("/productos/1")` | /productos, /productos/1 |
| 2 | `router.push("/productos/2")` | /productos,/productos/1, /productos/2 |
| 3 | `router.navigate("/productos/5")` | /productos, /productos/1, /productos/2, /productos/5   |
| 4 | `router.push("/perfil")` | /productos, /productos/1, /productos/2, /productos/5, /perfil |
| 5 | `router.replace("/buscar")` | /productos, /productos/1, /productos/2, /productos/5, /buscar |
| 6 | `router.back()` | /productos, /productos/1, /productos/2, /productos/5 |
| 7 | `router.dismissTo("/productos")` | /productos |
| 8 | `router.canGoBack()` → ¿qué devuelve? | False, no es posible volver hacia atras, ya no hay pantallas |

### C3. ¿Link o router?

Para cada situación, elegí <Link> o router e indicá el método o prop que usarías. Justificá.
a) El usuario toca la tarjeta de un producto en una lista. 
    - <Link> (prop href). Justificación: Es una interacción directa y visual del usuario. Tocar un elemento y viajar a otra pantalla es el caso de uso principal del componente <Link>

b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.
    - router, lo usaria con .push() o navigate, porque depende del proceso de la api por lo que debe ejecutarse por codigo solo si sale bien. 

c) Botón “Cancelar” dentro de un modal.
    - router,con el metodo back(), porque la tarea es sencilla, eliminar la pantalla actual y volver a la anterior.

d) Después de un login exitoso hay que ir a la pantalla principal.
    - router, utizaria el metodo replace(), de esta manera el usario no puede volver atras (hacia el login), ya que se reemplazó.

e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres
pantallas más abajo.
    - router, en conjunto con el metodo .dismissTo(href), se limpia la pila de esta manera eñ usuario salta automaticamente a esa pantalla que quedo detras.

### C4. Escribí el código

a) Un <Link> que abra el producto con id 8 usando href como objeto
```tsx
<Link href={{pathname:'productos/[id]', params: { id: 8 } }}>
    ver producto 8
</Link>
```

b) Un <Link> a /perfil que siempre apile, aunque la pantalla ya exista.

```tsx
<Link href="/perfil">Ir al perfil</Link>
```

c) Un botón (Pressable) propio que funcione como link a /carrito usando asChild.
```tsx
<Link href="/carrito" asChild>
    <Pressable>
    <Text>ir al carrito</Text>
    </Pressable>
</Link>
```

### C5. Pensar

- al convertise en una etiqueta real, permite al usuario abrir el link en una pestaña nueva o copiar ese enlace.
- en el celular manejar la navegacion como si fueran URLs sirve para habilitar los Deep Links (enlaces profundos). Esto permite que, si alguien pasa un link por WhatsApp, el sistema operativo sepa exactamente que pantalla de tu app debe abrir directamente, en lugar de mandar siempre al inicio. 

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | si | no | no |
| ¿Cómo cambia de pantalla el usuario? | tocando un enlace/boton, que apila o atras para desapilar | tocando los iconos de la barra inferior de pestañas| abriendo el menu con el icono, o deslizando desde el borde |
| ¿Desde dónde se importa en SDK 57? | expo-router | expo-router | expo-router/drawer |
| Un caso de uso típico | flujo jerarquico de navefacion (productos -> detalles -> carrito) | rutas principales de la app (inicio busqueda perfil) | vistas secundarias con muchas opciones, menus de configuracion, etc |

### D2. Cada tab tiene su pila

- la pantalla que ve es el *Detalle del producto 4*, porque al hacer todo este recorrido las pestañas se iran apilando, expo router irá guardando estas pestañas en memoria, entonces al volver a productos el usuario vera el tope de esa pila, veo esto en una aplicacion de compras online como Mercado Libre.


### D3. ¿Dónde va cada pantalla?

Aplicando la regla práctica de navegadores anidados, indicá si cada pantalla va en el Stack raíz o
dentro de una tab:
a) El detalle de un producto, que debe mantener visible la barra de pestañas. *tab*

b) Un modal para confirmar una compra, que debe tapar la barra de pestañas. *Stack raiz*

c) La pantalla de login que se abre como modal. *stack*

d) La pantalla “Mis pedidos anteriores” dentro de la sección Perfil. *tab*


### D4. Configurar el Stack

a) la diferencia es que screenOptions aplica a todos y cada uno de los stack que se encuentran dentro, mientras que options dentro de un Stack.screen sirve solo para agregar opciones extras a ese stack.

b) si, la pantalla existe igual, al declararla podemos agregar opciones extras.

c) los cuatro valores posibles son `card` (normal), `modal` (de abajo hacia arriba), `transparentModal` (modal con fondo translucido) y `formSheet`. para una hojainferior que se abre al 50% usaria formSheet combinado con sheetAllowedDetents, con el parametro ['medium'] o [0.5].

e) Usando el componente 
```jsx 
<Stack.Screen 'Producto 7' options="{{" title: }}/>
``` 
dentro del JSX de la propia pantalla

### D5. Tabs y Drawer en SDK 57

a) Las pestañas tradicionales basadas en JavaScript ahora se importan desde expo-router/js-tabs (en vez de expo-router directo). La alternativa experimental es el uso de Native Tabs (Tabs directamente desde expo-router), que utiliza componentes nativos del sistema operativo de fondo (como UITabBar en iOS).   

b) Necesita los paquetes @react-navigation/drawer y react-native-gesture-handler. El componente que conviene envolver en el layout raíz es GestureHandlerRootView para que los gestos de deslizamiento funcionen correctamente.   

c) Si, hace falta instalarlo. Porque Expo Router no incluye el codigo del Drawer por defecto para mantener la librería liviana, expo-router/drawer es solo un wrapper que depende obligatoriamente de la implementacion oficial de @react-navigation/drawer.

d) Actua en el navegador activo más interno (en el que se encuentra la pantalla actual). Si ese navegador ya no tiene más pantallas en su pila para desapilar, le pasa la accion hacia arriba al navegador padre


## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

- El error se debe a que se esta comparando con un numero, en las url, los parametros siempre llegan como _string_, Al compararlo con === contra p.id, la igualdad estricta siempre da false porque evalúa tipos distintos ("3" === 3 da falso). Por la misma razón, la condición id === 3 tampoco se cumple nunca.

Correccion:
Hay que convertir id a numero antes de buscarlo y compararlo:

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNum = Number(id);

  const producto = productos.find((p) => p.id === idNum);

  if (idNum === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;

  return <Text>{producto.nombre}</Text>;
}
```
### E2. Catch-all

| URL | slug |
|---|---|
| `/docs/react` | ['react'] |
| `/docs/react/hooks/useState` | ['react', 'hooks', 'useState'] |
| `/docs` | undefined (o +not-found si no existe docs/index.tsx) |
    

### E3. Anatomía de una URL

a) el *scheme* es: `rutasipf://`, la ruta: `/buscar`, y los parametros: `q=mate` y `categoria=bebidas`.

b) useLocalSearchParams() devolverá algo como: `{"q":"mate","categoria":"bebidas"}`

c) No, no hace falta los corchetes ya que estos se usan exclusivamente para capturar partes de una ruta. Los datos que van despues del signo de interrogacion son parametros de consulta, Expo Router los atrapa automaticamente y los pone a disposicion con useLocalSearchParams() sin necesidad de modificar el nombre del archivo

d) La primera razón es para evitar arruinar el historial de navegación si se usara router.push, cada vez que el usuario presiona una tecla se apilaria una pantalla nueva identica en la pila. Al querer volver atras, el usuario tendría que retroceder letra por letra.

la segunda es por un mmejor rendimiento: router.setParams simplemente actualiza los valores de la URL en la pantalla en la que ya estamos. No requiere crear, animar ni cargar una pantalla nueva desde cero, lo que hace que la experiencia de escritura sea fluida.

### E4. ¿Dónde estoy?

| Hook | En /productos/3 | En /buscar?q=chipa |
|---|---|---|
| usePathname() | /productos/3 | /buscar |
| useSegments() | ["(tabs)","productos","[id]"] | ["buscar"] |
| useLocalSearchParams() | {"id":"3"} | {"q":"chipa"} |

### E5. Local vs global

a) 
- la diferencia es que `useLocalSearchParams`, devuelve solo los parámetros de la pantalla actual. `useGlobalSearchParams` devuelve los parámetros de toda la jerarquia de navegacion globalmente.
- la opcion por defecto es `useLocalSearchParams`. Se prefiere porque mantiene el componente aislado y evita colisiones si diferentes pantallas usan el mismo nombre de parametro

b) ``useFocusEffect`` 
- sirve para ejecutar un efecto secundario *solo* cuando la pantalla recibe el foco, o sea se vuelve visible o activa.
- un ejemplo sería al volver a cargar datos  desde una API cada vez que el usuario vuelve a esa pantalla desde otra, asegurando que la info esté actualizada.

c) _Pantalla de producto inexistente (/productos/mate)_
No, no es un errror, Expo Router simplemente empareja la estructura de la URL con un archivo dinámico y carga esa pantalla. Es responsablididad del desarrollador decidir que si no existe, renderizar un msj de error o redirifir a una pagina 404.

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

a) Redirect lo que hace es que redirige al usuario automáticamente a otra ruta de forma declarativa en el moimento en el que el componente se renderiza. Equivcale a utilizar el metodo react.replace()

b) una redireccion debe de reemplazarse para eliminar la ruta de origen del historial de navegfación. El problema de apilar es que al hacerlo el usuario quedaria atrapado. Al precionar el boton "atras", volveria a la pantalla original que contiene la redirección, lo cual lo enviaria automaticamente hacia adelante de nuevo, generando un bucle.

### F2. Stack.Protected 

```tsx
unction NavegacionRaiz() {
 const { usuario } = useAuth();
 const conSesion = usuario !== null;
 return (
 <Stack>
 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
 <Stack.Protected guard={ conSesion }>
 <Stack.Screen name="privado" />
 </Stack.Protected>
 <Stack.Protected guard={ !conSesion }>
 <Stack.Screen name="login" options={{ presentation: 'modal' }} />
 </Stack.Protected>
 </Stack>
 )
```

a) cuando `guard` es false, la pantalla se desmonta, y desaparece de las rutas de navegación por lo que se hace inaccesible.

b) Al iniciar sesión, el estado ``conSesion`` cambia a true, lo que hace que el guard del login pase a ser false. Esto provoca que el ``<Stack.Protected>`` desmonte automáticamente la pantalla de login del stack, cerrando el modal.

c) 
- La causa del aviso ocurre si la aplicacion intenta navegar hacia una pantalla (por ejemplo, al tocar un <Link>) que en ese momento no existe en el stack porque su guard es false.

- se puede evitar ocultando los enlaces o botones de navegación hacia pantallas protegidas cuando el usuario no cumple las condiciones, o validando la acción antes de ejecutarla.

d) la ventaja de `Stack.Protected` es que centraliza el controkl de acceso en un solo lugar (el _layout) en lugar de tener que repetir la lógica de validación y el componente <Redirect> en cada archivo de pantalla.

## F3. 404, anchor y rutas tipadas

a) este archivo cumple la función de renderizar la pantalla de error 404 cuando un usuario intenta acceder a una ruta que noe xiste dentro del sistema.

Se define directamente en la raiz del directorio de rutas.

b) sirve para indicarle al enrutador qué grupo de rutas usar como base, es util para resolver el estado de navegación, asegurar el comportamiento correcto del botón "atrás" y gestionar deep links hacia layouts agrupados, se define exportando dentro de los archivos de configuración de diseño (los _layout.tsx)

c) al escribir de esa manera ts marcará error en el editor indicando que la ruta no es válida. Expo Router los genera de forma automática y dinámica al compilar, leyendo la estructura de tu carpeta app/. Se guardan en una carpeta oculta del proyecto (típicamente en .expo/types/router.d.ts).

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (npx expo start --web) | `http://localhost:8081/menu/7` |

- ¿Qué significa la parte /--/ en la URL de Expo Go?
Actúa como un separador o delimitador. Le indica al sistema que todo lo que está antes sirve para abrir la app contenedora de Expo Go y conectarse al servidor local, y todo lo que está después (en este caso /menu/7) es la ruta interna de ña aplicación a la que debe navegar.   
- ¿Por qué el scheme propio no funciona dentro de Expo Go?
Porque el scheme personalizado (comedoripf) solo se registra en el sistema operativo en el momento en que realizas una compilación nativa de la aplicación. Mientras se desarolla en expo go, se esta usando una app pre-compilada que solo está configurada para escuchar su propio scheme nativo.  



