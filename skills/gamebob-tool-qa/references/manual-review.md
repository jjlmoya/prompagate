# Protocolo de revisión manual

## Muestra mínima

Selecciona como mínimo:

1. la herramienta con mayor riesgo (finanzas, legal, salud, datos actuales o lookup);
2. una herramienta matemática pura;
3. una herramienta con interacción compleja;
4. locales `es`, `en`, `id`, uno CJK y uno cirílico;
5. escritorio estrecho, móvil y zoom 200%;
6. entrada válida típica, límite, inválida y valor extremo.

Amplía la muestra si aparece un patrón sistémico. No extrapoles un PASS de tres páginas a todo el repositorio.

## Revisión por herramienta

### Intención y diferenciación

- Resume en una frase el problema, usuario, inputs y resultado.
- Compárala con herramientas vecinas. Si solo cambia el título, unidad o copy, marca posible duplicidad.
- Comprueba que el resultado permite tomar una acción y que la explicación no es relleno.

### Exactitud y evidencia

- Reconstruye manualmente un caso sencillo.
- Compara al menos un caso con una fuente o calculadora oficial/autoritaria independiente.
- Sigue cada dato o fórmula importante hasta la referencia concreta.
- Distingue validación de formato, exactitud matemática, exactitud regulatoria y completitud de una base de datos.
- Si no hay evidencia externa suficiente, escribe `NO VALIDADO`, no “incorrecto”.

### Lenguaje

- Busca frases de otro idioma, traducción literal, género/número incorrecto y terminología inconsistente.
- Verifica que botones, errores, resultados, texto copiado y fallback también estén traducidos.
- Revisa monedas, unidades, separadores y ejemplos culturales/jurisdiccionales.

### Contenido y confianza

- Comprueba que el título no promete más que el algoritmo.
- Penaliza `official`, `exact`, `guaranteed`, `validated`, `updated` y superlativos si no están demostrados.
- Comprueba que metodología, limitaciones, versión de datos y fecha de revisión sean visibles donde importan.
- Verifica que autor/revisor y experiencia sean reales; no inventes señales E-E-A-T.

### UX y accesibilidad

- Completa el flujo solo con teclado.
- Fuerza errores y confirma que explican cómo recuperarse.
- Revisa foco, contraste, zoom, targets táctiles, scroll horizontal y anuncios de resultados.
- Verifica estados inicial, carga si existe, vacío, error, éxito, copiar y recalcular.

### Privacidad y seguridad

- Contrasta las promesas con Network, storage, analytics y logs del navegador.
- Introduce HTML, texto largo, NaN/infinito cuando el control lo permita y caracteres no latinos.
- Comprueba que datos sensibles no aparecen en URL, consola o telemetría.

## Informe obligatorio

Usa esta estructura:

```text
Resultado: FAIL | PASS | INCOMPLETE
Repo/commit:
Comandos ejecutados:
No ejecutado:

Tests rojos
- [P1][I18N-02] archivo:línea — evidencia — resultado esperado

QA manual
- [P1][EVD-04] herramienta/locale — evidencia — por qué requiere juicio

Cubierto y verde
- [regla] test/comando que lo demuestra

Integración pendiente
- [SEO-01] comprobación requerida en website/producción
```

No mezcles hallazgos objetivos con opiniones. Indica muestra y límites de la auditoría.

