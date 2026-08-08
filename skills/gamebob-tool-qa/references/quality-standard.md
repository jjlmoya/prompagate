# Estándar de calidad para herramientas GameBob

Este documento es el inventario normativo. Aplica cada regla o explica por qué no aplica. `TEST` significa automatizable; `QA` requiere juicio; `INTEGRATION` se valida en el sitio consumidor.

## 1. Arquitectura y contrato

| ID | Tipo | Norma |
|---|---|---|
| ARC-01 | TEST | La herramienta está registrada una sola vez, exporta componente, SEO y bibliografía, y todos los imports resuelven. |
| ARC-02 | TEST | Cada directorio sigue el contrato del repo: `entry`, `component`, `logic`, `ui`, `i18n`, bibliografía y estilos cuando apliquen. |
| ARC-03 | TEST | No hay IDs, slugs ni rutas duplicadas; los slugs respetan idioma y formato. |
| ARC-04 | TEST | El componente no introduce otro H1 y mantiene jerarquía semántica. |
| ARC-05 | TEST | No existen exports, claves UI, CSS o assets muertos sin excepción documentada. |
| ARC-06 | QA | La herramienta pertenece a la categoría correcta y no es una variante superficial de otra. |
| ARC-07 | INTEGRATION | La versión instalada en el sitio coincide con el código auditado y no hay divergencia entre paquete y `node_modules`. |

## 2. Exactitud funcional

| ID | Tipo | Norma |
|---|---|---|
| FUN-01 | TEST | Cada `logic.ts` tiene pruebas por su API pública; no basta probar registro o render. |
| FUN-02 | TEST | Incluye al menos un caso de referencia documentado, límites, entrada inválida, cero, negativos cuando apliquen y valores grandes. |
| FUN-03 | TEST | Verifica invariantes: monotonicidad, conservación, rangos, redondeo y reversibilidad cuando correspondan. |
| FUN-04 | TEST | Fechas, zonas horarias, años bisiestos, monedas, unidades y precisión decimal tienen casos explícitos. |
| FUN-05 | TEST | Lookup tables prueban códigos conocidos, desconocidos, duplicados y cobertura declarada. |
| FUN-06 | QA | La fórmula implementada coincide con la metodología explicada y con la fuente citada. |
| FUN-07 | QA | Un experto revisa resultados regulados o de alto impacto; “parece correcto” no es validación. |
| FUN-08 | QA | Se declaran alcance, supuestos, exclusiones y diferencia entre estimación, simulación y resultado oficial. |

## 3. Evidencia, actualidad y afirmaciones

| ID | Tipo | Norma |
|---|---|---|
| EVD-01 | TEST | `official`, `validated`, `verified`, `guaranteed`, `updated` y equivalentes exigen `validation.ts` o se eliminan/debilitan. |
| EVD-02 | TEST | La evidencia contiene `reviewedAt`, `methodology`, `sources`, `referenceCases` y `limitations`. |
| EVD-03 | TEST | Las fechas ISO, URLs HTTPS y ventanas de vigencia tienen formato válido. |
| EVD-04 | QA | Las fuentes son primarias, autoritativas, vigentes y realmente respaldan la afirmación exacta. |
| EVD-05 | QA | “Validado” significa comparación reproducible con casos externos y revisión identificable; tests internos por sí solos no lo justifican. |
| EVD-06 | QA | Datos anuales, tipos, leyes, tarifas, bancos y tablas declaran versión, jurisdicción y fecha efectiva. |
| EVD-07 | QA | El revisor tiene experiencia pertinente; se evita fabricar credenciales o autoría. |

## 4. Bibliografía

| ID | Tipo | Norma |
|---|---|---|
| BIB-01 | TEST | Hay bibliografía no vacía en todos los locales requeridos. |
| BIB-02 | TEST | URLs válidas, HTTPS, sin duplicados ni parámetros de tracking. |
| BIB-03 | TEST | El enlace apunta al documento, norma, dataset o página exacta; no a una homepage genérica. |
| BIB-04 | QA | El nombre corresponde al destino y no atribuye una fuente agregadora a una institución distinta. |
| BIB-05 | QA | Cada fórmula, tabla o dato temporal importante tiene una fuente cercana y pertinente. |
| BIB-06 | QA | Wikipedia, blogs y agregadores solo contextualizan; no sustituyen fuentes primarias en YMYL. |
| BIB-07 | INTEGRATION | La bibliografía se muestra al final, es legible, enlazable y no queda oculta al usuario. |

## 5. Internacionalización y calidad lingüística

| ID | Tipo | Norma |
|---|---|---|
| I18N-01 | TEST | Todos los locales configurados existen y tienen las mismas claves estructurales. |
| I18N-02 | TEST | No hay copy visible incrustado en componentes/scripts; errores, estados, botones, fallback y texto copiado usan `ui`. |
| I18N-03 | TEST | No hay claves UI muertas, mojibake, caracteres de sustitución ni fugas obvias de otro idioma. |
| I18N-04 | TEST | Slug, title y description son únicos y respetan convenciones por idioma. |
| I18N-05 | TEST | Números, moneda, fechas, decimales y unidades usan locale explícito o un contrato documentado. |
| I18N-06 | QA | El texto suena natural, conserva intención y no es traducción literal o mezcla de idiomas. |
| I18N-07 | QA | Ejemplos, legislación, monedas y unidades se adaptan o declaran claramente la jurisdicción española. |
| I18N-08 | QA | Se revisa al menos `es`, `en`, `id`, un idioma CJK y uno cirílico por repo. |

## 6. Contenido, intención y SEO

| ID | Tipo | Norma |
|---|---|---|
| CNT-01 | TEST | Título y descripción cumplen límites acordados, no están duplicados y describen la función real. |
| CNT-02 | TEST | FAQ/HowTo/schema reflejan contenido visible; no se genera marcado para contenido inexistente. |
| CNT-03 | TEST | La jerarquía de headings es secuencial y hay un único H1 en la página integrada. |
| CNT-04 | QA | La herramienta resuelve una intención concreta mejor que una fórmula trivial sin interfaz o explicación. |
| CNT-05 | QA | El contenido es original, específico y útil; no hay relleno, párrafos plantilla ni promesas infladas. |
| CNT-06 | QA | Título, intro, inputs, resultado, explicación, FAQ y bibliografía cuentan la misma historia. |
| CNT-07 | QA | Herramientas cercanas tienen propósito, inputs y salida materialmente distintos. |
| SEO-01 | INTEGRATION | Canonical, hreflang recíproco, indexabilidad, sitemap y status HTTP son correctos en producción. |
| SEO-02 | INTEGRATION | No hay soft-404, `noindex`, canonical cruzado ni páginas huérfanas. |

## 7. Accesibilidad y UX

| ID | Tipo | Norma |
|---|---|---|
| A11Y-01 | TEST | Inputs/selects/textarea tienen nombre accesible; botones tienen tipo y nombre; imágenes tienen `alt` apropiado. |
| A11Y-02 | TEST | No hay IDs duplicados; `for` referencia un control; ARIA usa roles/atributos válidos. |
| A11Y-03 | TEST | Interacciones críticas funcionan con teclado y los resultados dinámicos se anuncian cuando procede. |
| A11Y-04 | TEST | Axe u otra auditoría automática no presenta violaciones críticas/serias. |
| A11Y-05 | QA | Orden de foco, foco visible, mensajes de error, instrucciones y recuperación son comprensibles. |
| A11Y-06 | QA | Contraste, zoom 200%, reduced motion, móvil y targets táctiles son utilizables. |
| UX-01 | QA | Defaults, límites, unidades, precisión y resultado son evidentes sin leer todo el artículo. |
| UX-02 | QA | Copiar, resetear, recalcular y estados vacío/error/éxito no sorprenden ni pierden datos. |

## 8. Seguridad y privacidad

| ID | Tipo | Norma |
|---|---|---|
| SEC-01 | TEST | No se interpolan entradas no confiables en `innerHTML`; usar `textContent` o sanitización probada. |
| SEC-02 | TEST | No hay secretos, tokens, PII de ejemplo real, `eval`, ejecución dinámica ni URLs inseguras. |
| SEC-03 | TEST | Inputs tienen límites y la lógica rechaza NaN, infinito y estados imposibles. |
| SEC-04 | QA | Las afirmaciones “local”, “no enviamos” y “no almacenamos” coinciden con fetches, analytics y scripts reales. |
| SEC-05 | QA | Datos financieros/personales no aparecen en logs, URLs, errores, clipboard involuntario o telemetría. |
| SEC-06 | INTEGRATION | CSP, headers, cookies, consentimiento, TLS y reglas CDN se revisan en el sitio desplegado. |

## 9. Rendimiento y robustez

| ID | Tipo | Norma |
|---|---|---|
| PERF-01 | TEST | Lint, tipos, tests y build pasan; cualquier gate no ejecutado se declara. |
| PERF-02 | TEST | No hay errores de consola, listeners duplicados, timers huérfanos ni acceso DOM nulo en el flujo normal. |
| PERF-03 | TEST | Se evitan forced reflows obvios, assets innecesarios y dependencias pesadas para operaciones triviales. |
| PERF-04 | TEST | El bundle y assets respetan presupuestos definidos por el repo. |
| PERF-05 | QA | La herramienta responde fluidamente con entradas grandes y en móvil de gama media. |
| PERF-06 | INTEGRATION | Core Web Vitals se valida con datos de campo y una muestra suficiente, no solo una captura. |

## 10. Publicación y mantenimiento

| ID | Tipo | Norma |
|---|---|---|
| REL-01 | TEST | El paquete contiene los archivos requeridos y no publica fixtures, secretos o artefactos ajenos. |
| REL-02 | TEST | Versionado, lockfile y dependencias son coherentes; no hay vulnerabilidades críticas conocidas sin decisión documentada. |
| REL-03 | QA | Existe propietario/revisor y calendario para datos temporales o regulados. |
| REL-04 | QA | Los cambios de fórmula o datos incluyen nota de versión y revalidación de casos de referencia. |
| REL-05 | INTEGRATION | Tras publicar se comprueba instalación real, render de páginas, enlaces y smoke test de producción. |

## Severidad

- `P0`: resultado dañino, fuga de datos, cálculo crítico gravemente falso o página inaccesible.
- `P1`: cálculo incorrecto, idioma equivocado, afirmación fuerte sin evidencia, bloqueo de uso o indexabilidad rota.
- `P2`: bibliografía genérica, contenido débil, accesibilidad moderada, UX o mantenimiento.
- `P3`: limpieza, consistencia y mejoras no bloqueantes.

