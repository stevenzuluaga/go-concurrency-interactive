# Concurrencia en Go - Workshop Interactivo

Un Workshop interactivo y educativo sobre concurrencia en Go, construido con Next.js y componentes de shadcn.

## 🎯 Características

- **5 Secciones Educativas:**
  - **Threads** - Entiende cómo funcionan los threads del CPU y por qué Go es superior
  - **¿Por qué Go?** - Razones para aprender concurrencia en Go
  - **Visualización** - Herramientas interactivas para entender concurrencia
  - **Goroutines** - Aprende sobre las unidades de concurrencia de Go
  - **Channels** - Domina la comunicación entre goroutines

- **Interfaz Moderna:**
  - Sidebar navegable
  - Diseño responsivo
  - Componentes de shadcn/ui
  - Tema claro/oscuro

- **Contenido Completo:**
  - Explicaciones claras
  - Ejemplos de código
  - Comparativas con otros lenguajes
  - Patrones y buenas prácticas

## 🚀 Comenzar

### Requisitos previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd go-concurrency-interactive

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx              # Layout principal con sidebar
│   ├── page.tsx                # Página de inicio
│   ├── globals.css             # Estilos globales
│   │
│   ├── threads/                # Sección: Threads & Concurrencia
│   │   └── page.tsx            # Simulador de CPU threads
│   ├── why-go/                 # Sección: ¿Por qué Go?
│   ├── visualization/          # Sección: Visualización
│   ├── goroutines/             # Sección: Goroutines
│   └── channels/               # Sección: Channels
└── components/
    ├── app-sidebar.tsx         # Componente de sidebar
    ├── cpu-threads-visualizer.tsx # Simulador interactivo de threads
    ├── thread-education.tsx    # Conceptos educativos de threads
    └── ui/                     # Componentes de shadcn/ui
```

## 🎨 Paleta de Colores

- **Primario**: #00825A (Verde oscuro)
- **Secundario**: #B0F2AE (Verde claro)
- **Acento**: #DFFF61 (Amarillo)
- **Info**: #99D1FC (Azul claro)
- **Fondo**: #FAFAFA (Claro) / #2C2A29 (Oscuro)

## 🛠️ Tecnologías

- **Next.js** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **shadcn/ui** - Componentes accesibles
- **Lucide Icons** - Iconos

## 📚 Contenido

### Página: Threads & Concurrencia
Introduce los conceptos fundamentales de threads del CPU:
- **Conceptos**: Explicación de qué son los threads, cómo funcionan y su relación con los cores del CPU
- **Simulador CPU Threads**: Herramienta interactiva para visualizar cómo múltiples threads ejecutan tareas
  - Ajusta el número de threads (1-8)
  - Agrega tareas a la cola
  - Observa cómo los threads libres toman tareas de la cola
  - Ve el progreso en tiempo real
  - Completa tareas y recarga threads automáticamente

### Página: ¿Por qué Go?
- Simplicidad del lenguaje
- Rendimiento superior
- Herramientas integradas
- Multiplataforma
- Comparativa con Python, Java/C++, Rust

### Página: Visualización
- Simulación interactiva de tareas concurrentes
- Comparación visual: ejecución secuencial vs concurrente
- Indicadores de estado en tiempo real

### Página: Goroutines
- Definición y características
- Ejemplo básico
- Ciclo de vida
- Ligeras, fáciles de usar, multiplexadas
- Buenas prácticas

### Página: Channels
- Tipos de channels (buffered/unbuffered)
- Operaciones básicas
- Select statement
- Patrones comunes
- Errores comunes

## 🧪 Comandos

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm run start

# Linter
npm run lint

# Formato
npm run format
```

## 📝 Licencia

MIT

## 👨‍💻 Autor

Workshop creado para enseñar concurrencia en Go en Wompi Teacher

