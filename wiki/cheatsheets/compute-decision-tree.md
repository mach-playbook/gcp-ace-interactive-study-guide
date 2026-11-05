# 💻 Árbol de Decisión: Opciones de Cómputo en GCP

Guía para la elección correcta del servicio de cómputo según los requisitos del escenario de examen ACE.

---

## 🧭 Diagrama de Decisión

```
                     ¿Requisitos de Carga de Trabajo?
                                   │
      ┌────────────────────────────┼────────────────────────────┐
Control Total del SO / Kernel  Contenedores Docker           Funciones Event-Driven
      │                            │                            │
[Compute Engine]          ¿Grado de Orquestación?      [Cloud Run Functions]
(VMs, Migración "Lift & Shift",     │                   (Tareas efímeras,
licencias personalizadas)           │                    micro-procesamiento)
                                    │
               ┌────────────────────┴────────────────────┐
     Microservicios HTTP / gRPC                 Orquestación Compleja /
     Serverless (Scale-to-zero)                 Control fino de Pods y Redes
               │                                         │
          [Cloud Run]                                  [GKE]
     (Sin gestión de nodos ni clusters)                  │
                                           ┌─────────────┴─────────────┐
                                      GKE Autopilot               GKE Standard
                                    (Google administra          (Usuario administra
                                    los nodos y seguridad)       los Node Pools y VMs)
```

---

## 📋 Comparativa Rápida para el Examen

| Factor | Compute Engine | GKE (Autopilot) | Cloud Run | Cloud Run Functions |
| :--- | :--- | :--- | :--- | :--- |
| **Tiempo de arranque** | Minutos | Segundos | Milisegundos / Segundos | Milisegundos |
| **Escalado a cero** | ❌ No (salvo apagado programado) | ❌ No (nodos mínimos) | ✅ Sí | ✅ Sí |
| **Acceso SSH al Host** | ✅ Sí (OS Login / SSH) | ❌ No en Autopilot (en Standard sí) | ❌ No | ❌ No |
| **Unidad de Cobro** | Por segundo de VM | Por recurso de Pod solicitado | Por CPU/RAM consumida en solicitud | Por invocación y duración en ms |
| **Protocolos** | Cualquier protocolo TCP/UDP/IP | Cualquier protocolo sobre K8s | HTTP 1.1/2, WebSockets, gRPC | Triggers HTTP o Eventos (Pub/Sub, Storage) |

