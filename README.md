
# Guía Paso a Paso: Creación de Monorepo con Turborepo, React, Express y TypeScript

Este repositorio es un ejemplo práctico de cómo configurar un monorepo desde cero utilizando **Turborepo** para gestionar un frontend en **React (Vite) + TypeScript** y un backend en **Express + TypeScript**.

---

## Estructura del Proyecto

```text
monorepo/
├── Apps/
│   ├── apis/          # Backend (Express + TypeScript)
│   └── client/        # Frontend (React + Vite + TypeScript)
├── tsconfig.json      # Configuración TypeScript base
├── package.json       # Configuración de espacios de trabajo (Workspaces)
├── turbo.json         # Configuración de Turborepo
└── ...
```

---

## 🚀 Pasos de Creación

### 1. Inicialización del Root
Primero, creamos la carpeta raíz e inicializamos el proyecto de Node.js.

```bash
mkdir monorepo && cd monorepo
npm init -y
```

### 2. Instalación de Turborepo
Instalamos Turbo como dependencia de desarrollo en la raíz.

```bash
npm install turbo --save-dev
```

### 3. Configuración de Workspaces
Modificamos el `package.json` de la raíz para definir dónde estarán nuestras aplicaciones.

```json
{
  "name": "monorepo",
  "workspaces": [
    "Apps/*"
  ],
  "scripts": {
    "start:dev": "turbo dev",
    "build": "turbo build"
  }
}
```

### 4. Creación de Aplicaciones

Creamos la carpeta `Apps` y dentro generamos nuestros proyectos:

#### Frontend (Client)
Dentro de `Apps/`, ejecutamos:
```bash
npm create vite@latest client -- --template react-swc
cd client
npm install -D typescript @types/react @types/react-dom
```

#### Backend (Apis)
Creamos la carpeta `Apps/apis` e inicializamos un proyecto con TypeScript:
```bash
mkdir apis && cd apis
npm init -y
npm install express
npm install -D typescript @types/express @types/node tsx nodemon
```

### 5. Configuración de Turborepo (`turbo.json`)
Creamos un archivo `turbo.json` en la raíz para definir cómo debe ejecutar Turbo las tareas.

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

### 6. Configuración de TypeScript

Creamos los archivos de configuración de TypeScript:

**tsconfig.json (raíz)** - Configuración base compartida:
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

**apps/client/tsconfig.json** - Configuración React:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**apps/apis/tsconfig.json** - Configuración Node:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "node",
    "outDir": "./dist"
  }
}
```

### 7. Conexión Frontend-Backend (Proxy)
Para evitar problemas de CORS durante el desarrollo, configuramos un proxy en el frontend (`Apps/client/vite.config.ts`):

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

### 8. Implementación de los Scripts de Desarrollo
Aseguramos que cada `package.json` dentro de `Apps` tenga los scripts necesarios:

**Client**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "type-check": "tsc --noEmit"
  }
}
```

**APIs**:
```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "type-check": "tsc --noEmit"
  }
}
```

**Root** (agregar scripts globales):
```json
{
  "scripts": {
    "start:dev": "turbo dev",
    "build": "turbo build",
    "type-check": "turbo type-check",
    "lint": "eslint ."
  }
}
```

---

## 🛠️ Cómo ejecutar el proyecto

### Modo Desarrollo
Para ejecutar ambas aplicaciones simultáneamente con recarga en vivo:

```bash
pnpm run start:dev
```
*   **Frontend**: Accesible en el puerto de Vite (ej: `http://localhost:5173`)
*   **Backend**: Accesible en `http://localhost:3000`

### Type Checking
Para verificar que no hay errores de tipos en ninguna aplicación:

```bash
pnpm run type-check
```

### Linting
Para ejecutar el linter en todo el proyecto:

```bash
pnpm run lint
```

### Construcción para Producción
Para compilar ambos proyectos:

```bash
pnpm run build
```

---

## 📝 Notas Adicionales
- **TypeScript Strict Mode**: El proyecto utiliza `strict: true` para máxima seguridad de tipos
- **tsx en lugar de ts-node**: El backend usa `tsx` para desarrollo (10x más rápido con esbuild)
- **Hot Reload**: Funciona automáticamente con TypeScript en ambos frontend y backend
- **Type Checking**: Ejecuta `pnpm run type-check` antes de commits para detectar errores
- Turborepo se encarga de optimizar la caché y ejecutar las tareas en paralelo, lo que acelera el flujo de trabajo en proyectos de gran escala.

## 🎯 Tecnologías Utilizadas
- **Frontend**: React 18, Vite, TypeScript 5
- **Backend**: Express, TypeScript 5, tsx
- **Monorepo**: Turborepo, pnpm workspaces
- **Calidad**: ESLint con TypeScript, strict mode habilitado
