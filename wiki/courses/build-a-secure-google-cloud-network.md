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

### Lab 1: Securing Virtual Machines using BeyondCorp Enterprise (BCE)
* **Objetivo:** Habilitar acceso administrativo SSH/RDP seguro hacia instancias de Compute Engine sin dirección IP externa ni exposición directa a internet usando **IAP TCP Forwarding**.
* **Fundamento Técnico:**
  * Eliminar reglas abiertas de SSH (`0.0.0.0/0` → `tcp:22`) y crear una regla de ingreso restringida estrictamente al rango oficial de IAP: **`35.235.240.0/20`**.
  * Asignar el rol IAM `roles/iap.tunnelResourceAccessor` únicamente a los administradores autorizados.
  * Conexión mediante `gcloud compute ssh <VM> --tunnel-through-iap`.

### Lab 2: Create and Configure Multiple VPC Networks (ID: 464657)
* **Objetivo:** Crear múltiples redes VPC en modo personalizado (*Custom Mode*), desplegar instancias VM en distintas redes/regiones y verificar el aislamiento por defecto y las rutas internas entre redes.
* **Fundamento Técnico:** Las redes VPC están completamente aisladas entre sí de forma predeterminada; una VM puede tener múltiples interfaces de red (`nic0`, `nic1`) conectadas a distintas VPCs simultáneamente siempre que las subredes residan en la misma región.

### Lab 3: Control Access to VPC Networks Using Firewall Rules and IAM (ID: 464658)
* **Objetivo:** Desplegar dos servidores web Nginx, restringir el acceso HTTP externo aplicando reglas de cortafuegos filtradas por **Network Tags** y gestionar delegación segura mediante políticas IAM y **Service Accounts**.
* **Fundamento Técnico:**
  * Las reglas de firewall pueden apuntar a instancias mediante `--target-tags` (flexible para pruebas/aplicaciones) o `--target-service-accounts` (recomendado en producción por seguridad IAM).
  * Un usuario con el rol `roles/compute.securityAdmin` puede administrar reglas de firewall sin poder modificar ni eliminar instancias VM.

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
