# 📝 Insumo en Bruto: Monitor a Compute Engine Instance with Cloud Monitoring (Lab GSP089 / 592544)

* **Curso**: Set Up an App Dev Environment on Google Cloud (Course Template ID: `637`)
* **Laboratorio**: Lab 4 (ID: `GSP089`, Skills ID: `592544`)
* **URL Oficial**: https://www.skills.google/course_templates/637/labs/592544
* **Puntos Acumulados**: 16,466 estrellas
* **Duración / Créditos**: 20 minutos / 1 Crédito
* **Nivel**: Introductory
* **Última Actualización / Test**: 28 de septiembre de 2026

---

## 🎯 Objetivos de Aprendizaje
1. Aprovisionar una máquina virtual Compute Engine (`lamp-1-vm`) con servidor web Apache y PHP con etiqueta de cortafuegos para tráfico HTTP.
2. Inicializar el espacio de trabajo de telemetría (*Metrics Scope*) en Cloud Monitoring.
3. Instalar y validar el estado del **Google Cloud Ops Agent** dentro del sistema operativo de la VM.
4. Configurar una comprobación de tiempo de actividad (*Uptime Check*) sobre la IP pública del servidor web (frecuencia de 1 minuto).
5. Crear una política de alertas (*Alerting Policy*) con métricas del agente (`agent.googleapis.com/interface/traffic`) y canales de notificación por correo.
6. Diseñar un panel de visualización personalizado (*Custom Dashboard*) con widgets de CPU Load (1m) y Received Packets.
7. Auditar trazas operativas y ciclos de parada/reinicio en Cloud Logging (*Logs Explorer*).

---

## 🛠️ Desglose de Tareas Operativas

### Task 1. Create a Compute Engine Instance
* Parámetros de la VM:
  * **Nombre**: `lamp-1-vm`.
  * **Región / Zona**: Asignadas dinámicamente (`<REGION>`, `<ZONE>`).
  * **Familia de máquinas**: E2 (`e2-medium`: 2 vCPUs, 4 GB RAM).
  * **Disco de arranque**: Debian GNU/Linux estándar.
  * **Firewall**: Habilitar *Allow HTTP traffic* (etiqueta de red `http-server`, puerto 80 abierto en el cortafuegos de la VPC).

### Task 2. Add Apache2 HTTP Server and Install Google Cloud Ops Agent
* Conexión por SSH a `lamp-1-vm`:
  ```bash
  sudo apt-get update
  sudo apt-get install -y apache2 php
  sudo service apache2 restart
  ```
* Validación web: Abrir la IP externa de la VM en el navegador para confirmar la pantalla de bienvenida de Apache2.
* Inicialización del Metrics Scope:
  * Entrar a `Cloud Console` → `Monitoring` para vincular el proyecto al espacio de métricas.
* Instalación del Ops Agent en la VM (SSH):
  ```bash
  curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
  sudo bash add-google-cloud-ops-agent-repo.sh --also-install
  sudo systemctl status google-cloud-ops-agent"*"
  ```
* **Fundamento Arquitectónico**: El Ops Agent combina las capacidades del antiguo `Stackdriver Monitoring Agent` y `Logging Agent` en un único binario basado en Fluent Bit y OpenTelemetry Collector, recopilando telemetría interna del SO (RAM, swap, procesos, discos) y registros de sistema.

### Task 3. Create an Uptime Check
* Configuración en `Monitoring` → `Uptime checks` → `+ Create Uptime Check`:
  * **Protocol**: HTTP.
  * **Resource Type**: URL.
  * **Hostname**: Dirección IP externa de `lamp-1-vm`.
  * **Path**: `/`.
  * **Check Frequency**: 1 minuto.
  * **Title**: `Lamp Uptime Check`.
* La comprobación se ejecuta desde múltiples sondas distribuidas globalmente por Google para verificar disponibilidad y latencia.

### Task 4. Create an Alerting Policy
* Configuración en `Monitoring` → `Alerting` → `+ Create Policy`:
  * **Métrica**: Desmarcar *Active* y filtrar `Network traffic` → `VM instance > Interface` (`agent.googleapis.com/interface/traffic`).
  * **Condición**: *Above threshold*, valor umbral: `500`, ventana de retest (*Retest window*): `1 min`.
  * **Canal de Notificación**: Email (*Manage Notification Channels* → Añadir dirección de correo).
  * **Nombre de la Alerta**: `Inbound Traffic Alert`.

### Task 5. Create a Dashboard and Custom Charts
* Crear panel en `Monitoring` → `Dashboards` → `+ Create Custom Dashboard`.
* Nombre: `Cloud Monitoring LAMP Qwik Start Dashboard`.
* **Widget 1 (CPU Load)**:
  * Tipo: Line Chart.
  * Título: `CPU Load`.
  * Métrica: `VM instance > Cpu > CPU load (1m)`.
* **Widget 2 (Received Packets)**:
  * Tipo: Line Chart.
  * Título: `Received Packets`.
  * Métrica: `VM instance > Instance > Received packets`.

### Task 6. View Logs and Lifecycle Events in Cloud Logging
* Navegar a `Logging` → `Logs Explorer`.
* Filtrar por recurso: `VM Instance` → `lamp-1-vm`.
* Detener la instancia (`Stop`) desde Compute Engine y monitorizar en Logs Explorer la emisión de eventos de parada del sistema operativo y ACPI.
* Iniciar la instancia (`Start/resume`) y constatar las líneas de arranque de systemd y del servidor Apache.

### Task 7. Check Uptime Check Results and Triggered Alerts
* Verificar en `Uptime checks` el estado de respuesta de las distintas regiones geográficas.
* Inspeccionar en `Alerting` los incidentes generados por el ciclo de parada/reinicio y el envío de notificaciones por correo.

---

## 📌 Relevancia y Trampas de Examen Google Cloud ACE
1. **La Gran Trampa de la Memoria RAM en VMs**:
   * *Pregunta Clásica ACE*: "Deseas crear una alerta que dispare un webhook cuando el consumo de memoria RAM de una instancia supere el 80%, pero no encuentras la métrica en Cloud Monitoring".
   * *Solución Obligatoria*: El hipervisor de Compute Engine es ciego a los recursos internos del sistema operativo invitado (RAM, espacio libre de particiones, procesos). Se debe instalar el **Google Cloud Ops Agent** dentro del sistema operativo.
2. **Uptime Checks vs Health Checks de Load Balancing**:
   * Los *Uptime Checks* de Cloud Monitoring prueban la disponibilidad pública externa desde puntos de presencia globales para fines de alerta y SLAs.
   * Los *Health Checks* de Cloud Load Balancing son servicios de red internos que determinan si una instancia individual de un backend pool debe recibir tráfico entrante.
3. **Métricas Scope Multi-Proyecto**:
   * Un Metrics Scope puede albergar hasta 375 proyectos monitoreados vinculados a un proyecto principal de observabilidad (*scoping project*), centralizando dashboards y políticas de alerta sin duplicar configuraciones.
