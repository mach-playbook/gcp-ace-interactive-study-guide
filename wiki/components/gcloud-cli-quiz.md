# 💻 Componente: Quiz Interactivo de Sintaxis `gcloud`

Este documento describe la especificación técnica y funcional del componente interactivo de práctica de la línea de comandos `gcloud` para la guía de estudio de certificación GCP ACE.

---

## 🎯 Objetivo de Aprendizaje

El examen ACE requiere memorizar y reconocer la estructura jerárquica de comandos del SDK de Google Cloud (`gcloud`). El quiz interactivo entrena al usuario para estructurar mentalmente los comandos según la gramática canónica:

```
gcloud <release-track> <group> <subgroup> <action> [flags/arguments]
```

Ejemplos:
* `gcloud compute instances create my-vm --zone=us-central1-a`
* `gcloud container clusters get-credentials my-cluster --region=us-central1`
* `gcloud iam service-accounts create my-sa --display-name="Mi SA"`

---

## ⚙️ Modos de Juego y Evaluación

1. **Modo Selector Secuencial (Drag & Drop / Pills)**:
   * El usuario recibe un escenario (ej. *"Crea un cluster de GKE en modo Autopilot en la región us-central1"*).
   * Debe ordenar o seleccionar las piezas sintácticas correctas de un banco de botones:
     `[gcloud]` → `[container]` → `[clusters]` → `[create-auto]` → `[my-cluster]` → `[--region=us-central1]`.
2. **Modo Terminal Rápido (Type-in with Autocomplete)**:
   * Entrada de texto simulando una terminal Bash con feedback visual inmediato (verde si la bandera o comando es válido, rojo con pista en caso de error).
3. **Modo Detección de Trampa Sintáctica**:
   * Selección múltiple con comandos casi idénticos pero con errores típicos de examen (ej. `--zone` en lugar de `--region`, o `gcloud compute create instances` en vez de `gcloud compute instances create`).

---

## 📊 Métricas y Estado del Componente

* **Aciertos en Primer Intento**: Medición de retención sintáctica.
* **Tiempo por Comando**: Promedio de respuesta para agilizar la prueba real.
* **Categorías de Comandos**:
  * Compute Engine (`compute`)
  * Kubernetes Engine (`container`)
  * Storage & Databases (`storage`, `sql`)
  * IAM & Gestión de Identidad (`iam`, `projects`)

