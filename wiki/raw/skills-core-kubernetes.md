# Ingesta Cruda: Lección 30 - Kubernetes

## 📌 Metadatos de la Fuente
* **Plataforma:** Skills Google / Google Cloud Training
* **Ruta de Aprendizaje:** Getting Started with Google Cloud
* **Curso:** Google Cloud Fundamentals: Core Infrastructure (Course Template ID: 60)
* **Módulo:** Módulo 5: Contenedores en la Nube y Kubernetes (Containers in the Cloud)
* **ID de Lección (Skills Google):** `689580`
* **URL Skills Google:** [Skills Google - Kubernetes](https://www.skills.google/paths/8/course_templates/60/video/689580)
* **URL YouTube:** [YouTube - Kubernetes (Video ID: 4NTyB0eEB_A)](https://www.youtube.com/watch?v=4NTyB0eEB_A)
* **Puntaje Actual:** ⭐ 14,230 puntos
* **Fecha de Ingesta:** 2026-11-13
* **Tipo de Contenido:** Video formativo con transcripción oficial

---

## 📝 Transcripción Oficial Completa

```text
00:00 A product that helps manage and scale containerized applications is Kubernetes.
00:04 So to save time and effort when scaling applications and workloads, Kubernetes can be bootstrapped using Google Kubernetes Engine (GKE).
00:13 So, what is Kubernetes?
00:17 Kubernetes is an open-source platform for managing containerized workloads and services.
00:23 It makes it easy to orchestrate many containers on many hosts, scale them as microservices, and easily deploy rollouts and rollbacks.
00:31 At the highest level, Kubernetes is a set of APIs that you can use to deploy containers on a set of nodes called a cluster.
00:40 The system is divided into a set of primary components that run as the control plane and a set of nodes that run containers.
00:48 In Kubernetes, a node represents a computing instance, like a machine.
00:52 Note that this is different to a node on Google Cloud which is a virtual machine running in Compute Engine.
00:59 You can describe a set of applications and how they should interact with each other, and Kubernetes determines how to make that happen.
01:07 Deploying containers on nodes by using a wrapper around one or more containers is what defines a Pod.
01:14 A Pod is the smallest unit in Kubernetes that you can create or deploy.
01:18 It represents a running process on your cluster as either a component of your application or an entire app.
01:25 Generally, you only have one container per Pod, but if you have multiple containers with a hard dependency, you can package them into a single Pod and share networking and storage resources between them.
01:37 The Pod provides a unique network IP and set of ports for your containers and configurable options that govern how your containers should run.
01:45 One way to run a container in a Pod in Kubernetes is to use the kubectl run command, which starts a Deployment with a container running inside a Pod.
01:55 A Deployment represents a group of replicas of the same Pod and keeps your Pods running even when the nodes they run on fail.
02:03 A Deployment could represent a component of an application or even an entire app.
02:09 To see a list of the running Pods in your project, run the command: kubectl get pods.
02:15 Kubernetes creates a Service with a fixed IP address for your Pods, and a controller says "I need to attach an external load balancer with a public IP address to that Service so others outside the cluster can access it."
02:26 In GKE, the load balancer is created as a network load balancer.
02:32 Any client that reaches that IP address will be routed to a Pod behind the Service.
02:39 A Service is an abstraction which defines a logical set of Pods and a policy by which to access them.
02:45 As Deployments create and destroy Pods, Pods will be assigned their own IP addresses, but those addresses don't remain stable over time.
02:55 A Service group is a set of Pods and provides a stable endpoint (or fixed IP address) for them.
03:01 For example, if you create two sets of Pods called frontend and backend and put them behind their own Services, the backend Pods might change, but frontend Pods are not aware of this.
03:13 They simply refer to the backend Service.
03:16 To scale a Deployment, run the kubectl scale command.
03:20 In this example, three Pods are created in your Deployment, and they're placed behind the Service and share one fixed IP address.
03:29 You could also use autoscaling with other kinds of parameters.
03:33 For example, you can specify that the number of Pods should increase when CPU utilization reaches a certain limit.
03:41 So far, we’ve seen how to run imperative commands like expose and scale.
03:46 This works well to learn and test Kubernetes step-by-step.
03:49 But the real strength of Kubernetes comes when you work in a declarative way.
03:54 Instead of issuing commands, you provide a configuration file that tells Kubernetes what you want your desired state to look like, and Kubernetes determines how to do it.
04:04 You accomplish this by using a Deployment config file.
04:08 You can check your Deployment to make sure the proper number of replicas is running by using either kubectl get deployments or kubectl describe deployments.
04:17 To run five replicas instead of three, all you do is update the Deployment config file and run the kubectl apply command to use the updated config file.
04:27 You can still reach your endpoint as before by using kubectl get services to get the external IP of the Service and reach the public IP address from a client.
04:37 The last question is, what happens when you want to update a new version of your app?
04:42 Well, you want to update your container to get new code in front of users, but rolling out all those changes at one time would be risky.
04:49 So in this case, you would use kubectl rollout or change your deployment configuration file and then apply the change using kubectl apply.
04:59 New Pods will then be created according to your new update strategy.
05:02 Here’s an example configuration that will create new version Pods individually and wait for a new Pod to be available before destroying one of the old Pods.
```

---

## 🔬 Síntesis Técnica y Desglose Arquitectónico

### 1. ¿Qué es Kubernetes y por qué GKE?
* **Definición Oficial:** Kubernetes (K8s) es una plataforma open-source orientada a la orquestación integral de cargas de trabajo y servicios en contenedores.
* **Capacidades Principales:**
  * Orquestar múltiples contenedores distribuidos en múltiples hosts de cómputo.
  * Gestionar y escalar componentes desacoplados como microservicios.
  * Automatizar despliegues continuos mediante *rollouts* y revertir fallos mediante *rollbacks*.
* **El rol de Google Kubernetes Engine (GKE):**
  * Desplegar Kubernetes desde cero (*on-premises* o sobre VMs puras) requiere un esfuerzo sustancial de instalación, parcheo, configuración de redes y gestión del plano de control (*control plane*).
  * GKE permite hacer *bootstrap* y aprovisionar un clúster completamente funcional en minutos, delegando en Google la alta disponibilidad y mantenimiento del Control Plane.

### 2. Arquitectura del Clúster de Kubernetes
* **Plano de Control (Control Plane):** Conjunto de componentes maestros (`kube-apiserver`, `etcd`, `kube-scheduler`, `kube-controller-manager`) que definen el estado deseado, gestionan la programación de tareas y supervisan la salud del clúster.
* **Nodos de Trabajo (Worker Nodes):**
  * Representan instancias de cómputo que ejecutan los contenedores.
  * **En GKE:** Cada nodo de trabajo es una **máquina virtual (VM) que corre en Compute Engine** dentro del proyecto del cliente.
  * Los nodos ejecutan el agente local (`kubelet`), el proxy de red (`kube-proxy`) y el runtime de contenedores (como `containerd`).

### 3. El Pod: Unidad Mínima de Cómputo
* **Definición:** Es la unidad desplegable más pequeña y atómica que se puede crear y gestionar en Kubernetes.
* **Estructura:**
  * Es un contenedor lógico (*wrapper*) que envuelve uno o más contenedores estrechamente vinculados.
  * Representa un proceso único en ejecución dentro del clúster (un microservicio o una app completa).
* **Regla de Oro de Diseño:**
  * **Un contenedor por Pod** es la práctica estándar en la inmensa mayoría de arquitecturas.
  * **Múltiples contenedores por Pod:** Solo se empaquetan múltiples contenedores juntos si existe una **dependencia estricta** (*hard dependency*), como en los patrones *sidecar*, *adapter* o *ambassador* (por ejemplo, un contenedor web principal y un contenedor sidecar que sincroniza logs o certificados SSL).
* **Recursos Compartidos en el Pod:**
  * **Red compartida:** El Pod recibe una **dirección IP única en la red del clúster**. Todos los contenedores dentro del mismo Pod comparten ese espacio de red y puertos, pudiendo comunicarse entre sí a través de `localhost`.
  * **Almacenamiento compartido:** Los volúmenes definidos a nivel de Pod pueden montarse simultáneamente en los contenedores del Pod.

### 4. Deployments: Resiliencia, Réplicas y Auto-reparación
* **Definición:** Objeto de alto nivel que gestiona un conjunto de réplicas idénticas de un Pod.
* **Garantía de Resiliencia (*Self-Healing*):**
  * Si un nodo de Compute Engine subyacente falla o sufre una caída, el controlador de Deployment detecta la discrepancia con el estado deseado y recrea automáticamente los Pods perdidos en otros nodos sanos del clúster.
* **Control de Réplicas y Escalado:**
  * Permite definir cuántas instancias del Pod deben ejecutarse simultáneamente (`replicas`).
  * Escalado manual o automático mediante políticas de uso (como autoescalado basado en CPU con el *Horizontal Pod Autoscaler - HPA*).

### 5. Services: Abstracción de Red, IPs Estables y Desacoplamiento
* **El Problema de los Pods:** Los Pods son recursos intrínsecamente **efímeros**. Se crean, escalan, mueren y se recrean dinámicamente con direcciones IP nuevas e impredecibles.
* **La Solución (Service):**
  * Un Service es una abstracción que define un conjunto lógico de Pods (seleccionados habitualmente mediante *labels* y *selectors*) y una política estable para comunicarse con ellos.
  * Asigna un **punto de enlace estable con una IP fija interna** (*ClusterIP*) que no cambia a lo largo del tiempo.
* **Desacoplamiento Arquitectónico (Frontend / Backend):**
  * Los Pods del frontend solo necesitan conocer el nombre de DNS o la IP fija del Service del backend.
  * Si los Pods del backend escalan de 3 a 10 réplicas, o si sus IPs individuales cambian, el frontend continúa funcionando sin interrupción ni recarga de configuración.
* **Exposición Externa en GKE:**
  * Al configurar un Service de tipo `LoadBalancer` en GKE, el controlador de GKE aprovisiona automáticamente un **Google Cloud Network Load Balancer (NLB)** con una dirección IP pública externa.
  * El tráfico entrante que llega a esa IP pública es enrutado de manera transparente y balanceada hacia los Pods saludables detrás del Service.

### 6. Enfoque Imperativo vs Enfoque Declarativo
* **Modo Imperativo (Acciones paso a paso):**
  * Comandos directos: `kubectl run`, `kubectl expose`, `kubectl scale --replicas=3`.
  * Útil para aprendizaje, diagnósticos interactivos y pruebas rápidas de laboratorio.
* **Modo Declarativo (Infraestructura como Código / Estado Deseado):**
  * La verdadera potencia de Kubernetes radica en el modelo declarativo.
  * Se define un manifiesto YAML o JSON (archivo de configuración de Deployment/Service) que describe el **estado deseado** (*desired state*).
  * Se aplica con `kubectl apply -f deployment.yaml`.
  * El motor de reconciliación de Kubernetes compara continuamente el estado actual con el estado deseado y aplica las transiciones necesarias para converger.
  * Comandos de inspección clave:
    * `kubectl get pods`
    * `kubectl get deployments`
    * `kubectl describe deployments <nombre>`
    * `kubectl get services`

### 7. Estrategia de Actualización Continua (Rolling Update)
* **Objetivo:** Actualizar el código o la versión del contenedor en producción sin provocar tiempo de inactividad (*zero downtime*).
* **Mecanismo (*Rolling Update*):**
  * Se actualiza la especificación de imagen en el archivo YAML y se ejecuta `kubectl apply`, o se comanda mediante `kubectl rollout`.
  * Kubernetes crea los Pods de la nueva versión uno a uno (o en lotes controlados según `maxSurge` y `maxUnavailable`).
  * El controlador espera a que el nuevo Pod pase sus chequeos de salud (*readiness probes*) antes de terminar gradualmente un Pod de la versión anterior.
  * Permite revertir cambios instantáneamente (*rollback*) si se detecta alguna anomalía.

---

## 🎯 Puntos Clave y Trampas de Examen Google Cloud ACE

1. **Pod como Unidad Mínima:**
   * *Trampa de examen:* "¿Cuál es la unidad mínima que se despliega en Kubernetes: un contenedor, una imagen Docker, un Pod o un nodo?".
   * *Respuesta correcta:* **El Pod**. Kubernetes nunca gestiona ni despliega contenedores individuales aislados; siempre los envuelve dentro de un Pod.
2. **IPs de Pods vs IPs de Services:**
   * *Trampa de examen:* "¿Por qué no se debe comunicar directamente una capa frontend con las direcciones IP de los Pods de backend?".
   * *Respuesta correcta:* Porque las IPs de los Pods son **efímeras**; cambian cada vez que un Pod se reinicia, escala o migra de nodo. Se debe usar siempre un **Service**, que proporciona una dirección IP y nombre DNS fijos y estables.
3. **Múltiples Contenedores en un Pod:**
   * *Regla:* Solo se colocan dos o más contenedores en el mismo Pod si existe una **dependencia estricta de acoplamiento** (*hard dependency*, patrón sidecar/logging). Si son servicios independientes (como web y base de datos), deben colocarse en **Pods y Deployments separados**.
4. **Enlace GKE con Balanceadores de Carga de Google Cloud:**
   * *Concepto ACE:* En GKE, un Service de tipo `LoadBalancer` invoca automáticamente la API de Compute Engine para aprovisionar un **Network Load Balancer** externo con IP pública, sin necesidad de configurar manualmente componentes de red en GCP.
5. **Declarativo (`kubectl apply`) vs Imperativo (`kubectl run`):**
   * *Buenas prácticas de producción:* En entornos empresariales y exámenes de certificación, la gestión declarativa mediante archivos de configuración YAML versionados en Git (GitOps) es la vía recomendada frente a comandos imperativos ad-hoc.

