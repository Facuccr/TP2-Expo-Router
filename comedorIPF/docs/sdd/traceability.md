# Trazabilidad — Consigna ↔ implementación

| Requisito de la consigna | Especificación | Archivos principales | Aceptación |
|---|---|---|---|
| Rutas obligatorias | `spec.md §4` | `src/app/**` | AC-02 a AC-26 |
| Pila propia | `spec.md §13, §19` | `src/estructuras/Pila.ts`, `src/context/AppContext.tsx` | AC-10, AC-21, AC-31 |
| Cola propia | `spec.md §15` | `src/estructuras/Cola.ts`, `src/context/AppContext.tsx` | AC-13, AC-20, AC-30, AC-32 |
| 12 platos | `spec.md §9` | `src/data/platos.ts` | AC-29 |
| Carrito | `spec.md §12` | `src/context/AppContext.tsx`, `src/app/(tabs)/carrito/**` | AC-09 a AC-12 |
| Turno | `spec.md §16` | `src/app/turno/[numero].tsx` | AC-15 |
| Cocina | `spec.md §17` | `src/app/cocina/**` | AC-19 a AC-22 |
| Historial | `spec.md §18` | `src/app/cocina/atendidos.tsx` | AC-21 |
| navegación Link/router | `spec.md §14, §30` | `src/app/**` | AC-14 |
| replace | `spec.md §14` | confirmar.tsx | AC-14 |
| búsqueda URL | `spec.md §11` | buscar.tsx | AC-07, AC-08 |
| protected | `spec.md §22` | `_layout.tsx`, `login.tsx`, `cocina/**` | AC-16 a AC-22 |
| redirect | `spec.md §23` | pedido.tsx | AC-23 |
| 404 | `spec.md §24` | `+not-found.tsx` | AC-24 |
| DondeEstoy | `spec.md §25` | `src/components/DondeEstoy.tsx` | AC-25 |
| deep link | `spec.md §26` | `app.json/app.config.*`, rutas | AC-26 |
| typed routes | `spec.md §27` | configuración + hrefs | AC-27 |
| estructura de carpetas | `spec.md §28` | `src/**` | AC-28 |
| tabs | `spec.md §7` | `(tabs)/_layout.tsx` | AC-02 |
| Stack anidado | `spec.md §7` | `menu/_layout.tsx`, `carrito/_layout.tsx` | AC-02, AC-03 |
| Drawer | `spec.md §8` | `cocina/_layout.tsx` | AC-19 a AC-22 |
| Context root | `spec.md §20` | `app/_layout.tsx`, `context/*` | AC-09 a AC-22 |
