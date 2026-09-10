# Video-downloader

Aplicación Express con vistas EJS para descargar videos mediante `ytdl-core`. El comportamiento depende también de la compatibilidad del servicio externo.

## Estructura

- [examples](examples)
- [src](src)

## Preparación y uso

### Raíz del repositorio

Requiere Node.js. Este paquete no fija una versión del runtime; valida compatibilidad con las dependencias antes de actualizarlo.

```sh
npm ci
npm run dev
```

Comandos declarados en [package.json](package.json):

| Comando | Acción |
| --- | --- |
| `npm run test` | `echo "Error: no test specified" && exit 1` |
| `npm run start` | `node src/app` |
| `npm run dev` | `nodemon src/app` |

El script `test` es un marcador inicial, no una suite de pruebas.

## Configuración detectada en el código

Estas son referencias explícitas a variables de entorno, no una garantía de que toda la configuración esté externalizada. Los nombres y archivos permiten localizar dónde se usan; los valores deben corresponder a tu entorno.

| Variable | Referencia |
| --- | --- |
| `PORT` | [src/app.js](src/app.js) |

No guardes credenciales reales en la documentación. Si hay `.env.example`, úsalo como referencia y revisa cómo carga la configuración el punto de entrada.

## Validación y estado

Esta guía se contrastó con el árbol de archivos y los manifiestos del repositorio. No se ha validado una ejecución completa contra servicios externos, bases de datos o hardware. Las versiones y los scripts mostrados describen el código actual; no implican que sus dependencias antiguas sigan siendo compatibles.

## Documentación previa

Se conserva como referencia histórica, incluidas las imágenes y atribuciones originales. Los enlaces a demos y servicios no se han comprobado.

#Video-downloader
Simple web to download videos from youtube with **Nodejs** using the module [ytdl-core](https://www.npmjs.com/package/ytdl-core)

## Example downloading a simple video.

**Get link from video and download**\
![Downloading video from youtube](https://github.com/EladioRocha/Video-downloader/blob/master/examples/result-1.gif)

**Download all posible formats**\
![Download webm, mp3 and mp4 for webpage](https://github.com/EladioRocha/Video-downloader/blob/master/examples/result-2.gif)

**Play downloaded video mp4**\
![Play mp4 video](https://github.com/EladioRocha/Video-downloader/blob/master/examples/result-3.gif)
