# Recursos Tipográficos Digitales — `web02CV/fonts/`

> **Asignatura:** Tecnologías Web I [SIS-214]  
> **Universidad:** Universidad Católica Boliviana "San Pablo" (UCB)  
> **Estudiante:** Ing. Antonio Alexander Vargas Sosa  
> **Evaluación:** Segundo Examen Práctico — Unidad II: Desarrollo de Interfaces Dinámicas con JavaScript

---

## Descripción del Directorio

El directorio `fonts/` almacena la suite tipográfica digital local **DS-Digital** en formato TrueType Font (`.TTF`). Estos recursos locales fueron incorporados estratégicamente para dotar al portafolio y CV interactivo de una estética de ingeniería mecatrónica y telemetría digital de alta precisión, garantizando que el diseño visual renderice de forma idéntica en cualquier sistema operativo y dispositivo, sin dependencia de servidores o CDNs externos.

---

## Ficheros Contenidos y Descripción Detallada

El directorio contiene 4 variantes tipográficas oficiales que cubren todos los pesos y estilos requeridos en la interfaz:

### 1. `DS-DIGI.TTF` — DS-Digital Regular
* **Variante:** Normal / Regular (`font-weight: normal`, `font-style: normal`).
* **Función en el Proyecto:** Tipografía display estándar para los números de telemetría meteorológica (temperatura, porcentaje de humedad, velocidad del viento) y reloj de sistema en tiempo real.
* **Propiedades:** Proporciona dígitos de segmento LED estándar de alta legibilidad sobre fondos oscuros.

---

### 2. `DS-DIGIB.TTF` — DS-Digital Bold
* **Variante:** Negrita (`font-weight: bold` o `700`, `font-style: normal`).
* **Función en el Proyecto:** Empleada de manera protagónica en los contadores estadísticos de impacto profesional situados en la sección Hero / Estadísticas.
* **Integración con JavaScript:** Esta fuente es el lienzo visual sobre el cual actúa la librería **GSAP** (`animations.js`), la cual interpola numéricamente los valores desde 0 hasta el total final (+40 proyectos, +5 años de experiencia, etc.), brindando una estética de tacómetro o display industrial moderno.

---

### 3. `DS-DIGII.TTF` — DS-Digital Italic
* **Variante:** Cursiva (`font-weight: normal`, `font-style: italic`).
* **Función en el Proyecto:** Utilizada para indicadores dinámicos de estado secundario, etiquetas de tiempo transcurrido y modo diagnóstico de la barra de estado.
* **Propiedades:** Añade una inclinación de 12 grados al display de 7 segmentos para enfatizar dinamismo y procesos en ejecución.

---

### 4. `DS-DIGIT.TTF` — DS-Digital Thin
* **Variante:** Delgada / Ultraligera (`font-weight: 200`, `font-style: normal`).
* **Función en el Proyecto:** Aplicada en indicadores de telemetría de precisión, subtítulos de métricas y mediciones auxiliares donde se requiere una presencia visual discreta que no sature la vista del usuario.

---

## Integración Técnica en el Proyecto

Las fuentes locales son declaradas formalmente en el archivo [`../css/base.css`](../css/base.css) mediante reglas `@font-face` con la directiva `font-display: swap` para optimizar el rendimiento y la velocidad de despliegue en pantalla:

```css
@font-face {
  font-family: 'DS-Digital';
  src: url('../fonts/DS-DIGI.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DS-Digital';
  src: url('../fonts/DS-DIGIB.TTF') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DS-Digital';
  src: url('../fonts/DS-DIGII.TTF') format('truetype');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'DS-Digital';
  src: url('../fonts/DS-DIGIT.TTF') format('truetype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}
```

Posteriormente, son expuestas globalmente en [`../css/variables.css`](../css/variables.css) a través del token de diseño:
```css
:root {
  --font-digital: 'DS-Digital', monospace;
}
```

---

## Matriz Resumen de Archivos Tipográficos

| Fichero | Formato | Peso / Estilo | Declaración `@font-face` | Uso Principal en UI |
|---|---|---|---|---|
| [`DS-DIGI.TTF`](./DS-DIGI.TTF) | TrueType (`.ttf`) | Normal (400) / Normal | `font-weight: normal; font-style: normal;` | Reloj digital del sistema y telemetría de clima |
| [`DS-DIGIB.TTF`](./DS-DIGIB.TTF) | TrueType (`.ttf`) | Negrita (700) / Normal | `font-weight: bold; font-style: normal;` | Contadores de impacto profesional animados con GSAP |
| [`DS-DIGII.TTF`](./DS-DIGII.TTF) | TrueType (`.ttf`) | Normal (400) / Italic | `font-weight: normal; font-style: italic;` | Sub-etiquetas de estado y modo diagnóstico |
| [`DS-DIGIT.TTF`](./DS-DIGIT.TTF) | TrueType (`.ttf`) | Thin (200) / Normal | `font-weight: 200; font-style: normal;` | Lecturas de precisión técnica y micro-indicadores |
