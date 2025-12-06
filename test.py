
# Ahora `container` ya está listo para hacer:
# container.upsert_item(...)
from azure.cosmos import CosmosClient, PartitionKey
import os
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv("COSMOS_DB_URL")
KEY = os.getenv("COSMOS_DB_KEY")
DATABASE_NAME = "Instru_database"
CONTAINER_NAME = "ECG_signal"
PARTITION_KEY = "/id"

client = CosmosClient(URL, credential=KEY)

# Crear la base de datos SIN throughput dedicado
database = client.create_database_if_not_exists(id=DATABASE_NAME)

# Crear el contenedor SIN throughput
container = database.create_container_if_not_exists(
    id=CONTAINER_NAME,
    partition_key=PartitionKey(path=PARTITION_KEY)
)

print("✔ Contenedor creado sin RU dedicadas")