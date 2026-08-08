---
name: gamebob-tool-qa
description: Audita repositorios jjlmoya-utils-* y herramientas GameBob mediante una combinación de tests objetivos y revisión QA editorial, técnica y visual. Úsala al incorporar o revisar una librería de utilidades, antes de publicar herramientas, cuando haya dudas sobre exactitud, i18n, SEO, accesibilidad, fuentes, metadatos o afirmaciones de validación, y para instalar una batería Vitest reutilizable sin corregir automáticamente los hallazgos.
---

# GameBob Tool QA

## Principio

Convierte en test todo criterio binario, reproducible y con baja tasa de falsos positivos. Reserva para revisión humana la autoridad de una fuente, la naturalidad de una traducción, la utilidad real, la originalidad y el juicio experto. No presentes una heurística como validación.

Por defecto, audita y conserva los tests en rojo. No corrijas los hallazgos salvo petición explícita.

## Flujo obligatorio

1. Confirma que el objetivo es un único repositorio `jjlmoya-utils-*` y lee sus instrucciones locales.
2. Lee completamente [references/quality-standard.md](references/quality-standard.md) y [references/manual-review.md](references/manual-review.md).
3. Inspecciona `package.json`, la arquitectura de `src/tool`, el registro, los contratos `ui.ts` y todos los tests existentes. No dupliques controles equivalentes.
4. Clasifica cada norma como:
   - `TEST`: comprobable de forma determinista.
   - `QA`: requiere juicio humano o experto.
   - `INTEGRATION`: pertenece al sitio consumidor, no a la librería.
5. Para repos compatibles con la arquitectura piloto, ejecuta primero:

   ```powershell
   python <skill-dir>/scripts/install_qa_tests.py <repo> --dry-run
   ```

   Revisa conflictos y después instala sin `--dry-run`. Si el repositorio difiere, adapta los tests; no fuerces la plantilla.
6. Ejecuta los tests QA de forma aislada y después la suite existente. En Windows usa `npm.cmd`. Ejecuta `lint` y `check` si existen. Marca el build como `NOT RUN` cuando sea deliberadamente costoso o el usuario lo haya excluido; nunca lo declares aprobado sin ejecutarlo.
7. Revisa manualmente una muestra representativa según `manual-review.md`. Lee [references/validation-evidence.md](references/validation-evidence.md) si existe contenido financiero, legal, médico, regulado, actualizado, de lookup o con afirmaciones fuertes.
8. Entrega un informe con evidencia por ruta y línea, separado en:
   - tests rojos;
   - QA manual;
   - controles ya cubiertos;
   - controles no ejecutados;
   - riesgos de integración.

## Reglas de automatización

- Cada fallo debe indicar herramienta, archivo, línea cuando sea posible, regla y reparación esperada.
- Un test de presencia no demuestra exactitud: exige además casos de referencia por API pública.
- No uses snapshots masivos como sustituto de aserciones de comportamiento.
- No hagas llamadas de red en tests unitarios. Verifica sintaxis offline y reserva disponibilidad/redirects para un job de enlaces separado.
- Permite excepciones solo mediante una lista explícita, mínima, documentada y con motivo; nunca mediante exclusiones globales silenciosas.
- Mantén rojos los controles que exponen deuda aceptada. No rebajes la regla para conseguir verde.

## Batería incluida

Las plantillas en `assets/vitest/` cubren huecos detectados en el piloto:

- copy visible incrustado en el runtime y claves UI muertas;
- ausencia de pruebas de comportamiento por `logic.ts`;
- afirmaciones fuertes sin `validation.ts` trazable;
- bibliografías con URLs duplicadas, inseguras o dirigidas a homepages genéricas.

El instalador no sobrescribe archivos distintos sin `--force`. La batería complementa, no reemplaza, los tests de registro, locales, slugs, schemas, SEO, accesibilidad, integridad textual, lint, tipos y build exigidos en el estándar.

## Condición de salida

Una auditoría solo es `PASS` cuando todos los gates obligatorios aplicables están verdes, la revisión manual no tiene P0/P1 y no quedan controles obligatorios como `NOT RUN`. Si se solicita únicamente diagnóstico, conserva el rojo y entrega el backlog priorizado.

