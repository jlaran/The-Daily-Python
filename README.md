# 🗞️ The Daily Python

> **365 ejercicios. Uno al día. De los fundamentos a pensar como un Senior.**

Una plataforma de práctica diaria de Python con estética de periódico vintage, que corre **100% en tu navegador** — sin backend, sin registro, sin dependencias. Un solo archivo HTML.

[![Demo en vivo](https://img.shields.io/badge/▶_DEMO_EN_VIVO-project--c2it8.vercel.app-c0331b?style=for-the-badge)](https://project-c2it8.vercel.app/)

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Pyodide](https://img.shields.io/badge/Runtime-Pyodide_(WASM)-654FF0?logo=webassembly&logoColor=white)](https://pyodide.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://project-c2it8.vercel.app/)
[![Sin dependencias](https://img.shields.io/badge/Dependencias-0-1d6b4d)]()
[![Licencia](https://img.shields.io/badge/Licencia-MIT-c0331b)]()

---

## ✨ ¿Qué es esto?

Quería volverme Senior en Python practicando todos los días, pero sin perder horas: ejercicios **cortos, con límite de tiempo y validación real**. Como no existía, lo construí.

Cada día se desbloquea **un** ejercicio. Lo resuelves contra reloj, la plataforma ejecuta tu código con tests reales, y al final siempre aprendes algo nuevo comparando dos soluciones.

```text
┌─────────────────────────────────────────────────────────────┐
│  THE DAILY PYTHON                    DAY 42/365 · 41 SOLVED │
├─────────────────────────────────────────────────────────────┤
│  TODAY'S ASSIGNMENT — Word Frequency Counter        ⏱ 7:00  │
│                                                              │
│  > escribe tu código                                         │
│  > corre los tests                                           │
│  > si fallas, ves exactamente qué dio tu código vs. qué     │
│    se esperaba                                               │
│  > al sonar el reloj: la solución estándar y "la jugada     │
│    senior", con su explicación                               │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Características

| | |
|---|---|
| 📅 **Un ejercicio por día** | Los días futuros están bloqueados — el hábito es el producto. Los pasados quedan abiertos para repasar. |
| ⏱️ **Contrarreloj** | De 5 min (básicos) a 15 min (capstones). Al agotarse, las soluciones se desbloquean pero puedes seguir intentando. |
| ✅ **Validación real** | Tu código se ejecuta con CPython compilado a WebAssembly (Pyodide) contra tests `assert`. Nada de comparar strings. |
| 🔍 **Feedback honesto** | Si un test falla, ves `tu código dio 'Hello Ana !' → se esperaba 'Hello, Ana!'`. Nunca un fallo mudo. |
| 💡 **Una pista** | Una sola, por diseño. Úsala bien. |
| 🧠 **Dos soluciones** | La estándar y **la jugada senior** — más idiomática, con la explicación de por qué gana. Ahí está el oro. |
| 🔥 **Racha y progreso** | Calendario de 365 días con sello ✓ en los resueltos. Todo persiste en `localStorage`. |
| 🛡️ **Watchdog anti-cuelgues** | Python corre en un Web Worker con límite de 12s: un loop infinito no congela la página, se reinicia el runtime y te avisa. |

## 📚 El plan de estudio (8 fases)

| Fase | Días | Tema | Dificultad |
|:---:|:---:|---|:---:|
| 1 | 1–46 | Fundamentos: variables, strings, condicionales, loops, listas | ★ |
| 2 | 47–92 | Colecciones y funciones: dicts, sets, comprehensions, `*args`, lambdas | ★★ |
| 3 | 93–138 | Errores, regex y datos: excepciones, `json`, `datetime`, parsing | ★★ |
| 4 | 139–184 | POO: clases, herencia, dunders, `dataclasses`, `Enum` | ★★★ |
| 5 | 185–230 | Iteradores, generadores, `itertools`, `functools`, decoradores | ★★★ |
| 6 | 231–276 | Algoritmos y código robusto: recursión, búsqueda binaria, `heapq`, typing | ★★★★ |
| 7 | 277–322 | Idioms senior: patrones de diseño, descriptors, `match/case`, protocolos | ★★★★ |
| 8 | 323–365 | Capstone: metaclases, mini-parsers, state machines, refactoring | ★★★★★ |

El día 365 es un proyecto final que combina metaclases, descriptors, event bus y command dispatch. Si llegas ahí, ya no eres la misma persona que el día 1. 🐍

## 🕹️ Pruébalo

**→ [project-c2it8.vercel.app](https://project-c2it8.vercel.app/)** — abre, dale a *Start today's exercise* y a correr el reloj.

> La primera validación descarga el runtime de Python (~10 MB) desde CDN; después queda cacheado y todo es instantáneo.

## 🏗️ Cómo funciona por dentro

```text
index.html  (≈0.8 MB, todo incluido)
├── UI            HTML + CSS puro (sin frameworks)
├── 365 ejercicios  JSON embebido: prompt, starter, tests,
│                   pista, 2 soluciones y explicación
├── Pyodide       CPython 3.11 → WebAssembly, cargado bajo demanda
│                 dentro de un Web Worker (la UI nunca se bloquea)
├── Runner        ejecuta tu código + asserts en un namespace aislado;
│                 si un assert falla, re-evalúa ambos lados con `ast`
│                 para mostrarte el valor real vs. el esperado
└── Watchdog      12s de límite por ejecución; si te cuelgas en un
                  while infinito, mata el worker y lo levanta de nuevo
```

Los 365 ejercicios fueron **validados programáticamente**: cada solución (estándar y senior) se ejecutó contra sus propios tests antes de publicarse. 730 soluciones, 0 fallos.

## ⚠️ Tu progreso

La racha y los días resueltos viven en el `localStorage` de tu navegador, **atados al dominio**. Usa siempre la misma URL y el mismo navegador. El botón *Reset all progress* del pie de página hace lo que promete — sin confirmación de dos pasos, como en los viejos tiempos.

## 📄 Licencia

MIT. Úsalo, modifícalo, forkéalo. Si te sirve para conseguir ese ascenso a Senior, me debes un café. ☕

---

<p align="center"><sub>Hecho con 🐍 y la terquedad de practicar todos los días.</sub></p>
