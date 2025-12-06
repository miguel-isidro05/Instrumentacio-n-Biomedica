# Falta cambiar contenedores de evento y para ver usuarios, ademas cambiar ids.

# Importa FastAPI y componentes necesarios
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import csv
import io
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Cosmos DB (versión moderna async)
from azure.cosmos.aio import CosmosClient

# ===========================
#  CONFIGURACIÓN COSMOS DB
# ===========================
URL = os.getenv("COSMOS_DB_URL", "https://miguel2005.documents.azure.com:443/")
KEY = os.getenv("COSMOS_DB_KEY", "YOUR_KEY_HERE")

DATABASE_NAME = "Instru_database"

# Instancia asíncrona del cliente
client = CosmosClient(URL, credential=KEY)
database = client.get_database_client(DATABASE_NAME)

# ===========================
#   INICIAR FASTAPI
# ===========================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
#      MODELOS (Pydantic)
# ===========================
class RegisterRequest(BaseModel):
    correo: str
    usuario: str
    nombres: str
    apellidos: str
    contrasena: str

class EventRequest(BaseModel):
    actividad: str
    sintomas: str
    hora_aprox: str
    datos: str

# ===========================
#       ENDPOINTS
# ===========================

@app.get("/")
async def root():
    return {"message": "Probando FastAPI conectado a Cosmos DB!"}

#Nota: Recordar que las querys en Cosmos DB sirven para ambos tipos de contenedores,
#  tanto los con clave de partición como los sin clave de partición. Ademas ayudan
# a buscar items sin necesidad de conocer su id.

# ======================================
#         LOGIN (consultando Cosmos)
# ======================================
@app.get("/login")
async def login(usuario: str, contrasena: str):

    query = f"""
        SELECT * FROM c 
        WHERE c.type = 'usuario' AND c.id = '{usuario}'
    """
    container = database.get_container_client("Users")

    results = [
        item async for item in container.query_items(
            query=query,
            partition_key=None
        )
    ]

    if not results:
        return {"status": "error", "message": "Usuario no existe"}

    usuario_db = results[0]

    if usuario_db.get("contrasena") == contrasena:
        return {"status": "ok", "message": "Usuario encontrado"}

    return {"status": "error", "message": "Contraseña incorrecta"}


# ======================================
#         REGISTRO USUARIO
# ======================================
@app.post("/register")
async def register(request: RegisterRequest):

    item = {
        "id": request.usuario,
        "type": "usuario",
        "correo": request.correo,
        "nombres": request.nombres,
        "apellidos": request.apellidos,
        "contrasena": request.contrasena
    }
    container = database.get_container_client("Users")

    # upsert async CORRECTO
    await container.upsert_item(item)

    return {"status": "ok", "message": "Usuario registrado", "data": item}


# ======================================
#          REGISTRO EVENTO
# ======================================
@app.post("/evento")
async def evento(request: EventRequest):

    item = {
        "id": request.hora_aprox,  # Puedes cambiar a uuid
        "type": "evento",
        "actividad": request.actividad,
        "sintomas": request.sintomas,
        "hora_aprox": request.hora_aprox,
        "datos": request.datos
    }
    container = database.get_container_client("Evento")

    await container.upsert_item(item)

    return {"status": "ok", "message": "Evento registrado", "datos_evento": item}


# ======================================
#       OBTENER TODOS LOS EVENTOS
# ======================================
@app.get("/eventos")
async def obtener_eventos():
    container = database.get_container_client("Evento")
    query = "SELECT * FROM c WHERE c.type = 'evento'"

    eventos = [
        item async for item in container.query_items(
            query=query,
            partition_key=None
        )
    ]

    return {"eventos": eventos}

@app.get("/recordings")
async def get_recordings():
    container = database.get_container_client("Evento")

    # Solo documentos cuyo ID empieza con "processed_"
    query = "SELECT c.id, c.content FROM c WHERE STARTSWITH(c.id, 'processed_') AND IS_DEFINED(c.content)"

    items = [
        item async for item in container.query_items(
            query=query,
            partition_key=None  # necesario si no hay clave de partición
        )
    ]

    recordings = []

    for doc in items:
        content = doc.get("content", "")
        if not content:
            continue

        # Convertir CSV a lista de dicts
        import csv, io
        csv_text = io.StringIO(content)
        reader = csv.DictReader(csv_text)
        rows = list(reader)

        recordings.append({
            "id": doc["id"],
            "name": doc["id"],  # puedes cambiar a algo más amigable si existe
            "rows": rows
        })

    return {"recordings": recordings}

@app.get("/recordings/{rec_id}")
async def get_recording(rec_id: str):
    container = database.get_container_client("Evento")
    query = f"SELECT c.id, c.content FROM c WHERE c.id = '{rec_id}' AND IS_DEFINED(c.content)"

    items = [
        item async for item in container.query_items(
            query=query,
            partition_key=None
        )
    ]

    if not items:
        return {"error": "Grabación no encontrada"}, 404

    doc = items[0]
    import csv, io
    csv_text = io.StringIO(doc["content"])
    reader = csv.DictReader(csv_text)
    rows = list(reader)

    return {"id": doc["id"], "rows": rows}


#Mi internet: 192.168.1.132
#python -m uvicorn main:app --reload --host 0.0.0.0 
#uvicorn main:app --reload --host 0.0.0.0 
#ip: ipconfig getifaddr en0