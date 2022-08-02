# capitalizarme-prueba-tecnica

Esta es una app para graficar los valores de varios indicadores financieros por período.

## Requisitos

Usar la API de [mindicador.cl](https://mindicador.cl) para graficar los valores de varios indicadores financieros por período.

La interfaz debe hacerse usando React y Typescript.

### Barra de navegación

La apariencia o estilos de la interfaz no es relevante, pero debe tener la siguiente funcionalidad:

En ésta deben ir 3 selectores:

- **Indicador**: con todos los indicadores soportados por la API de Mindicador.
- **Año**: va desde [inicio] hasta 2022, donde [inicio] corresponde al primer año donde existan datos para el indicador seleccionado en el selector anterior (no todos los indicadores parten del mismo año).
- **Mes**: va desde Enero a Diciembre, incluso en 2022. Este selector se inhabilita para los indicadores cuyos valores cambian mensualmente en vez de diariamente.

### Gráfico

El gráfico puede implementarse con cualquier librería, aunque se recomienda el uso de [`react-plotly.js`](https://github.com/plotly/react-plotly.js).

El gráfico debe tener la siguiente información:

- **Título**: obtenido a partir de los parámetros seleccionados en los selectores.

- **Eje X**: Los días o meses en los que existen valores para el indicador y período seleccionados.

- **Eje Y**: Los valores del indicador en los días o meses del eje X, con una etiqueta que indique la divisa de estos valores.

📌 Cuando cambie la selección, el gráfico debe actualizarse automáticamente. Como parte del desafío, no sirve que haya un botón “actualizar” o similar.

En algunas ocasiones debe mostrarse un texto que indique la situación en vez del gráfico:

- Mientras los datos del gráfico correspondientes a la selección aún están cargando (no sirve mostrar el gráfico anterior o uno vacío, pero sí puede ser un spinner).
- Si no hay datos para el indicador y período seleccionados.
- Si hubo un error mientras cargaban los datos.

## Ejecutar localmente

Clonar, instalar dependencias y ejecutar

```bash
git clone https://github.com/piducancore/mindicador-app
cd mindicador-app
npm install
npm start
```

## Tecnologías utilizadas

Este proyecto está basado en el _starter_ de React/Typescript de [Vite](https://github.com/vitejs/vite), además de :

- [`react-plotly.js`](https://github.com/plotly/react-plotly.js) para el gráfico.
- [`react-spinners`](https://github.com/davidhu2000/react-spinners) para el _spinner_ mientras cargan los datos.
- [`zustand`](https://github.com/pmndrs/zustand) para el manejo del estado.
