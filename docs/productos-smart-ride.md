# Integración comercial de productos SMART RIDE

Datos comerciales: catálogo proporcionado por el propietario el 16 de octubre de 2026. `src/data/catalog.ts` es la fuente de nombres, precios, características y textos. Las páginas se generan con la arquitectura reutilizable y las rutas existentes.

## Imágenes utilizadas

Todas las fuentes están en `src/assets/media/`, conservan sus nombres originales y miden **1448 × 1086 píxeles**. Se identificaron visualmente por el diseño, los controles y los nombres rotulados en cada dispositivo, contrastándolos con las capturas del catálogo proporcionadas. No se generaron ni modificaron diseños físicos, ángulos o fondos.

| Modelo | PNG original (prefijo común: `Imagen de ChatGPT 16 oct 2026, `) | WebP en `src/assets/media/products/` |
| --- | --- | --- |
| Y13 Pro | `06_20_18 p.m.png` | `y13-pro-{480,960,1448}.webp` |
| FreedConn Hero | `06_20_39 p.m.png` | `freedconn-hero-{480,960,1448}.webp` |
| S7 PRO | `06_20_01 p.m.png` | `s7-pro-{480,960,1448}.webp` |
| S7 | `06_19_52 p.m.png` | `s7-{480,960,1448}.webp` |
| Q58 MAX | `06_20_52 p.m.png` | `q58-max-{480,960,1448}.webp` |
| P30 PRO | `06_19_39 p.m.png` | `p30-pro-{480,960,1448}.webp` |

WebP calidad 88, método 6, conversión con ImageMagick. Anchos de 480, 960 y 1448 píxeles, sin ampliar las fuentes. Los archivos de mayor resolución pesan aproximadamente 168–218 KB. `src/data/media.ts` centraliza las rutas, dimensiones y `srcSet`. Cada modelo utiliza su propia fotografía en tarjeta, hero, galería y comparador. `object-fit: contain` conserva la escena completa; solo la acción explícita de acercar en galería amplía el encuadre.

La foto premium del S7 tiene iluminación verde; la captura comercial usa iluminación violeta. Se conservó el PNG proporcionado identificado como S7, sin cambiar su color ni atribuir opciones de iluminación al producto. S7 PRO usa su archivo independiente, con rotulado S7 PRO.

## Categorías y datos incompletos

S7 está tipificado como `helmet-audio` y se muestra como **Audífonos Bluetooth para casco** en tarjeta, hero, lista de interés y comparador. La colección y URL `/intercomunicadores/s7` se conservan. No se publica alcance ni participantes para S7. Q58 MAX no publica participantes.

Las seis fichas incluyen únicamente los datos autorizados. La autonomía declarada es general y no se asigna a una modalidad específica. Las filas desconocidas se omiten de la ficha; el comparador reúne las especificaciones de todos los modelos, oculta filas sin datos y utiliza «Consultar» para datos faltantes y «No aplica» para las métricas de intercomunicación del S7 por su categoría comercial.

FreedConn Hero se actualizó sobre su slug existente, sin duplicarlo. Se eliminan de su ficha pública los datos adicionales de peso, montaje, carga y autonomía musical que no aparecen en la información autorizada. Se conserva en `SpecValue.note` el registro anterior de cifras externas de 30 h de conversación / 26 h de música, que carecía de fuente trazable y versión confirmada. **Falta verificar manual y versión exacta** antes de confirmar dichas cifras. La ficha publica las **hasta 35 horas de autonomía general** del catálogo SMART RIDE.

## Recursos pendientes

- Fotografías adicionales reales de cada modelo: laterales, montaje en casco, controles, acabados y parte posterior. Por ahora cada galería tiene una fotografía; no se crean ángulos ficticios ni varias entradas con el mismo archivo.
- Secuencias 360° reales, al menos 24 tomas por producto. El visor existente se conserva y su acceso comercial se oculta en estas seis fichas hasta cargar una secuencia válida. No se aplica giro en perspectiva a sus fotografías estáticas.
- Para incorporar esas secuencias, seguir `src/data/view360.ts`: `src/assets/360/<slug>/0001.webp…`, dimensiones reales y `view360: sequence360(...)`. No requiere nuevas páginas ni rutas.
- Disponibilidad y compatibilidad concreta: se consultan al WhatsApp comercial ya configurado. No se presume stock, compatibilidad universal de casco ni contenidos de caja.

## Alcance

Se mantienen el hero principal de la landing, navegación global, footer, configuración de despliegue y los datos de los otros siete productos. Los cambios de presentación se realizan en los componentes compartidos de producto; la corrección posterior de solapamientos comparte una composición en columnas para todas las fichas de producto, incluidas las CarPlay.

## Validación realizada

- Build de producción (`npm run build`) correcto y revisión de espacios (`git diff --check`) sin errores.
- `npm run lint` termina sin errores; conserva tres advertencias anteriores de Fast Refresh en `InterestListContext.tsx` y `Placeholders.tsx`.
- Prueba con Chromium de nombres, seis precios, especificaciones autorizadas, fotografías exclusivas, rutas y ausencia de duplicados. Los otros siete productos siguen presentes.
- Las seis páginas verificadas en anchos de 360, 768, 1366 y 1920 píxeles, con movimiento reducido: sin desbordamiento horizontal, títulos completos, imágenes cargadas y sin errores de navegador.
- Enlaces de WhatsApp verificados por número configurado y texto contextual; no se envían mensajes durante las pruebas.
- Galería: acercar/restablecer y tecla Escape comprobados. Comparador: categorías, modelos, ausencia de filas duplicadas de alcance y HTML válido sin `tbody` anidados.
- Con movimiento completo: transición compartida desde tarjeta al hero y regreso mediante historial comprobados en Y13 Pro y S7, sin nombres de transición duplicados.
- Inspección visual de tarjeta, hero de escritorio y móvil, ficha técnica y galería. Las pruebas de responsive usan navegador con tamaños simulados, no dispositivos físicos.

## Corrección de solapamientos de texto e imagen

El hero anterior permitía que el título ocupase todo el ancho por encima de la imagen (`max-width: none !important`). Ahora todos los productos utilizan una cuadrícula con columnas independientes para contenido y visual; en móvil la imagen y el contenido se apilan en el flujo normal. La tipografía responde al ancho de su columna. Las animaciones compartidas mantienen el mismo escenario y nombres de transición.

Los títulos de categoría también se ajustan a su columna. Las vistas de acercamiento fijadas al hacer scroll separan la cámara y los textos en columnas; el encuadre animado permanece dentro de su marco. Se revisaron además las tarjetas y secciones de tecnología de inicio.

Validación adicional: los 13 productos y ambas categorías, en 360, 768, 900, 1024, 1366, 1876 y 2560 píxeles de ancho, con comprobaciones de rectángulos y texto. Las secciones de tecnología y paneles de inicio se verificaron en cuatro tamaños. Se comprobó la separación de imagen y textos durante scroll real en CarPlay, Y13 Pro y EJEAS Q8, así como la transición de tarjeta CarPlay a ficha y el regreso con historial. Build de producción correcto; sin cambios en datos comerciales, rutas o despliegue.
