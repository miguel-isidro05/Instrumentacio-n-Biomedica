# 🫀 Holter ECG de 3 Derivaciones con IoT

Sistema de monitoreo ambulatorio de ECG con reducción de artefactos por movimiento e integración IoT para diagnóstico cardiovascular.

![Estado](https://img.shields.io/badge/estado-activo-success.svg)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Problemática](#-problemática)
- [Características](#-características)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribución](#-contribución)
- [Autor](#-autor)
- [Licencia](#-licencia)

## 🔍 Descripción

Este proyecto desarrolla un **Holter de 3 derivaciones** con capacidades avanzadas de procesamiento de señales ECG y acelerómetro para el monitoreo ambulatorio de pacientes cardíacos. El sistema integra:

- ✅ Reducción de artefactos por movimiento mediante algoritmos de filtrado
- ✅ Registro de eventos (palpitaciones) con timestamp preciso
- ✅ Visualización en tiempo real de señales ECG y acelerómetro
- ✅ Aplicación móvil para registro de síntomas y actividades del paciente
- ✅ Aplicación web de escritorio para visualización y análisis de datos
- ✅ Base de datos en la nube (Azure Cosmos DB) para almacenamiento persistente
- ✅ API REST para comunicación entre dispositivos y aplicaciones

## 🎯 Problemática

El diagnóstico de enfermedades cardiacas en Perú enfrenta una **brecha tecnológica crítica**:

1. **Artefactos no eliminados**: Los dispositivos Holter actuales no eliminan eficientemente los artefactos causados por movimiento, lo que contamina las señales ECG y dificulta el diagnóstico.

2. **Falta de contexto clínico**: Los sistemas tradicionales no registran la actividad física ni los síntomas del paciente durante el uso del dispositivo, perdiendo información valiosa para el diagnóstico.

3. **Visualización no remota**: La ausencia de visualización en tiempo real obliga al paciente a retornar físicamente al centro médico para que el cardiólogo analice los datos, aumentando costos y tiempo de diagnóstico.

### 💡 Nuestra Solución

Este proyecto aborda estos problemas mediante:
- Algoritmos de procesamiento digital de señales para reducción de artefactos
- Registro simultáneo de actividad del paciente y síntomas
- Plataforma IoT con visualización remota en tiempo real
- Almacenamiento en la nube para acceso ubicuo de los datos

## ✨ Características

### 🏥 Monitoreo Clínico
- **3 derivaciones ECG**: Captura completa de la actividad eléctrica cardíaca
- **Reducción de artefactos**: Procesamiento inteligente con datos del acelerómetro
- **Registro de eventos**: Captura de palpitaciones con hora exacta
- **Contexto clínico**: Asociación de síntomas y actividades a eventos cardíacos

### 📱 Aplicación Móvil (React Native/Expo)
- Registro de eventos en tiempo real
- Captura de síntomas y actividad física
- Interfaz intuitiva y responsiva
- Sincronización automática con la nube

### 💻 Aplicación Web de Escritorio (React)
- Visualización de señales ECG en tiempo real
- Gráficas de acelerómetro sincronizadas
- Análisis de grabaciones históricas
- Dashboard para revisión de eventos

### ☁️ Backend y Base de Datos
- API REST con FastAPI (Python)
- Azure Cosmos DB para persistencia
- Endpoints seguros para autenticación
- Almacenamiento de señales en formato CSV

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐
│  Dispositivo    │
│  Holter ECG     │
│  (3 derivaciones│
│  + Acelerómetro)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐       ┌──────────────────┐
│   API FastAPI   │◄─────►│  Azure Cosmos DB │
│   (main.py)     │       │   (Cloud Storage)│
└────────┬────────┘       └──────────────────┘
         │
         ├─────────────────┬─────────────────┐
         ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  App Móvil   │  │  App Web     │  │  Dispositivo │
│  (Registro)  │  │ (Visualización)│ │   Médico    │
└──────────────┘  └──────────────┘  └──────────────┘
```

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido para Python
- **Azure Cosmos DB** - Base de datos NoSQL distribuida
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **Pydantic** - Validación de datos

### Frontend Web (my-app/)
- **React** - Biblioteca JavaScript para UI
- **CSS3** - Estilos personalizados
- **Chart.js/Recharts** - Visualización de gráficas ECG

### Frontend Móvil (my-app-cardio/)
- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma para aplicaciones React Native
- **TypeScript** - Tipado estático para JavaScript

### Diseño
- **Figma** - Diseño de interfaces y prototipado

### DevOps & Cloud
- **Microsoft Azure** - Infraestructura en la nube
- **Git** - Control de versiones

## 📁 Estructura del Proyecto

```
Instrumentación-Biomedica/
│
├── main.py                    # API FastAPI - Backend principal
│
├── my-app/                    # Aplicación Web de Escritorio
│   ├── public/                # Recursos estáticos
│   ├── src/
│   │   ├── App.js            # Componente principal
│   │   ├── AppWeb.jsx        # Aplicación web
│   │   ├── Componentes/
│   │   │   └── Apple_graph.jsx  # Componente de gráficas
│   │   ├── App.css
│   │   └── AppWeb.css
│   ├── package.json
│   └── README.md
│
├── my-app-cardio/            # Aplicación Móvil
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx     # Pantalla principal
│   │   │   ├── registro.tsx  # Registro de eventos
│   │   │   ├── menu.tsx      # Menú principal
│   │   │   └── explore.tsx   # Exploración de datos
│   │   └── _layout.tsx
│   ├── assets/images/        # Recursos visuales
│   ├── components/           # Componentes reutilizables
│   ├── constants/            # Constantes y configuración
│   ├── package.json
│   └── README.md
│
└── README.md                 # Este archivo
```

## 🚀 Instalación

### Prerrequisitos

- Python 3.8+
- Node.js 16+ y npm
- Cuenta de Azure (para Cosmos DB)
- Expo CLI (para app móvil)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/holter-ecg-iot.git
cd holter-ecg-iot
```

### 2. Backend (API FastAPI)

```bash
# Instalar dependencias
pip install fastapi uvicorn azure-cosmos pydantic

# Configurar credenciales de Azure
# Editar main.py con tus credenciales de Cosmos DB:
# URL = "tu_url_de_cosmos_db"
# KEY = "tu_key_de_cosmos_db"

# Ejecutar servidor
uvicorn main:app --reload --host 0.0.0.0
```

La API estará disponible en `http://localhost:8000`

### 3. Aplicación Web (my-app/)

```bash
cd my-app
npm install
npm start
```

La aplicación web se abrirá en `http://localhost:3000`

### 4. Aplicación Móvil (my-app-cardio/)

```bash
cd my-app-cardio
npm install
npx expo start
```

Escanea el código QR con la app Expo Go en tu dispositivo móvil.

## 📖 Uso

### Registro de Usuario

1. Abre la aplicación móvil
2. Completa el formulario de registro
3. Credenciales se almacenan en Azure Cosmos DB

### Registro de Eventos

1. En la app móvil, navega a "Registro"
2. Selecciona la actividad que estabas realizando
3. Describe los síntomas
4. El evento se guarda con timestamp automático

### Visualización de Señales

1. Abre la aplicación web
2. Inicia sesión con tus credenciales
3. Visualiza en tiempo real:
   - Señales ECG de 3 derivaciones
   - Datos del acelerómetro (X, Y, Z)
   - Eventos registrados

### Análisis de Grabaciones

1. En la app web, accede a "Grabaciones"
2. Selecciona la grabación deseada
3. Revisa las gráficas y eventos asociados

## 🔌 API Endpoints

### Autenticación

```http
GET /login?usuario={usuario}&contrasena={contrasena}
```

**Respuesta:**
```json
{
  "status": "ok",
  "message": "Usuario encontrado"
}
```

### Registro de Usuario

```http
POST /register
Content-Type: application/json

{
  "correo": "usuario@ejemplo.com",
  "usuario": "usuario123",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "contrasena": "password123"
}
```

### Registro de Evento

```http
POST /evento
Content-Type: application/json

{
  "actividad": "Caminando",
  "sintomas": "Palpitaciones leves",
  "hora_aprox": "2024-12-06T15:30:00",
  "datos": "csv_data_here"
}
```

### Obtener Eventos

```http
GET /eventos
```

**Respuesta:**
```json
{
  "eventos": [
    {
      "id": "2024-12-06T15:30:00",
      "type": "evento",
      "actividad": "Caminando",
      "sintomas": "Palpitaciones leves",
      "hora_aprox": "2024-12-06T15:30:00",
      "datos": "..."
    }
  ]
}
```

### Obtener Grabaciones

```http
GET /recordings
```

```http
GET /recordings/{rec_id}
```

## 📸 Capturas de Pantalla

### Aplicación Móvil
*(Agrega capturas de pantalla de tu app móvil aquí)*

### Aplicación Web
*(Agrega capturas de pantalla de tu app web aquí)*

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Miguel**
- Rol: Frontend Developer & UI/UX Designer
- Responsabilidades:
  - Desarrollo de aplicación móvil (React Native/Expo)
  - Desarrollo de aplicación web de escritorio (React)
  - Diseño de interfaces en Figma
  - Integración con Azure Cosmos DB
  - Implementación de visualización de señales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Universidad y equipo del proyecto
- Profesores de Instrumentación Biomédica
- Comunidad de desarrolladores de React y FastAPI

## 📞 Contacto

Para preguntas o soporte, por favor abre un issue en el repositorio.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Desarrollado con ❤️ para mejorar el diagnóstico cardiovascular en Perú**

