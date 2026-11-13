# Ingesta Cruda: Introduction to containers

**Fuente Oficial**: [Google Cloud Skills Boost - Course 60 Video 689579](https://www.skills.google/paths/8/course_templates/60/video/689579)  
**Video YouTube Oficial**: [Introduction to containers (fkyu-gVr4IU)](https://www.youtube.com/watch?v=fkyu-gVr4IU)  
**Curso**: Google Cloud Fundamentals: Core Infrastructure (Course Template 60)  
**Módulo**: Module 5: Containers in the Cloud  
**Lección**: 29 (Skills Video ID: `689579` | YouTube ID: `fkyu-gVr4IU`)  
**Puntos Acumulados**: 14,220  

---

## 📝 Transcripción Oficial Sanitizada

```text
00:00 In this section of the course we’ll explore containers and help you understand how they are used.
00:06 Infrastructure as a service, or IaaS, allows you to share compute resources with other developers by using virtual machines to virtualize the hardware.
00:16 This lets each developer deploy their own operating system (OS), access the hardware, and build their applications in a self-contained environment with access to RAM, file systems, networking interfaces, etc.
00:30 This is where containers come in.
00:33 The idea of a container is to give the independent scalability of workloads in PaaS and an abstraction layer of the OS and hardware in IaaS.
00:43 A configurable system lets you install your favorite runtime, web server, database, or middleware, configure the underlying system resources, such as disk space, disk I/O, or networking, and build as you like.
00:56 But flexibility comes with a cost.
00:59 The smallest unit of compute is an app with its VM.
01:03 The guest OS might be large, even gigabytes in size, and take minutes to boot.
01:08 As demand for your application increases, you have to copy an entire VM and boot the guest OS for each instance of your app, which can be slow and costly.
01:19 A container is an invisible box around your code and its dependencies with limited access to its own partition of the file system and hardware.
01:27 It only requires a few system calls to create and it starts as quickly as a process.
01:33 All that’s needed on each host is an OS kernel that supports containers and a container runtime.
01:39 In essence, the OS is being virtualized.
01:43 It scales like PaaS but gives you nearly the same flexibility as IaaS.
01:48 This makes code ultra portable, and the OS and hardware can be treated as a black box.
01:54 So you can go from development, to staging, to production, or from your laptop to the cloud, without changing or rebuilding anything.
02:02 Google Kubernetes Engine (GKE) acts as a bridge between these models, providing the automation of PaaS with the granular control of IaaS.
02:11 As an example, let’s say you want to scale a web server.
02:15 With a container, you can do this in seconds and deploy dozens or hundreds of them, depending on the size of your workload, on a single host.
02:24 That's just a simple example of scaling one container running the whole application on a single host.
02:29 However, you'll probably want to build your applications using lots of containers, each performing their own function like microservices.
02:38 If you build them this way and connect them with network connections, you can make them modular, deploy easily, and scale independently across a group of hosts.
02:47 The hosts can scale up and down and start and stop containers as demand for your app changes or as hosts fail.
```

---

## 🎯 Síntesis Técnica y Objetivos de Aprendizaje

### 1. La Evolución de la Computación: IaaS vs PaaS vs Contenedores
* **IaaS (Virtualización de Hardware)**:
  * Emplea un hipervisor para particionar el hardware físico en máquinas virtuales (VMs).
  * Cada VM ejecuta una copia completa de un sistema operativo invitado (*Guest OS*), asignando vCPU, RAM, discos e interfaces de red dedicadas.
  * **Inconveniente de IaaS**: La unidad mínima de cómputo es la VM completa; el SO invitado pesa gigabytes, tarda varios minutos en arrancar y escalar la app requiere clonar la VM completa, lo que resulta lento y costoso.
* **PaaS (Abstracción de Plataforma)**:
  * Proporciona escalabilidad independiente y despliegue simple sin administrar el SO subyacente.
  * **Inconveniente de PaaS**: Pérdida de flexibilidad para personalizar runtimes, versiones específicas de lenguajes, módulos del kernel o configuraciones de bajo nivel.
* **Contenedores (Virtualización del Sistema Operativo)**:
  * Un contenedor es una caja lógica aislada que empaqueta el código de la aplicación y todas sus dependencias (librerías, binarios, variables de entorno).
  * En lugar de emular hardware con un hipervisor, los contenedores comparten el **mismo kernel del sistema operativo host**.
  * Solo requieren unas pocas llamadas al sistema (*system calls*) para crearse y arrancan de forma casi instantánea (en milisegundos o segundos, tan rápido como un proceso ordinario del SO).
  * Combinan la **flexibilidad y control de IaaS** con la **agilidad y escalabilidad automática de PaaS**.

### 2. Principios de Portabilidad Extrema
* **Independencia del Entorno**: Dado que el contenedor incluye todo el runtime necesario y trata al hardware y al SO anfitrión como una caja negra, el código es ultra-portable.
* **Consistencia de Entornos**: Se elimina por completo el problema clásico de *"en mi máquina sí funciona"*. La misma imagen de contenedor se traslada sin modificaciones desde la laptop del desarrollador a entornos de staging, producción, on-premises o cualquier nube pública.

### 3. Densidad de Cómputo y Escalado de Microservicios
* **Alta Densidad por Host**: Al no requerir la sobrecarga de memoria y almacenamiento de múltiples sistemas operativos invitados, un único host físico o VM puede alojar decenas o cientos de contenedores concurrentes.
* **Arquitectura de Microservicios**:
  * Descomposición de aplicaciones monolíticas en servicios autónomos, modulares y de propósito único.
  * Cada microservicio se empaqueta en su propio contenedor y se comunica a través de redes ligeras (APIs HTTP/gRPC).
  * Permite escalar componentes de forma independiente (ej. escalar solo el servicio de pagos o el catálogo según la demanda) y aislar fallos de componentes individuales.

### 4. El Rol de Google Kubernetes Engine (GKE)
* **GKE como Puente Arquitectónico**:
  * Orquesta y coordina clústeres de contenedores a gran escala distribuidos en múltiples hosts.
  * Aporta la automatización operativa de PaaS (auto-reparación, auto-escalado horizontal de pods, balanceo de carga, rolling updates) manteniendo el control granular y personalización de IaaS.

---

## 💡 Preguntas y Trampas Clave para el Examen Google Cloud ACE

1. **Virtualización de Hardware vs Virtualización de SO**:
   * *Pregunta de Examen*: "¿Cuál es la diferencia fundamental entre una máquina virtual de Compute Engine y un contenedor de Docker/GKE?"
   * *Respuesta Correcta*: Las máquinas virtuales virtualizan el hardware físico y cada una corre su propio sistema operativo invitado completo; los contenedores virtualizan el sistema operativo compartiendo el kernel del host, lo que permite un arranque en segundos y menor consumo de recursos.
2. **Caso de Uso para Microservicios en Contenedores**:
   * Cuando se busca independencia en los ciclos de despliegue, escalabilidad desacoplada por componente y portabilidad absoluta entre entornos híbridos, la solución arquitectónica recomendada es migrar a contenedores gestionados por **GKE** o **Cloud Run**.

