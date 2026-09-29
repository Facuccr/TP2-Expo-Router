# SDD — Comedor IPF

## Objetivo

Este directorio contiene la documentación de Spec-Driven Development utilizada para construir el sistema "Comedor IPF".

El flujo es:

```text
Consigna
   ↓
spec.md
   ↓
plan.md
   ↓
tasks.md
   ↓
implementación
   ↓
acceptance.md + verificaciones
   ↓
auditoría final
```

La idea es que la IA no decida la arquitectura mientras escribe código. Primero se fija el contrato; después se implementa.

## Archivos

| Archivo | Función |
|---|---|
| `AGENTS.md` | Reglas que Antigravity debe respetar en el workspace |
| `docs/sdd/spec.md` | Especificación funcional y técnica del sistema |
| `docs/sdd/plan.md` | Arquitectura y estrategia de implementación |
| `docs/sdd/tasks.md` | Trabajo dividido en tareas ordenadas |
| `docs/sdd/acceptance.md` | Casos de aceptación y pruebas manuales |
| `docs/sdd/traceability.md` | Trazabilidad entre consigna, código y pruebas |
| `docs/sdd/implementation-protocol.md` | Protocolo de trabajo de la IA |
| `docs/sdd/decisions/` | Decisiones de diseño que conviene conservar |
| `docs/sdd/prompts/` | Prompts de trabajo para Antigravity |

## Uso recomendado con Antigravity CLI

Antigravity CLI permite definir reglas del workspace mediante `AGENTS.md`, y también permite trabajar con agentes personalizados en `.agents/agents/`. Para este TP se mantiene una configuración simple: un único agente principal con reglas claras y documentación SDD versionada en el repositorio. urlDocumentación oficial sobre reglas del workspace de Antigravity CLIhttps://antigravity.google/docs/cli/best-practices/

La metodología utilizada aquí sigue el flujo:

```text
specify → plan → implement
```

que también es el flujo mostrado en la documentación de SDD con Antigravity CLI. citeturn970554view0

## Orden de uso

### 1. Después de crear el proyecto Expo

Abrir Antigravity dentro de la raíz del proyecto y ejecutar el contenido de:

`docs/sdd/prompts/00-preflight-and-cleanup.md`

### 2. Revisar la especificación

Usar:

`docs/sdd/prompts/01-review-and-lock-spec.md`

No programar hasta tener claro el alcance.

### 3. Preparar/confirmar el plan

Usar:

`docs/sdd/prompts/02-review-plan.md`

### 4. Implementar

Repetir:

`docs/sdd/prompts/03-implement-next-task.md`

una tarea por vez.

### 5. Verificar

Usar:

`docs/sdd/prompts/04-verify-and-audit.md`

### 6. Auditoría final

Usar:

`docs/sdd/prompts/05-final-audit.md`

## Regla importante

No conviene pegar todos los prompts en una única conversación gigante. Cada paso debe dejar sus artefactos y el estado de las tareas actualizado en Git.

## Fuente del alcance

El TP exige, entre otras cosas, las rutas del sistema, Pila y Cola propias, estado global en Context, navegación protegida, búsqueda mediante parámetros, rutas dinámicas, deep links y la organización de `src/app`, `src/components`, `src/data`, `src/estructuras` y `src/context`. El entregable también exige README, respuestas A-F y evidencia de los flujos principales.
