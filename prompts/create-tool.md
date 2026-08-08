Create a new tool in the current utility library repository.

## Tool spec
- Name (camelCase): $TOOL_NAME
- Tool ID (kebab-case slug): $TOOL_ID
- Background icon (MDI): $ICON_BG
- Foreground icon (MDI): $ICON_FG
- Inputs: $INPUTS
- Outputs: $OUTPUTS
- Logic/formula: $LOGIC

## Instructions

1. **Read one existing tool** completely to discover patterns (logic.ts, entry.ts, index.ts, component.astro, seo.astro, bibliography.astro, bibliography.ts, CSS, i18n/en.ts)

2. **Only English** — create only `i18n/en.ts`, register only `en` in entry.ts

3. **Create all tool files** following the discovered patterns:
   - logic.ts, entry.ts, index.ts, component.astro, seo.astro,
     bibliography.astro, bibliography.ts, i18n/en.ts
   - CSS: named after the English slug (e.g. `depth-of-field-calculator.css`)

4. **SEO content** — El contenido SEO es LO MÁS IMPORTANTE. Es lo que posiciona la página en Google. Debe ser LARGO, DETALLADO y aportar valor REAL al usuario.

   **REQUISITOS OBLIGATORIOS del contenido SEO:**
   - **Extensión mínima**: al menos 2000 palabras de contenido sustancial (no relleno), distribuidas en  secciones
   - **Responde preguntas reales**: cada bloque debe resolver una duda concreta que un usuario buscaría en Google (ej: "por qué mi monitor tiene ghosting", "cómo calibrar colores sin hardware", "qué significan los ms de respuesta"). Piensa en queries long-tail con intención informativa
   - **Variedad de tipos**: usa OBLIGATORIAMENTE al menos 8 tipos distintos de los siguientes: `title`, `paragraph`, `list`, `table`, `tip`, `card`, `stats`, `glossary`, `comparative`, `diagnostic`, `proscons`, `summary`, `message`
   - **Estructura**: organiza el contenido en secciones lógicas con `title` h2, cada una con 3-5 bloques de contenido (párrafos, listas, tablas, tips, cards, etc.)
   - **Nada de texto vago**: prohibido escribir cosas como "esta herramienta es útil" o "muchos usuarios necesitan esto". Cada párrafo debe contener información concreta, datos, criterios, comparaciones o guías prácticas
   - **Sin relleno editorial**: no escribas introducciones genéricas ni conclusiones vacías. Ve directo al grano con información que el usuario pueda aplicar

   **Tipos disponibles y cuándo usarlos:**
   - `title` (h2/h3/h4): secciones principales
   - `paragraph` ({ html: string }): párrafos informativos con etiquetas HTML (`<strong>`, `<em>`, `<code>`, `<a href>` permitidas)
   - `list` ({ items: string[], icon?: string }): enumeraciones
   - `table` ({ headers: string[], rows: string[][] }): datos tabulados, specs, umbrales
   - `tip` ({ title?: string, html: string }): consejos prácticos accionables
   - `card` ({ icon?: string, title?: string, html: string }): bloques destacados
   - `stats` ({ items: { value, label, icon?, trend? }[], columns?: 2|3|4 }): datos numéricos impactantes
   - `glossary` ({ items: { term, definition }[] }): definiciones de conceptos técnicos
   - `comparative` ({ items: { title, description, icon?, highlight?, points?, pointIcon? }[], columns?: 2|3 }): comparativas de tecnologías, métodos o productos
   - `diagnostic` ({ variant: "warning"|"error"|"info"|"success", title, icon?, badge?, html }): avisos importantes, alertas
   - `proscons` ({ title?, items: { pro, con }[] }): ventajas y desventajas
   - `summary` ({ title, items: string[] }): resúmenes de sección
   - `message` ({ title?, ariaLabel?, html }): mensajes destacados

5. **Bibliography** — La bibliografía (`bibliography.ts`) es SOBRE LA TOOL, NO sobre cómo se ha construido.

   **PROHIBIDO incluir:**
   - Referencias a tecnologías de desarrollo (React, TypeScript, Astro, Web APIs, Node.js, npm, etc.)
   - Enlaces a documentación de frameworks, librerías o herramientas de build
   - Referencias a MDN a menos que sea sobre el estándar web que la tool está midiendo (ej: Web Audio API para un test de audio)
   - Cualquier URL que hable de cómo programar o implementar algo

   **DEBE incluir (4-6 entradas mínimo):**
   - Estándares de la industria relevantes (ISO, IEC, VESA, USB-IF, IEEE, ITU, CIE, SMPTE, etc.)
   - Papers académicos o artículos científicos sobre el fenómeno que mide/prueba la tool
   - Documentación oficial de los fabricantes u organizaciones del sector
   - Referencias enciclopédicas (Wikipedia) sobre el concepto, la tecnología o el fenómeno físico
   - Artículos de medios especializados reconocidos (RTINGS, AnandTech, Tom's Hardware, Audio Science Review, etc.) que expliquen el tema
   - Guías o specs oficiales de consorcios industriales

   **Ejemplo BUENO (bibliografía sobre la tool Monitor Ghosting Test):**
   ```ts
   { name: 'Blur Busters UFO Motion Tests', url: 'https://www.testufo.com/' },
   { name: 'RTINGS: monitor response time methodology', url: 'https://www.rtings.com/...' },
   { name: 'VESA ClearMR Standard', url: 'https://vesa.org/...' },
   { name: 'Wikipedia: Motion blur (display)', url: 'https://en.wikipedia.org/...' },
   ```

   **Ejemplo MALO (PROHIBIDO):**
   ```ts
   { name: 'React documentation', url: 'https://react.dev/...' },
   { name: 'MDN Canvas API', url: 'https://developer.mozilla.org/.../Canvas_API' },
   ```

6. **Design** — El diseño debe ser único, muy visual y gráfico, con prioridad en una UX bonita y cuidada. Las interfaces deben diseñarse desde cero, sin copiar ni reutilizar el diseño de otras tools. Cada herramienta tiene que ser totalmente única en su planteamiento visual y de interacción. No uses diseños genéricos. Textos grandes, mobile FIRST, SIEMPRE.

   **Tool UI compacta** — No incluyas dentro de `component.astro` un título principal ni una descripción introductoria de la herramienta: la página ya renderiza ese título y esa descripción desde el contenido de la tool. El componente debe empezar directamente con la experiencia interactiva. Toda la interfaz debe sentirse como una card compacta, functional y bien compuesta, sin una cabecera interna grande que encorsete o duplique la página.

   **Ancho completo** — La tool debe ocupar el máximo ancho que le permita la página contenedora y seguir viéndose bien en desktop ancho, tablet y móvil. No pongas un `max-width` arbitrario en la card principal salvo que el layout global lo exija claramente.

   **Modo oscuro** — La tool debe soportar el modo oscuro real del proyecto usando `.theme-dark`, igual que el resto de tools. Si hay canvas, SVG dinámico o gráficos pintados por JavaScript, también deben responder al cambio de tema.

   **Unidades convertibles** — Siempre que la herramienta muestre, pida o calcule una unidad convertible (distancia, masa, volumen, temperatura, velocidad, área, etc.), incluye un control compacto para alternar entre sistema métrico e imperial/US customary. El cambio debe afectar a los valores visibles, etiquetas, resúmenes y resultados derivados; no basta con traducir el texto de la unidad.

7. **Register the tool** by reading and updating:
   `src/index.ts`, `src/entries.ts`, `src/tools.ts`, `src/category/index.ts`

8. **QA gate** — do not run `npm run type-check`, `npm run lint`, `npm run test`, or any equivalent verification command after creating or editing a tool unless the user explicitly says `OKQA`. Stop after implementation and report that QA is pending behind the `OKQA` gate.

9. **Verify only after OKQA** — when the user explicitly says `OKQA`, run in order:
   - `npm run type-check`
   - `npm run lint`
   - `npm run test -- --testPathIgnorePatterns=i18n_coverage`
