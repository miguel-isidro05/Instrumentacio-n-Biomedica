# 📤 Instrucciones para Subir el Proyecto a GitHub

## Paso 1: Crear un Nuevo Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Inicia sesión en tu cuenta
3. Haz clic en el botón **"+"** en la esquina superior derecha
4. Selecciona **"New repository"**
5. Completa los datos:
   - **Repository name**: `holter-ecg-iot` (o el nombre que prefieras)
   - **Description**: "Holter de 3 derivaciones con reducción de artefactos por movimiento e integración IoT"
   - **Visibility**: Público o Privado (según tu preferencia)
   - ⚠️ **NO** marques "Initialize this repository with a README"
   - ⚠️ **NO** agregues .gitignore ni licencia (ya los tenemos)
6. Haz clic en **"Create repository"**

## Paso 2: Conectar tu Repositorio Local con GitHub

Después de crear el repositorio, GitHub te mostrará instrucciones. Usa estas:

```bash
# Ve al directorio del proyecto
cd "/Users/miguel_05/Desktop/Academico/Universidad/Octavo Ciclo/Instrumentación Biomedica"

# Agrega el remoto de GitHub (reemplaza TU_USUARIO con tu nombre de usuario)
git remote add origin https://github.com/TU_USUARIO/holter-ecg-iot.git

# Verifica que el remoto se agregó correctamente
git remote -v

# Sube el código a GitHub
git push -u origin main
```

### Ejemplo:
Si tu usuario de GitHub es `miguel_05`, el comando sería:
```bash
git remote add origin https://github.com/miguel_05/holter-ecg-iot.git
git push -u origin main
```

## Paso 3: Autenticación

Cuando hagas `git push`, GitHub te pedirá autenticación. Tienes dos opciones:

### Opción A: Personal Access Token (Recomendado)

1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Genera un nuevo token con permisos de `repo`
3. Copia el token
4. Cuando Git pida tu contraseña, pega el token (NO tu contraseña de GitHub)

### Opción B: SSH (Más seguro a largo plazo)

```bash
# Genera una clave SSH
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"

# Copia la clave pública
cat ~/.ssh/id_ed25519.pub

# Agrega la clave en GitHub → Settings → SSH and GPG keys → New SSH key

# Cambia el remoto a SSH
git remote set-url origin git@github.com:TU_USUARIO/holter-ecg-iot.git

# Haz push
git push -u origin main
```

## Paso 4: Verificar

Después del push, ve a tu repositorio en GitHub y verifica que todos los archivos estén ahí:
- README.md ✅
- main.py ✅
- my-app/ ✅
- my-app-cardio/ ✅
- requirements.txt ✅
- .gitignore ✅

## 🎉 ¡Listo!

Tu proyecto ahora está en GitHub. Puedes compartir el link:
```
https://github.com/TU_USUARIO/holter-ecg-iot
```

## 📝 Comandos Útiles para el Futuro

```bash
# Ver estado del repositorio
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push

# Ver historial
git log --oneline

# Ver remotos
git remote -v
```

## ⚠️ Importante: Seguridad

**Antes de subir el proyecto a un repositorio público**, asegúrate de:

1. **Eliminar credenciales sensibles** del archivo `main.py`:
   ```python
   # ❌ NO SUBAS ESTO A GITHUB PÚBLICO:
   URL = "https://tu-cuenta.documents.azure.com:443/"
   KEY = "tu_clave_secreta_aqui"
   
   # ✅ USA VARIABLES DE ENTORNO:
   import os
   from dotenv import load_dotenv
   load_dotenv()
   
   URL = os.getenv("COSMOS_DB_URL")
   KEY = os.getenv("COSMOS_DB_KEY")
   ```

2. **Crear un archivo `.env`** (que no se subirá porque está en .gitignore):
   ```bash
   COSMOS_DB_URL=tu_url
   COSMOS_DB_KEY=tu_key
   ```

3. **Actualizar el código** para usar variables de entorno:
   ```bash
   pip install python-dotenv
   ```

4. **Hacer commit de los cambios de seguridad** antes del push:
   ```bash
   git add main.py
   git commit -m "Security: Remove hardcoded credentials"
   git push
   ```

---

💡 **Tip**: Si ya subiste las credenciales por error, debes:
1. Regenerar las credenciales en Azure
2. Hacer commit eliminándolas
3. Considerar usar `git filter-branch` para limpiar el historial (avanzado)

