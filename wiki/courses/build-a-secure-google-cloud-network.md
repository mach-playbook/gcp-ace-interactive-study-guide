# 🛡️ Build a Secure Google Cloud Network (Course Template ID: 654)

- **Nombre Oficial:** Build a Secure Google Cloud Network
- **ID de Plantilla Skills:** `654`
- **URL Oficial:** [https://www.skills.google/course_templates/654](https://www.skills.google/course_templates/654)
- **Insignia:** Google Cloud Skill Badge (Intermedio)
- **Duración Estimada:** 1 Hora 15 Minutos
- **Insumo Crudo Asociado:** [skills-course-654-build-secure-google-cloud-network.md](file:////wsl$/Ubuntu-20.04/home/merolhack/fl/gcp-ace-interactive-study-guide/wiki/raw/skills-course-654-build-secure-google-cloud-network.md)

---

## 🧭 Visión General del Curso

Este Skill Badge de nivel intermedio valida competencias prácticas para diseñar, asegurar y escalar redes en Google Cloud aplicando principios de confianza cero (*Zero Trust* / BeyondCorp Enterprise), segmentación multi-VPC, control de tráfico con reglas de cortafuegos basadas en etiquetas y políticas IAM, defensa perimetral contra ataques L7/DDoS con **Google Cloud Armor** y aislamiento privado mediante **Internal Load Balancing**.

```
                    [ Internet / Usuarios ]
                              |
              +---------------+---------------+
              |                               |
    [ Identity-Aware Proxy (IAP) ]   [ Global External ALB ]
        CIDR: 35.235.240.0/20        [ + Google Cloud Armor ]
              | (SSH/RDP Tunnel)              | (WAF / IP Denylist)
              v                               v
   +----------------------------------------------------+
   |              Custom Mode VPC Networks              |
   |  * Firewall Rules (Network Tags / Service Accounts)|
   |  * Health Checks: 130.211.0.0/22, 35.191.0.0/16    |
   |                                                    |
   |  [ VMs sin IP Pública ]  <--->  [ Internal LB ]    |
   |         (Bastion)                  |               |
   |                           +--------+--------+      |
   |                           |                 |      |
   |                       [ MIG 1 ]         [ MIG 2 ]  |
   +----------------------------------------------------+
```

---

## 🧪 Desglose de los 6 Laboratorios Requeridos

### Lab 1: Securing Virtual Machines using Chrome Enterprise Premium / BCE (Lab ID: GSP1036 / 592551)
* **Objetivo:** Habilitar acceso administrativo SSH y RDP seguro hacia instancias privadas Linux (`linux-iap`) y Windows (`windows-iap`) sin dirección IP externa ni exposición directa a internet usando **Chrome Enterprise Premium** (antes BeyondCorp Enterprise) e **IAP TCP Forwarding**.
* **Duración Oficial:** 30 minutos (5 créditos, nivel Intermediate).
* **Topología y Comandos Clave:**
  * 3 instancias: `linux-iap` (sin IP externa), `windows-iap` (Windows Server 2016 Datacenter, sin IP externa) y `windows-connectivity` (imagen personalizada `iap-desktop-v001` en `Qwiklabs Resources`, con IP externa y scope *Allow full access to all Cloud APIs*).
  * Regla de firewall obligatoria `allow-ingress-from-iap` permitiendo **`tcp:22,3389`** exclusivamente desde **`35.235.240.0/20`**.
  * Rol IAM **`roles/iap.tunnelResourceAccessor`** (*IAP-Secured Tunnel User*) asignado en *Security → Identity-Aware Proxy → SSH and TCP Resources* a la cuenta de servicio `<PROJECT_NUMBER>-compute@developer.gserviceaccount.com` y al usuario administrador.
  * Conexión gráfica mediante **IAP Desktop** o por CLI mediante:
    ```bash
    gcloud compute ssh linux-iap --zone=<ZONE>
    gcloud compute start-iap-tunnel windows-iap 3389 --local-host-port=localhost:0 --zone=<ZONE>
    ```

### Lab 2: Create and Configure Multiple VPC Networks (Lab ID: GSP211 / 464657)
* **Objetivo:** Crear dos redes VPC en modo personalizado (`managementnet` vía consola y `privatenet` vía CLI), configurar reglas de firewall para ICMP/SSH/RDP, contrastar conectividad interna vs externa entre VPCs y desplegar una instancia multi-NIC (`vm-appliance`) conectada a 3 redes VPC simultáneamente.
* **Duración Oficial:** 25 minutos (5 créditos, nivel Intermediate).
* **Comandos y Topología Clave:**
  ```bash
  gcloud compute networks create privatenet --subnet-mode=custom
  gcloud compute networks subnets create privatesubnet-1 --network=privatenet --region=Region_1 --range=172.16.0.0/24
  gcloud compute networks subnets create privatesubnet-2 --network=privatenet --region=Region_2 --range=172.20.0.0/20
  gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp \
    --direction=INGRESS --priority=1000 --network=privatenet \
    --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0
  gcloud compute instances create privatenet-vm-1 --zone=<ZONE> --machine-type=e2-micro --subnet=privatesubnet-1
  ```
* **Trampa ACE (Multi-NIC & Routing):** En una instancia multi-NIC (`vm-appliance` `e2-standard-4` con `eth0` en `privatesubnet-1`, `eth1` en `managementsubnet-1` y `eth2` en `mynetwork`), el DNS interno y la única ruta por defecto (`default via 172.16.0.1 dev eth0`) pertenecen a la interfaz primaria **`nic0`/`eth0`**. Al intentar hacer ping a una subred remota de otra VPC adjunta (`mynet-vm-2`), el tráfico sale por `eth0` y falla a menos que se configure **policy routing** en Linux.

### Lab 3: Control Access to VPC Networks Using Firewall Rules and IAM (Lab ID: GSP213 / 464658)
* **Objetivo:** Desplegar dos servidores web Nginx (`blue` con tag `web-server` y `green` sin etiquetas) mediante *startup scripts*, filtrar el tráfico HTTP externo con la regla `allow-http-web-server`, contrastar conectividad externa vs interna (`default-allow-internal`) y validar la separación de funciones IAM entre **Compute Network Admin** y **Compute Security Admin**.
* **Duración Oficial:** 20 minutos (5 créditos, nivel Intermediate).
* **Separación de Roles IAM (Clave de Examen ACE):**
  * **`roles/compute.networkAdmin`:** Administra recursos de red (VPCs, subredes, rutas), **excepto reglas de firewall y certificados SSL** (puede listar con `gcloud compute firewall-rules list`, pero falla al eliminar por falta de `compute.firewall.delete`).
  * **`roles/compute.securityAdmin`:** Control total para crear, modificar y eliminar **reglas de firewall y certificados SSL**.
* **Buena Práctica de Seguridad:** Aunque el laboratorio genera una llave JSON temporal para `network-admin@...`, en producción se debe evitar descargar llaves persistentes y utilizar suplantación de cuenta de servicio (`gcloud --impersonate-service-account`) o **Workload Identity Federation**.

### Lab 4: Configure an Application Load Balancer with Google Cloud Armor (ID: 464659)
* **Objetivo:** Implementar un Global External Application Load Balancer con backends globales, someterlo a pruebas de estrés (*siege*) y bloquear la IP atacante aplicando una política de seguridad de **Google Cloud Armor**.
* **Fundamento Técnico:**
  * Las políticas de Cloud Armor se asocian directamente al **Backend Service** del Application Load Balancer en el borde de la red de Google (GFE).
  * Permite reglas de denegación por IP (`--src-ip-ranges`), filtrado geográfico y reglas preconfiguradas WAF (OWASP Top 10) devolviendo código `403 Forbidden` antes de alcanzar las VMs.

### Lab 5: Enhance Application Reliability and Scalability with Internal Load Balancing (ID: 464660)
* **Objetivo:** Crear dos Managed Instance Groups (MIGs) en la misma región y configurar un **Internal Load Balancer** para distribuir tráfico privado entre ambos backends sin exponer la aplicación a internet público.
* **Fundamento Técnico:**
  * El tráfico interno nunca abandona la red VPC; requiere reglas de cortafuegos que permitan el acceso desde la subred cliente y desde los rangos oficiales de Google Health Checks (`130.211.0.0/22` y `35.191.0.0/16`).

### Lab 6: Build a Secure Google Cloud Network: Challenge Lab (ID: 464661)
* **Objetivo:** Reto práctico integrador sin guía paso a paso para endurecer el acceso SSH remoto mediante IAP, reemplazar reglas de cortafuegos permisivas (`open-access`) por reglas granulares con etiquetas de red para HTTP y SSH interno desde bastión, y validar conectividad hacia la aplicación privada.

---

## ⚡ Trampas y Claves Críticas para el Examen ACE

1. **Rango CIDR de IAP TCP Forwarding:** Memoriza **`35.235.240.0/20`**. Toda pregunta sobre acceso SSH/RDP a VMs sin IP pública requiere esta regla de firewall de ingreso junto con el rol `roles/iap.tunnelResourceAccessor`.
2. **Cloud Armor solo aplica en Edge / External Load Balancers:** Las políticas de seguridad de Google Cloud Armor se adjuntan a los **Backend Services** de balanceadores externos (como Global External Application Load Balancer), no directamente a las instancias individuales de Compute Engine.
3. **Network Tags vs Target Service Accounts:** Cualquier usuario con rol `Compute Instance Admin` puede agregar o quitar *network tags* en una VM; en cambio, usar *Service Accounts* como destino de reglas de firewall requiere permisos explícitos de `iam.serviceAccounts.actAs`, brindando mayor gobernanza.
4. **Rangos de Health Checks Obligatorios:** Sin reglas de firewall de ingreso permitiendo `130.211.0.0/22` y `35.191.0.0/16` hacia el puerto del servicio backend, los balanceadores (externos e internos) marcarán las instancias como `UNHEALTHY` y dejarán de enviar tráfico.
5. **Aislamiento de VPCs:** Dos redes VPC dentro del mismo proyecto **no se comunican** por IP interna a menos que se configure VPC Network Peering, Cloud VPN o una VM multi-NIC con interfaces en ambas redes.
