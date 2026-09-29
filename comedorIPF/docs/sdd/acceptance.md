# Criterios de aceptación — Comedor IPF

Cada escenario debe poder demostrarse ejecutando la aplicación.

## AC-01 — Inicio

**Dado** que la app inicia  
**Cuando** aparece la pantalla principal  
**Entonces** se muestran saludo y accesos a Menú, Buscar, Ayuda y Cocina.

## AC-02 — Menú

**Dado** que el usuario está en Inicio  
**Cuando** toca Menú  
**Entonces** entra a `/menu` dentro de la tab Menú.

## AC-03 — Detalle válido

**Dado** que existe el plato 7  
**Cuando** se abre `/menu/7`  
**Entonces** se muestra nombre, precio y descripción del plato.

## AC-04 — Detalle inválido

**Dado** que no existe el plato 999  
**Cuando** se abre `/menu/999`  
**Entonces** se muestra un mensaje de producto inexistente y la app no se rompe.

## AC-05 — Categoría válida

**Dado** que `bebidas` es una categoría válida  
**Cuando** se abre `/categorias/bebidas`  
**Entonces** se muestran los platos de esa categoría.

## AC-06 — Categoría inválida

**Dado** que `pizza` no está entre las cuatro categorías  
**Cuando** se abre `/categorias/pizza`  
**Entonces** se muestra categoría inexistente.

## AC-07 — Búsqueda

**Dado** que estoy en `/buscar`  
**Cuando** escribo `mate`  
**Entonces** la URL actualiza `q=mate` sin crear una entrada nueva de navegación por cada letra.

## AC-08 — Filtro

**Dado** que hay un filtro de categoría  
**Cuando** selecciono `bebidas`  
**Entonces** la URL contiene `categoria=bebidas` y la lista se filtra.

## AC-09 — Agregado

**Dado** un plato válido  
**Cuando** toco "Agregar al carrito"  
**Entonces** el carrito aumenta su cantidad y se registra una acción de undo.

## AC-10 — Undo

**Dado** que agregué A, luego B  
**Cuando** toco "Deshacer último"  
**Entonces** B se elimina y A permanece.

## AC-11 — Undo deshabilitado

**Dado** que no quedan acciones de undo  
**Cuando** observo el carrito  
**Entonces** "Deshacer último" está deshabilitado.

## AC-12 — Confirmación

**Dado** que el carrito tiene productos  
**Cuando** abro confirmar  
**Entonces** `/confirmar` aparece como modal.

## AC-13 — Pedido en cola

**Dado** que existen pedidos 1, 2 y 3  
**Cuando** se confirma un nuevo pedido  
**Entonces** recibe un número siguiente y queda al final de la cola.

## AC-14 — Replace

**Dado** que estoy en `/confirmar`  
**Cuando** confirmo  
**Entonces** voy a `/turno/[numero]`.

**Y** al tocar atrás no vuelvo a `/confirmar`.

## AC-15 — Turno

**Dado** que existen pedidos delante  
**Cuando** abro mi turno  
**Entonces** veo cuántos pedidos están antes en la cola.

## AC-16 — Login

**Dado** que no existe sesión  
**Cuando** navego a Cocina  
**Entonces** aparece login.

## AC-17 — Sesión

**Dado** que ingreso credenciales correctas  
**Cuando** inicio sesión  
**Entonces** el login desaparece y la sección Cocina queda disponible.

## AC-18 — Credenciales inválidas

**Dado** que uso datos incorrectos  
**Cuando** intento iniciar sesión  
**Entonces** no se crea sesión y aparece un mensaje.

## AC-19 — Frente de cola

**Dado** que hay pedidos esperando  
**Cuando** abro Cocina  
**Entonces** se muestra el pedido que está al frente.

## AC-20 — Atención FIFO

**Dado** que la cola contiene 1, 2 y 3  
**Cuando** toco "Atender siguiente"  
**Entonces** se atiende 1, luego 2, luego 3.

## AC-21 — Historial LIFO

**Dado** que se atendieron 1, 2 y 3  
**Cuando** abro Atendidos  
**Entonces** 3 aparece antes que 2 y 2 antes que 1.

## AC-22 — Logout

**Dado** que estoy en Cocina  
**Cuando** cierro sesión  
**Entonces** la sección protegida deja de estar disponible sin llamar manualmente a `router.back()`.

## AC-23 — Redirect

**Dado** que existe la URL vieja `/pedido`  
**Cuando** la abro  
**Entonces** termino en `/carrito`.

## AC-24 — 404

**Dado** una ruta inexistente  
**Cuando** la abro  
**Entonces** aparece `+not-found.tsx` y se muestra la URL.

## AC-25 — DondeEstoy

**Dado** cualquier pantalla habilitada  
**Cuando** DEBUG está activo  
**Entonces** se muestran pathname, segments y params.

## AC-26 — Deep link

**Dado** el scheme `comedoripf`  
**Cuando** abro un deep link al plato 7  
**Entonces** se intenta abrir `/menu/7`.

## AC-27 — Typed routes

**Dado** un href incorrecto  
**Cuando** TypeScript comprueba el proyecto  
**Entonces** el error es detectado por los tipos de rutas.

## AC-28 — Organización

**Dado** el proyecto final  
**Cuando** se inspecciona el repositorio  
**Entonces** los componentes, datos, estructuras y contexto no están ubicados como rutas dentro de `src/app`.

## AC-29 — Cantidad de platos

**Dado** el archivo de datos  
**Cuando** se cuentan los platos  
**Entonces** hay al menos 12 distribuidos entre desayuno, almuerzo, bebidas y kiosco.

## AC-30 — Integridad de Cola

**Dado** una Cola con elementos  
**Cuando** se llama `aArray()`  
**Entonces** se obtiene una copia y no una referencia al array interno.

## AC-31 — Integridad de Pila

**Dado** una Pila con elementos  
**Cuando** se llama `aArray()`  
**Entonces** se obtiene una copia y no una referencia al array interno.

## AC-32 — No shift

**Dado** el código de Cola  
**Cuando** se busca `.shift(`  
**Entonces** no debe aparecer en la implementación de `Cola`.
