# 📈 Componente: Tracker de Preparación por Dominio

Especificación del sistema de seguimiento de preparación del estudiante basado en los pesos oficiales del examen Google Cloud ACE.

---

## 🎯 Objetivo de Aprendizaje

Brindar al usuario una visión cuantificable de su estado de preparación por dominio, calculando una puntuación global ponderada frente al umbral aproximado de aprobación (~70%).

---

## ⚖️ Ponderaciones Oficiales (ACE v4.0)

| Dominio | Nombre del Dominio | Peso Oficial | Umbral Recomendado para Aprobar |
| :--- | :--- | :---: | :---: |
| **Dominio 1** | Configuración del Entorno Cloud | **23%** | ≥ 75% de aciertos |
| **Dominio 2** | Planificación e Implementación de Soluciones | **30%** | ≥ 75% de aciertos |
| **Dominio 3** | Operación Exitosa de Soluciones | **27%** | ≥ 75% de aciertos |
| **Dominio 4** | Configuración de Acceso y Seguridad | **20%** | ≥ 80% de aciertos |

---

## 🧮 Lógica de Cálculo del Índice de Preparación

El índice de preparación global (*Readiness Index*) se calcula mediante el promedio ponderado de los aciertos por dominio:

```
Score Global = (Puntaje_D1 × 0.23) + (Puntaje_D2 × 0.30) + (Puntaje_D3 × 0.27) + (Puntaje_D4 × 0.20)
```

### Indicadores de Estado Visual:
* 🔴 **En Riesgo** (Score Global < 60%): Requiere repaso integral de fundamentos y lectura de documentación oficial.
* 🟡 **En Progreso** (60% ≤ Score Global < 75%): Dominio parcial; requiere reforzar trampas frecuentes y sintaxis de comandos gcloud.
* 🟢 **Listo para el Examen** (Score Global ≥ 75%): Nivel sólido para presentarse a la certificación oficial.

---

## 💾 Persistencia de Estado
* Guardado en almacenamiento local del navegador (`localStorage`) para uso sin conexión y sin necesidad de autenticación obligatoria.
* Opción de exportar / importar el progreso en formato JSON para respaldos o sincronización entre dispositivos.

