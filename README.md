# DevOps Learning Platform

Una aplicación Angular moderna diseñada como punto de partida para generar prompts educativos sobre DevOps y colaboración en equipos de desarrollo.

## Características

- **Revisión de Código**: Interfaz para simular revisiones de código con comentarios y aprobaciones
- **Historial de Commits**: Visualización cronológica de commits con información detallada
- **Colaboración del Equipo**: Panel de gestión de miembros del equipo y pull requests
- **Diseño Responsivo**: Interfaz adaptable a diferentes dispositivos
- **Angular Material**: UI moderna y consistente

## Tecnologías Utilizadas

- Angular 17+ con Standalone Components
- Angular Material para componentes UI
- TypeScript con configuración estricta
- RxJS para programación reactiva
- SCSS para estilos
- Jasmine y Karma para testing

## Estructura del Proyecto

```
src/app/
├── components/           # Componentes de la aplicación
│   ├── header/          # Barra de navegación superior
│   ├── sidebar/         # Panel lateral de navegación
│   ├── code-review/     # Componente de revisión de código
│   ├── commit-history/  # Historial de commits
│   └── team-collaboration/ # Colaboración del equipo
├── services/            # Servicios de la aplicación
│   ├── devops.service.ts    # Gestión de datos DevOps
│   └── notification.service.ts # Sistema de notificaciones
├── pipes/               # Pipes personalizados
│   └── format-date.pipe.ts # Formateo de fechas
├── models/              # Interfaces y tipos
│   └── interfaces.ts    # Definiciones de tipos
└── app.ts              # Componente principal
```

## Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

#### Solución de Problemas Comunes

**Error de Rollup en Windows**: Si encuentras el error `Cannot find module @rollup/rollup-win32-x64-msvc`, ejecuta:
```bash
# Eliminar dependencias
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# Reinstalar con force
npm install --force
npm install @rollup/rollup-win32-x64-msvc --save-dev --force
```

### Build de Producción
```bash
npm run build
```

### Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Formateo de Código
```bash
npm run format
```

## Uso como Base Educativa

Esta aplicación está diseñada para servir como contexto práctico al generar prompts educativos sobre:

- **Flujos de trabajo DevOps**
- **Colaboración en equipos de desarrollo**
- **Revisión de código y pull requests**
- **Gestión de commits y versionado**
- **Mejores prácticas de desarrollo**

### Ejemplos de Prompts Educativos

La aplicación proporciona ejemplos reales para explicar conceptos como:

1. **Revisión de Código**: Cómo estructurar comentarios constructivos
2. **Mensajes de Commit**: Buenas prácticas para mensajes descriptivos
3. **Colaboración**: Gestión efectiva de equipos de desarrollo
4. **Integración Continua**: Flujos de trabajo automatizados

## Componentes Principales

### DevopsService
Servicio que gestiona los datos mock para demostrar:
- Commits con información de autor, fecha y archivos modificados
- Miembros del equipo con roles y responsabilidades
- Revisiones de código con estados y comentarios

### NotificationService
Sistema de notificaciones que demuestra:
- Feedback visual para acciones del usuario
- Diferentes tipos de mensajes (éxito, error, información)

### FormatDatePipe
Pipe personalizado que muestra:
- Formateo de fechas relativas ("hace 2 horas")
- Localización en español
- Manejo de casos edge

## Contribución

Esta aplicación está diseñada para ser un punto de partida educativo. Las mejoras sugeridas incluyen:

- Añadir más datos mock realistas
- Implementar funcionalidades adicionales de DevOps
- Mejorar la accesibilidad
- Añadir más tests de integración

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.