# Sistema de Rutas y URLs

## Estructura de URLs

La aplicación ahora soporta URLs directas para navegar a cualquier sección:

### Página de inicio
```
http://localhost:5174/
```
Muestra la lista de todos los supermódulos disponibles.

### Sección específica
```
http://localhost:5174/module/{superModuleId}/section/{sectionId}
```

**Ejemplos:**
- `http://localhost:5174/module/0/section/0` - Python Basics → Variables
- `http://localhost:5174/module/0/section/3` - Python Basics → Listas
- `http://localhost:5174/module/1/section/7` - Estructuras de Control → Condicionales

## IDs de SuperMódulos

- `0` - Python Basics
- `1` - Estructuras de Control y Bucles
- `2` - Funciones e Introducción a Librerías (bloqueado)
- `3` - Introducción a Pandas (bloqueado)
- `4` - Proyectos Prácticos (bloqueado)

## IDs de Secciones

### SuperMódulo 0 (Python Basics)
- `0` - Variables
- `1` - Operaciones
- `2` - Más Operaciones
- `3` - Strings
- `4` - Listas
- `5` - Listas 2
- `6` - Diccionarios

### SuperMódulo 1 (Estructuras de Control)
- `7` - Condicionales (if/else)
- `8` - Operadores Lógicos
- `9` - Bucles (for)
- `10` - Bucles (while)
- `11` - Control de Flujo Avanzado

## Persistencia de Datos

El progreso de los ejercicios completados se guarda automáticamente en `localStorage` del navegador, por lo que se mantendrá incluso después de cerrar y volver a abrir la página.

## Compartir Enlaces

Ahora puedes copiar y compartir URLs directas a secciones específicas del curso. Por ejemplo, si quieres que alguien empiece con la sección de Listas, puedes compartir:

```
http://localhost:5174/module/0/section/3
```

## Navegación del Navegador

Los botones de retroceso/avance del navegador ahora funcionan correctamente y te llevarán a las secciones anteriores/siguientes que hayas visitado.
