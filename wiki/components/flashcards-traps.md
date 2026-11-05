# ⚡ Componente: Flashcards & Trampas Típicas del Examen

Especificación del sistema de tarjetas de memorización activa y trampas de examen (*exam traps*) de alta frecuencia para Google Cloud ACE.

---

## 🎯 Objetivo de Aprendizaje

El examen ACE utiliza con frecuencia escenarios con opciones que "parecen correctas" pero contienen detalles sutiles que las invalidan. Las flashcards entrenan la agilidad mental mediante repetición espaciada y advertencias explícitas de trampas frecuentes.

---

## 🪤 Trampas Frecuentes Catálogo Inicial

### Trampa 1: Presupuestos de Facturación
* **Pregunta / Escenario**: "Quieres asegurar que los gastos no superen los 500 dólares mensuales en un proyecto de desarrollo."
* **Opción Trampa**: "Configura una alerta de presupuesto del 100% para apagar las VMs automáticamente."
* **Realidad / Corrección**: Las alertas de presupuesto **NUNCA** apagan recursos por sí solas. Solo envían notificaciones. Para apagar recursos se debe conectar la alerta con Pub/Sub y una Cloud Run Function.

### Trampa 2: Herencia y Revocación de Permisos en IAM
* **Pregunta / Escenario**: "Un usuario tiene el rol `Editor` asignado a nivel de Organización. Se desea restringir su acceso para que solo sea `Viewer` en un Proyecto específico."
* **Opción Trampa**: "Asigna el rol `Viewer` a nivel de Proyecto al usuario."
* **Realidad / Corrección**: La herencia en IAM es **aditiva**. El rol `Editor` heredado de la Organización tiene prioridad y no se anula al agregar `Viewer` en el Proyecto. Se debe remover el rol a nivel de Organización o usar una política Deny explícita de IAM v2.

### Trampa 3: Reglas de Firewall y Tráfico de Retorno
* **Pregunta / Escenario**: "Creas una regla de firewall de entrada (Ingress) para permitir tráfico en el puerto 80 hacia tus instancias web. ¿Qué regla de salida (Egress) se requiere para que la respuesta llegue al cliente?"
* **Opción Trampa**: "Crear una regla de Egress que permita el tráfico hacia cualquier IP en el puerto 80."
* **Realidad / Corrección**: Las reglas de firewall en Google Cloud son **con estado (Stateful)**. La respuesta al tráfico permitido de entrada es aceptada automáticamente hacia la salida.

### Trampa 4: Escalado y Subredes VPC
* **Pregunta / Escenario**: "Tu subred VPC se está quedando sin direcciones IP disponibles. ¿Qué acción debes tomar?"
* **Opción Trampa**: "Reduce el rango de la máscara de subred (ej. de /24 a /26) o crea una nueva subred en la misma red y zona con el mismo rango."
* **Realidad / Corrección**: Las subredes en Google Cloud se pueden expandir aumentando el prefijo CIDR (ej. de `/24` a `/23` o `/22`), pero **NUNCA** se pueden reducir sin recrear la subred.

---

## 🎴 Estructura de la Flashcard
* **Anverso**: Escenario o concepto clave.
* **Reverso**:
  * Respuesta correcta recomendada.
  * ⚠️ **Trampa típica**: Explicación de las opciones señuelo comunes en el examen.
  * 📖 **Comando o referencia oficial**: gcloud o documentación de Google Cloud.

