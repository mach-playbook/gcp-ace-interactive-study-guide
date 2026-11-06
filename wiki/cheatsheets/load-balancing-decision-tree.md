# 🌲 Árbol de Decisión: Cloud Load Balancing (ACE Exam Prep)

Este árbol de decisión permite determinar con precisión el tipo exacto de balanceador de carga de Google Cloud según los requerimientos arquitectónicos del enunciado en el examen Associate Cloud Engineer.

---

## 🧭 Flujo de Decisión Rápido

```
¿Por dónde ingresa el tráfico?
│
├── 🌐 TRÁFICO EXTERNO (Internet)
│    │
│    ├── ¿Requiere inspección HTTP/HTTPS, enrutamiento por URL o SSL Offloading?
│    │    ├── SÍ → External Application Load Balancer (Capa 7)
│    │    │        ├── Tráfico global multi-región con IP Anycast → Global External Application LB
│    │    │        └── Requisitos de residencia de datos regional → Regional External Application LB
│    │    │
│    │    └── NO (Tráfico TCP/UDP directo, protocolo propio o retención de IP cliente)
│    │         └── External Passthrough Network Load Balancer (Capa 4 Regional, basado en Maglev)
│
└── 🔒 TRÁFICO INTERNO (Dentro de la red VPC / On-Premises vía Cloud VPN o Interconnect)
     │
     ├── ¿Requiere enrutamiento HTTP/HTTPS entre microservicios privados?
     │    └── SÍ → Internal Application Load Balancer (Capa 7 Regional)
     │             ⚠️ REQUISITO OBLIGATORIO: Proxy-Only Subnet (--purpose=REGIONAL_MANAGED_PROXY)
     │
     └── NO (Bases de datos TCP/UDP, balanceo de alto rendimiento sin terminación proxy)
          └── Internal Passthrough Network Load Balancer (Capa 4 Regional, enrutamiento virtual de VPC)
```

---

## 📊 Matriz Comparativa Resumida

| Criterio | External Application LB | Internal Application LB | External Passthrough LB | Internal Passthrough LB |
| :--- | :--- | :--- | :--- | :--- |
| **Capa OSI** | Capa 7 (HTTP/HTTPS) | Capa 7 (HTTP/HTTPS) | Capa 4 (TCP/UDP) | Capa 4 (TCP/UDP) |
| **Alcance** | Global o Regional | Regional | Regional | Regional |
| **Tipo de IP** | Anycast Global / Regional externa | RFC 1918 Privada interna | Regional externa | RFC 1918 Privada interna |
| **Conserva IP Cliente** | No (usa `X-Forwarded-For`) | No (usa `X-Forwarded-For`) | **Sí (Passthrough directo)** | **Sí (Passthrough directo)** |
| **Subred Proxy-Only** | No requerida | **Obligatoria** | No requerida | No requerida |
| **Enrutamiento por Path** | Sí (URL Map) | Sí (URL Map) | No | No |

---

## 🛡️ Rangos de Cortafuegos Obligatorios para Health Checks

Para evitar que las instancias caigan en estado `UNHEALTHY`:

| Rango CIDR | Propósito |
| :--- | :--- |
| `130.211.0.0/22` | Sondas de health check para HTTP(S), SSL Proxy, TCP Proxy y balanceadores internos |
| `35.191.0.0/16` | Sondas de health check globales y regionales de Google Cloud |
| `209.85.152.0/22` | Sondas para balanceadores passthrough y legacy checks |
| `209.85.204.0/22` | Sondas complementarias para balanceadores passthrough y legacy checks |

