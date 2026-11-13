# Ingesta Cruda: Laboratorio Oficial: Getting Started with Cloud Storage and Cloud SQL

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Lab 689577](https://www.skills.google/paths/8/course_templates/60/labs/689577)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 4: Storage in the Cloud  
**Laboratorio**: 3 (Lab ID: `689577`)  
**Créditos**: 5 | **Duración Estimada**: 50 minutos | **Nivel**: Introductorio  
**Puntos Acumulados**: 14,100  

---

## 📝 Guía Oficial del Laboratorio Sanitizada

### Visión General y Objetivos
En este laboratorio se crea un bucket en Cloud Storage y se almacena una imagen pública en él. Asimismo, se configura una aplicación web PHP ejecutándose sobre una máquina virtual de Compute Engine para conectarse a una base de datos relacional administrada por Cloud SQL for MySQL. Finalmente, se enlaza la página web del servidor para referenciar y renderizar el banner gráfico alojado en Cloud Storage.

**Objetivos de Aprendizaje:**
1. Crear un bucket en Cloud Storage y almacenar un objeto gráfico (banner).
2. Aprovisionar y configurar una instancia gestionada de Cloud SQL for MySQL.
3. Conectar la aplicación web en Compute Engine con la base de datos Cloud SQL.
4. Incrustar y renderizar el objeto de Cloud Storage en la página web mediante su URL pública.

---

### Tareas Operativas Oficiales

#### Task 1. Sign in to the Google Cloud Console
* Acceso a la consola de Google Cloud con credenciales temporales aprovisionadas por la plataforma Skills Boost (usuario y contraseña generados).

#### Task 2. Deploy a web server VM instance
* Aprovisionamiento de una máquina virtual en Compute Engine para hospedar el servidor web Apache con PHP:
  * **Nombre**: `bloghost`
  * **Región / Zona**: Asignada por el entorno del lab (ej. `us-central1` / `us-central1-a`).
  * **Tipo de Máquina**: `e2-standard-2` (2 vCPU, 8 GB memoria).
  * **Sistema Operativo**: Debian GNU/Linux 12 (bookworm).
  * **Firewall**: Habilitar tráfico HTTP (`Allow HTTP traffic`).
  * **Automation / Startup Script**:
    ```bash
    #!/bin/bash
    apt-get update
    apt-get install apache2 php php-mysql -y
    service apache2 restart
    ```
  * Registro de identificadores de red: Dirección IP interna y dirección IP externa de `bloghost`.

#### Task 3. Create a Cloud Storage bucket using the gcloud storage command line
* Creación de bucket globalmente único, asignación de ubicación multi-región, descarga del banner oficial y asignación de ACL pública:
  ```bash
  # 1. Definir ubicación geográfica (multi-región más cercana)
  export LOCATION=US # o EU o ASIA

  # 2. Crear bucket con el nombre único del Project ID
  gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID

  # 3. Descargar imagen de banner desde bucket público de entrenamiento
  gcloud storage cp gs://cloud-training/gcpfci/my-excellent-blog.png my-excellent-blog.png

  # 4. Copiar imagen al bucket recién creado
  gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png

  # 5. Modificar la Access Control List (ACL) para lectura pública
  gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
  ```

#### Task 4. Create the Cloud SQL instance
* Aprovisionamiento de base de datos relacional gestionada:
  * **Motor**: MySQL.
  * **Edición**: Enterprise, preajuste Sandbox.
  * **Instance ID**: `blog-db`
  * **Contraseña de root**: `Passw0rd1!`
  * **Región / Zona**: Misma región y zona asignadas a `bloghost` (para minimizar la latencia de red).
  * **Seguridad de red**: Permitir tráfico de red no cifrado para efectos del laboratorio (`Allow unencrypted network traffic`).
* **Configuración de Usuario y Conexiones**:
  * Copiar la dirección IP pública de la instancia Cloud SQL.
  * Crear cuenta de usuario: Nombre `blogdbuser`, Contraseña `Passw0rd1!`.
  * En la pestaña **Connections → Networking**, agregar una red autorizada:
    * Nombre: `web front end`
    * Red: `<EXTERNAL_IP_DE_BLOGHOST>/32` (ej. `35.192.208.2/32`).

#### Task 5. Configure an application in a Compute Engine instance to use Cloud SQL
* Conexión de Apache y PHP con la base de datos MySQL mediante PDO:
  * Conexión por SSH a `bloghost`.
  * Acceder al directorio `/var/www/html`:
    ```bash
    cd /var/www/html
    sudo nano index.php
    ```
  * Código PHP inicial con bloque PDO:
    ```php
    <html>
      <head><title>Welcome to my excellent blog</title></head>
      <body>
        <h1>Welcome to my excellent blog</h1>
        <?php
        $dbserver = "CLOUDSQLIP";
        $dbuser = "blogdbuser";
        $dbpassword = "DBPASSWORD";

        // In a production blog, we would not store the MySQL
        // password in the document root. Instead, we would store
        // it in Secret Manager.

        try {
            $conn = new PDO("mysql:host=$dbserver;dbname=mysql", $dbuser, $dbpassword);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
        } catch(PDOException $e) {
            echo "Database connection failed: " . $e->getMessage();
        }
        ?>
      </body>
    </html>
    ```
  * Sustituir `CLOUDSQLIP` por la IP pública de `blog-db` y `DBPASSWORD` por `Passw0rd1!`.
  * Reiniciar el servidor web:
    ```bash
    sudo service apache2 restart
    ```
  * Validar en navegador: `http://<EXTERNAL_IP_BLOGHOST>/index.php` → Confirmar mensaje: `Connected successfully`.

#### Task 6. Configure an application in a Compute Engine instance to use a Cloud Storage object
* Enlace de imagen alojada en Cloud Storage en el frontend web:
  * Copiar la URL pública del objeto `my-excellent-blog.png` en Cloud Storage (ej. `https://storage.googleapis.com/<PROJECT_ID>/my-excellent-blog.png`).
  * Editar `/var/www/html/index.php` en `bloghost` insertando el banner antes del encabezado `<h1>`:
    ```html
    <img src='https://storage.googleapis.com/<PROJECT_ID>/my-excellent-blog.png'>
    ```
  * Reiniciar Apache:
    ```bash
    sudo service apache2 restart
    ```
  * Refrescar la página web en el navegador y validar la correcta renderización del banner gráfico.

---

## 💡 Puntos Clave y Mejores Prácticas para la Certificación Google Cloud ACE

1. **Co-ubicación de Cómputo y Datos (Zone Colocation)**:
   * Para aplicaciones de alto rendimiento, Compute Engine y Cloud SQL deben residir en la misma zona para lograr latencias de comunicación inferiores al milisegundo.
2. **Redes Autorizadas vs Private IP en Producción**:
   * En el laboratorio se utiliza la IP pública de la VM con máscara `/32` en *Authorized Networks* para fines didácticos.
   * *Práctica Recomendada para el Examen ACE*: En producción se debe implementar **Private IP** con *Private Services Access* (VPC Peering interno RFC 1918) o el **Cloud SQL Auth Proxy** para evitar exponer la base de datos a internet.
3. **Gestión de Secretos (Secret Manager)**:
   * Almacenar contraseñas de bases de datos en texto plano dentro de archivos en el document root (`/var/www/html/index.php`) es un antipatrón de seguridad crítico.
   * *Estándar Oficial*: Usar **Secret Manager** para recuperar credenciales dinámicamente mediante la identidad de la Service Account asignada a la VM.
4. **ACLs vs Uniform Bucket-Level Access (UBLA)**:
   * En este laboratorio se emplea `gsutil acl ch -u allUsers:R` para hacer público un archivo puntual mediante listas de control de acceso granulares.
   * *Estándar Oficial ACE*: Para entornos corporativos se recomienda habilitar **Uniform Bucket-Level Access** y otorgar el rol `roles/storage.objectViewer` al principal `allUsers` a nivel de bucket si se requiere distribución pública.

