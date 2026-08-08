# Evidencia de validación

## Qué significa “validado”

Una herramienta está validada para un alcance concreto cuando:

1. la metodología y la versión están documentadas;
2. la implementación se prueba por su API pública;
3. casos de referencia externos y reproducibles coinciden dentro de una tolerancia declarada;
4. fuentes autoritativas respaldan fórmula, datos y vigencia;
5. una revisión identificable confirma el alcance y las limitaciones.

Una bibliografía al final no satisface por sí sola estos puntos. Tampoco los satisface una suite que compara el código consigo mismo.

## Contrato recomendado

Cada herramienta con afirmaciones fuertes o datos sensibles debe exponer `validation.ts`:

```ts
export const validationEvidence = {
  reviewedAt: '2026-07-16',
  reviewer: {
    name: 'Nombre real o equipo responsable',
    expertise: 'Competencia pertinente',
  },
  jurisdiction: ['ES'],
  methodology: 'Fórmula, algoritmo, redondeo y supuestos.',
  version: '2026.1',
  effectiveFrom: '2026-01-01',
  sources: [
    {
      title: 'Documento concreto',
      url: 'https://dominio-oficial/ruta-concreta',
      accessedAt: '2026-07-16',
      primary: true,
    },
  ],
  referenceCases: [
    {
      name: 'Caso oficial 1',
      input: {},
      expected: {},
      tolerance: 0.01,
      sourceUrl: 'https://dominio-oficial/caso',
    },
  ],
  limitations: ['No sustituye...', 'No cubre...'],
} as const;
```

No rellenes campos para satisfacer el test. Si falta evidencia, elimina o matiza la afirmación.

## Nivel según herramienta

- Matemática pura: casos conocidos, propiedades e invariantes. No necesita fingir una autoridad “oficial”.
- Financiera general: fórmula publicada, precisión/redondeo, supuestos y escenarios adversos.
- Legal/fiscal/regulada: fuente primaria, jurisdicción, fecha efectiva, versión, casos externos y revisión experta.
- Datos actuales: procedencia, fecha de extracción, cobertura, caducidad y mecanismo de actualización.
- Lookup (bancos, códigos, catálogos): fuente del registro, cobertura declarada, desconocidos y fecha de snapshot.
- Heurística/optimización: objetivo, supuestos, sensibilidad, límites y prohibición de prometer resultados.

## Casos de referencia

Cada suite debe incluir:

- un caso publicado por fuente externa cuando exista;
- un cálculo manual simple;
- límites de cada tramo o regla;
- entrada inválida y datos incompletos;
- redondeo y tolerancia explícitos;
- un caso que demuestre cada limitación material.

