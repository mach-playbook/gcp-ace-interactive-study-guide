# Google Cloud Fundamentals: Core Infrastructure - Get Started with Virtual Private Cloud Networking and Compute Engine

- **Fuente Original:** Google Skills (Course Template 60, Lab ID 689567)
- **URL Laboratorio:** https://www.skills.google/course_templates/60/labs/689567
- **Nivel:** Introductorio
- **Duración Estimada:** 40 minutos (5 Créditos)
- **Módulo:** Módulo 3: Máquinas Virtuales y Redes en la Nube (Virtual Machines and Networks in the Cloud)
- **Fecha de Ingesta:** 2026-11-09

---

## 📝 Resumen Operativo y Objetivos Oficiales

Google Cloud Virtual Private Cloud (VPC) provee conectividad de red a instancias de máquinas virtuales (VMs) de Compute Engine, contenedores de Google Kubernetes Engine (GKE) y entornos flexibles de App Engine. Sin una red VPC, es imposible crear instancias de VM. Por esta razón, todo proyecto nuevo en Google Cloud cuenta de forma predeterminada con una red llamada `default`.

En este laboratorio se profundiza en la anatomía de una red VPC:
1. Explorar la red predeterminada (`default`), sus subredes regionales, tablas de enrutamiento y reglas de cortafuegos de ingreso.
2. Eliminar la red `default` y verificar en la consola que no es posible desplegar ninguna VM en ausencia de una red VPC.
3. Recrear una red VPC en modo automático (`mynetwork`) con sus reglas de cortafuegos y aprovisionar dos instancias VM en regiones geográficas separadas.
4. Experimentar con la conectividad de red interna y externa, y verificar empíricamente el impacto de remover individualmente las reglas de firewall `allow-icmp`, `allow-custom` y `allow-ssh`.

---

## 🛠️ Guía Paso a Paso del Laboratorio

### Task 1. Explorar la Red Predeterminada y Demostrar Dependencia de VPC
1. **Inspeccionar Subredes:**
   - Navegación: `Navigation Menu → VPC network → VPC networks`.
   - Seleccionar red `default` y hacer clic en `Subnets`.
   - Cada región de Google Cloud cuenta con una subred automática con un bloque CIDR privado RFC 1918 predefinido (ej. `10.128.0.0/20`, `10.132.0.0/20`, etc.) y una puerta de enlace (*gateway*).
2. **Inspeccionar Rutas:**
   - En el panel izquierdo, clic en `Routes`.
   - Filtrar por red `default` y seleccionar la región asignada por el laboratorio.
   - Existe una ruta gestionada para cada subred y una ruta por defecto hacia internet (`0.0.0.0/0` con gateway a internet).
3. **Inspeccionar Reglas de Firewall:**
   - En el panel izquierdo, clic en `Firewall`.
   - Se encuentran las 4 reglas estándar de ingreso (*Ingress*):
     - `default-allow-icmp`: Tráfico ICMP desde cualquier origen (`0.0.0.0/0`).
     - `default-allow-rdp`: Puerto TCP 3389 desde `0.0.0.0/0`.
     - `default-allow-ssh`: Puerto TCP 22 desde `0.0.0.0/0`.
     - `default-allow-internal`: Todo tráfico TCP, UDP e ICMP interno en el bloque `10.128.0.0/9`.
4. **Eliminar Reglas de Firewall y la Red Default:**
   - Seleccionar las 4 reglas y hacer clic en `Delete`.
   - Ir a `VPC networks`, seleccionar `default` y hacer clic en `Delete VPC network`.
   - Verificar en `Routes` y `Firewall` que al no haber red VPC, no existe ninguna ruta ni regla de firewall.
5. **Comprobación Crítica: Intento Fallido de Crear VM:**
   - Navegar a `Compute Engine → VM instances → Create instance`.
   - En la pestaña de red, el asistente muestra un error bloqueante: *"no more networks and no network available"*.
   - **Conclusión de Examen:** Compute Engine requiere de manera obligatoria una red VPC activa para asignar una interfaz virtual de red (vNIC).

---

### Task 2. Crear una Red VPC en Modo Automático y Desplegar VMs Multi-Región
1. **Crear Red VPC `mynetwork`:**
   - Navegar a `VPC network → VPC networks → Create VPC network`.
   - Nombre: `mynetwork`.
   - Modo de creación de subredes: `Automatic` (crea una subred en cada región disponible).
   - Reglas de Firewall: Seleccionar todas las reglas disponibles (`allow-custom`, `allow-icmp`, `allow-rdp`, `allow-ssh`).
   - Las reglas implícitas `deny-all-ingress` (prioridad 65535) y `allow-all-egress` (prioridad 65535) se muestran pero no pueden desactivarse. Las reglas explícitas tienen prioridad 1000 y se evalúan primero.
2. **Crear VM en Región 1 (`mynet-us-vm`):**
   - Nombre: `mynet-us-vm` | Región 1 / Zona 1 | Serie `E2` | Tipo de máquina `e2-micro` (2 vCPU, 1 GB memoria) | Red: `mynetwork`.
3. **Crear VM en Región 2 (`mynet-r2-vm`):**
   - Nombre: `mynet-r2-vm` | Región 2 / Zona 2 | Serie `E2` | Tipo de máquina `e2-micro` | Red: `mynetwork`.
   - **Nota sobre Direcciones IP:** Las IPs externas asignadas son **efímeras**. Si una VM se apaga (*Stop*), su IP externa efímera se libera al pool general de Google Cloud y al reiniciar la VM se le asigna una IP externa diferente. Para conservar la misma IP pública permanentemente, se debe reservar una **dirección IP externa estática**.

---

### Task 3. Explorar Conectividad y Desglose de Reglas de Firewall
1. **Conectar por SSH a `mynet-us-vm`:**
   - Hacer clic en el botón `SSH`.
   - La conexión funciona gracias a la regla de firewall `mynetwork-allow-ssh` (puerto TCP 22 desde `0.0.0.0/0`). Compute Engine genera y administra la llave SSH en metadatos o mediante OS Login.
2. **Prueba de Conectividad Inicial:**
   - Ping a la IP interna de `mynet-r2-vm`:
     ```bash
     ping -c 3 <IP-INTERNA-mynet-r2-vm>
     ```
     Funciona con 0% packet loss gracias a la regla `mynetwork-allow-custom`.
   - Ping a la IP externa de `mynet-r2-vm`:
     ```bash
     ping -c 3 <IP-EXTERNA-mynet-r2-vm>
     ```
     Funciona con 0% packet loss gracias a la regla `mynetwork-allow-icmp`.

#### Pregunta de Evaluación Oficial del Laboratorio
* **Enunciado:** *Which firewall rule allows the ping to mynet-r2-vm's external IP address?*
* **Opciones:**
  * `mynetwork-allow-ssh`
  * ✅ **`mynetwork-allow-icmp`** *(Respuesta Correcta)*
  * `mynetwork-allow-custom`
  * `mynetwork-allow-rdp`
* **Explicación Oficial:** La regla `mynetwork-allow-icmp` abre el protocolo ICMP desde cualquier origen en internet (`0.0.0.0/0`), permitiendo que paquetes dirigidos a la IP pública externa respondan al ping. La regla `mynetwork-allow-custom` únicamente autoriza tráfico con origen en el bloque privado interno (`10.128.0.0/9`).

3. **Prueba 1: Eliminar `mynetwork-allow-icmp`:**
   - Eliminar la regla `mynetwork-allow-icmp` desde la consola de Firewalls.
   - Ping a la IP externa de `mynet-r2-vm`: **100% packet loss** (falla como se esperaba).
   - Ping a la IP interna de `mynet-r2-vm`: **Continúa respondiendo exitosamente** porque `mynetwork-allow-custom` sigue activa y cubre el rango interno.
4. **Prueba 2: Eliminar `mynetwork-allow-custom`:**
   - Eliminar la regla `mynetwork-allow-custom`.
   - Ping a la IP interna de `mynet-r2-vm`: **100% packet loss** (bloqueado por la regla implícita `deny-all-ingress`).
5. **Prueba 3: Eliminar `mynetwork-allow-ssh`:**
   - Eliminar la regla `mynetwork-allow-ssh`.
   - Intentar abrir una nueva sesión SSH hacia `mynet-us-vm`: La consola muestra el mensaje *"Connection failed"*, confirmando que el tráfico al puerto TCP 22 está completamente bloqueado.

---

## 🎯 Síntesis Técnica y Trampas Frecuentes para el Examen ACE

1. **Requisito Indispensable de VPC:**
   - Las instancias de Compute Engine, clusters GKE y apps App Engine Flex **no pueden existir** en el vacío: requieren una red VPC para aprovisionar su interfaz de red virtual (`nic0`).
2. **Redes Auto Mode vs Custom Mode:**
   - *Auto Mode:* Crea automáticamente una subred en cada región actual y futura dentro del espacio `10.128.0.0/9`. Práctico para laboratorios y prototipos, pero no recomendado en producción empresarial para evitar solapamiento de IPs con redes on-premises.
   - *Custom Mode:* Subredes creadas explícitamente con prefijos CIDR controlados. Es el estándar obligatorio de producción.
3. **Reglas Implícitas de Firewall en Google Cloud:**
   - `allow-all-egress` (Prioridad 65535): Permite todo tráfico saliente hacia cualquier destino.
   - `deny-all-ingress` (Prioridad 65535): Bloquea todo tráfico entrante no autorizado explícitamente.
   - Tienen la prioridad más baja (número más alto: 65535), por lo que cualquier regla de usuario (prioridades 1-65534) tiene precedencia sobre ellas.
4. **Comportamiento de IPs Efímeras vs Estáticas:**
   - Una IP externa efímera se desasocia y se devuelve al pool público de Google tan pronto la VM entra en estado `TERMINATED` / `STOPPED`. Al reiniciar la máquina, la IP externa cambia.
   - Si una carga requiere conservar la misma IP pública para registros DNS externos o whitelists de clientes, se debe reservar formalmente una dirección IP externa estática (`gcloud compute addresses create ...`).

