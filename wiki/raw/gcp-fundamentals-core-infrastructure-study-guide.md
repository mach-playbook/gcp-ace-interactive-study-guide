# Google Cloud Fundamentals: Core Infrastructure — Technical Study Guide & Command Blueprint

Welcome to the comprehensive technical study guide for the **Google Cloud Fundamentals: Core Infrastructure** course (Google Skills Course Template ID: 60). This guide synthesizes all video lessons, theoretical frameworks, architectural decision matrices, and hands-on laboratory exercises included in the course, fully aligned with the **Google Cloud Associate Cloud Engineer (ACE)** certification standards.

---

## 1. Course Overview & Curriculum Architecture

The **Google Cloud Fundamentals: Core Infrastructure** course establishes the foundational knowledge required to navigate, deploy, and manage resources on Google Cloud Platform (GCP). It compares computing, storage, networking, and application deployment options while introducing essential governance, resource hierarchy, and identity control mechanisms.

### Course Structure Summary

| Module | Core Technical Focus | Included Hands-on Lab / Interactive Activity |
| :--- | :--- | :--- |
| **Module 1: Introducing Google Cloud** | Cloud computing paradigms (IaaS, PaaS, SaaS), Google's global network, security posture, billing models | Module Knowledge Quiz |
| **Module 2: Resources & Access in the Cloud** | Resource hierarchy (Org, Folders, Projects), Identity & Access Management (IAM), Service Accounts, Cloud Identity, interfaces (`gcloud`, Console, REST) | **Lab 1:** Getting Started with Cloud Marketplace |
| **Module 3: Virtual Machines & Networks** | Virtual Private Cloud (VPC), Compute Engine VMs, Managed Instance Groups (MIGs), Cloud Load Balancing, Cloud DNS, Cloud CDN, Hybrid Connectivity | **Lab 2:** Get Started with VPC Networking and Compute Engine |
| **Module 4: Storage in the Cloud** | Storage taxonomy: Cloud Storage (Object), Cloud SQL (Relational), Cloud Spanner (Global Relational), Firestore (NoSQL Document), Cloud Bigtable (NoSQL Wide-Column) | **Lab 3:** Getting Started with Cloud Storage and Cloud SQL |
| **Module 5: Containers in the Cloud** | Containerization fundamentals, Kubernetes architecture, Google Kubernetes Engine (GKE Autopilot vs. Standard) | Module Knowledge Quiz |
| **Module 6: Applications in the Cloud** | Serverless application hosting, Cloud Run, Cloud Run Functions, App Engine, cloud-native development tools | **Lab 4:** Hello Cloud Run |

---

## 2. Module Syllabus & Core Technical Lessons

### Module 1: Introducing Google Cloud

* **Cloud Computing Overview**: Shift from capital expenditure (CapEx) on physical data centers to operational expenditure (OpEx) with elastic, on-demand infrastructure.
* **IaaS vs. PaaS vs. Serverless**:
  * *Infrastructure as a Service (IaaS)*: Provides raw compute, storage, and networking (e.g., Compute Engine). Maximum control over OS and software stack; customer manages OS patches and network firewalling.
  * *Platform as a Service (PaaS)*: Provides managed runtime environments (e.g., App Engine). Developers supply application code; GCP handles OS, scaling, and infrastructure.
  * *Serverless / FaaS*: Event-driven, containerized execution that scales automatically to zero (e.g., Cloud Run, Cloud Run Functions).
* **Google's Global Network**: Private software-defined fiber-optic network connecting regions and zones via edge point of presence (PoP) locations, minimizing latency by keeping traffic on Google's backbone.
* **Security & Open Source**: Shared responsibility model. Defense-in-depth across physical security, custom hardware (Titan chips), network encryption in transit/at rest, and commitment to open-source standards (Kubernetes, TensorFlow, Knative).
* **Pricing & Billing**: Per-second billing for compute resources, Sustained Use Discounts (automatic), Committed Use Discounts (1 or 3-year commitments), and resource pricing calculators.

---

### Module 2: Resources and Access in the Cloud

#### Google Cloud Resource Hierarchy

Resource management follows a strict four-level hierarchy. Policies set at parent levels are inherited down the tree and are **additive** (permissions cannot be restricted at lower levels if granted higher up):

1. **Organization Node**: Root of the hierarchy representing the company. Controls organization policies and central billing.
2. **Folders**: Logical groupings of projects or sub-folders (e.g., by department, environment, or line of business).
3. **Projects**: The fundamental unit of resource ownership, isolation, quota allocation, and billing. Every resource belongs to exactly one project.
4. **Resources**: Individual GCP components (VMs, buckets, tables, subnets).

#### Identity and Access Management (IAM)

IAM defines **Who** (identity) can do **What** (permission) on **Which** resource.

* **Identities**: Google Accounts (users), Google Groups, Service Accounts, Cloud Identity domains.
* **Role Types**:
  * *Basic / Primitive Roles*: `Owner` (full control + IAM management), `Editor` (modify resources), `Viewer` (read-only). *Exam Tip: Avoid using basic roles in production as they violate least privilege.*
  * *Predefined Roles*: Fine-grained roles targeted at specific job functions (e.g., `roles/compute.instanceAdmin.v1`, `roles/storage.objectViewer`).
  * *Custom Roles*: User-defined collections of specific granular permissions when predefined roles are too broad.
* **Service Accounts**: Special identities used by applications and virtual machines (not human users) to authenticate against Google Cloud APIs using short-lived credentials.

---

### Module 3: Virtual Machines and Networks in the Cloud

#### Virtual Private Cloud (VPC) Networks

VPCs are global resources spanning all GCP regions, containing regional subnets:

* **Auto Mode VPC**: Automatically creates one subnet per GCP region with default IP ranges (`10.128.0.0/9`). Useful for rapid testing.
* **Custom Mode VPC**: No subnets created automatically. Engineers explicitly define subnets, IP ranges, and regions. *Exam Tip: Production environments must always use Custom Mode VPCs.*

#### Compute Engine Virtual Machines

* **Machine Families**: General-purpose (E2, N2, N4), Compute-optimized (C2, C3), Memory-optimized (M2, M3), and Accelerator-optimized (G2, A3 with GPUs).
* **VM Options**: Public vs. Custom images, persistent disks (Standard HDD, Balanced SSD, Extreme, Hyperdisk), startup scripts (`metadata`), OS Login via SSH, and Spot/Preemptible VMs (up to 80-90% discount for fault-tolerant workloads).

#### Scaling & Network Services

* **Managed Instance Groups (MIGs)**: Collections of identical VMs created from an Instance Template. Supports stateless autoscaling (CPU utilization, queue depth, load balancer capacity) and regional high availability across zones.
* **Cloud Load Balancing**: Global Layer 7 (HTTP/S) and Layer 4 (TCP/UDP Proxy) vs. Regional Layer 4 (Passthrough Network) load balancers.
* **Cloud DNS & Cloud CDN**: Managed DNS resolution and edge-caching for web content close to users.


### Module 4: Storage in the Cloud

#### Storage & Database Selection Matrix

| Service | Data Type | Primary Structure | Scalability & Scope | Key Use Cases |
| :--- | :--- | :--- | :--- | :--- |
| **Cloud Storage** | Unstructured | Binary Objects / Blobs | Global | Media files, backups, static web assets, data lake storage |
| **Cloud SQL** | Structured | Relational (MySQL, Postgres, SQL Server) | Regional (HA Failover) | Traditional web applications, ERP, CRM, transactional systems (< 64 TB) |
| **Cloud Spanner** | Structured | Relational (ANSI SQL) | Global / Multi-Region | Enterprise mission-critical relational data requiring global strong consistency |
| **Firestore** | Semi-structured | NoSQL Document | Regional / Multi-Region | Mobile backends, web apps, real-time synchronization, user profiles |
| **Cloud Bigtable** | Semi-structured | NoSQL Wide-Column | Regional / Global | High-throughput time-series, IoT telemetry, financial ledgers, analytical streaming |
| **BigQuery** | Structured | OLAP Data Warehouse | Regional / Multi-Region | Enterprise data warehousing, SQL analytics, ML models |

#### Cloud Storage Classes

* **Standard**: Frequently accessed data ("hot").
* **Nearline**: Accessed less than once per month (30-day minimum storage commitment).
* **Coldline**: Accessed less than once per quarter (90-day minimum storage commitment).
* **Archive**: Long-term cold data, disaster recovery, compliance (365-day minimum storage commitment).

---

### Module 5: Containers in the Cloud

#### Containers vs. Virtual Machines

* **VMs**: Virtualize hardware; each instance includes a full guest operating system. Heavier resource footprint and slower boot times.
* **Containers**: Virtualize the operating system kernel; share host kernel while isolating application code, dependencies, and execution environment. Lightweight and boot in seconds.

#### Google Kubernetes Engine (GKE)

GKE provides production-ready managed Kubernetes clusters for orchestrating containerized microservices:

* **Control Plane**: Managed by Google Cloud (API server, scheduler, etcd database).
* **Worker Nodes**: Compute Engine instances that run Pods.
* **Operation Modes**:
  * *GKE Standard*: Full user control over node provisioning, node pool sizing, machine types, and cluster configurations.
  * *GKE Autopilot*: Fully managed cluster infrastructure where Google manages node provisioning, scaling, security hardening, and resource allocation per Pod.

---

### Module 6: Applications in the Cloud

#### Serverless Compute Platforms

* **Cloud Run**: Fully managed serverless platform for running stateless HTTP containers built on open-source Knative. Scales automatically from zero to thousands of instances based on traffic; charges only for exact CPU/Memory consumed during request processing.
* **Cloud Run Functions**: Lightweight, event-driven function-as-a-service (FaaS). Executes code in response to Google Cloud events (Pub/Sub messages, Cloud Storage object creation/deletion, HTTP requests).
* **App Engine**: Fully managed PaaS for hosting web applications. Available in *Standard Environment* (pre-configured runtimes, scale to zero) and *Flexible Environment* (custom Docker containers running on Compute Engine VMs).


---

## 3. Step-by-Step Hands-on Labs & Command Blueprint

### Lab 1: Getting Started with Cloud Marketplace

#### Objective
Deploy a complete web development environment (LAMP Stack: Linux, Apache, MySQL, PHP) on Compute Engine using Cloud Marketplace with a single click.

#### Step-by-Step Execution Procedure

1. **Navigate to Cloud Marketplace**:
   * Open the Google Cloud Console navigation menu and select **Marketplace**.
   * In the search bar, type `LAMP Stack` (or select *LAMP Packaged by Bitnami*).

2. **Configure & Launch Deployment**:
   * Click **GET STARTED** / **LAUNCH**.
   * Set **Zone** to `us-central1-a`.
   * Set **Machine Type** to `e2-medium` (2 vCPUs, 4 GB memory).
   * Ensure **Allow HTTP traffic** and **Allow HTTPS traffic** checkboxes are enabled under Networking.
   * Click **Deploy**.

3. **Verify Deployment & Site Access**:
   * Wait for Cloud Deployment Manager to finish instantiating resources.
   * Obtain the **Site address** (External IP) and MySQL root administrator credentials from the deployment summary panel.
   * Open a web browser tab and navigate to `http://<EXTERNAL_IP>`. Verify that the Bitnami LAMP landing page renders successfully.

---

### Lab 2: Get Started with Virtual Private Cloud Networking and Compute Engine

#### Objective
Create a custom Virtual Private Cloud (VPC) network, configure ingress firewall rules, deploy two virtual machine instances across different zones, and test internal/external network connectivity.

#### Command Blueprint & Execution Procedure

```bash
# Step 1: Initialize Cloud Shell environment and set default parameters
gcloud config set project $(gcloud config get-value project)
gcloud config set compute/region us-central1
gcloud config set compute/zone us-central1-a

# Step 2: Create a Custom Mode VPC Network
gcloud compute networks create my-custom-vpc \
    --subnet-mode=custom \
    --bgp-routing-mode=regional

# Step 3: Create Subnets within the Custom VPC
gcloud compute networks subnets create subnet-us-central \
    --network=my-custom-vpc \
    --region=us-central1 \
    --range=10.130.0.0/20

gcloud compute networks subnets create subnet-us-east \
    --network=my-custom-vpc \
    --region=us-east1 \
    --range=10.140.0.0/20

# Step 4: Configure Cloud NGFW Ingress Firewall Rules
# Allow ICMP (ping), SSH (port 22), and RDP (port 3389) from any IP
gcloud compute firewall-rules create my-custom-vpc-allow-icmp-ssh-rdp \
    --network=my-custom-vpc \
    --direction=INGRESS \
    --priority=1000 \
    --action=ALLOW \
    --rules=icmp,tcp:22,tcp:3389 \
    --source-ranges=0.0.0.0/0

# Step 5: Provision Compute Engine Virtual Machine Instances
# VM 1 in us-central1-a
gcloud compute instances create vm-internal-1 \
    --zone=us-central1-a \
    --machine-type=e2-micro \
    --network=my-custom-vpc \
    --subnet=subnet-us-central

# VM 2 in us-east1-b
gcloud compute instances create vm-internal-2 \
    --zone=us-east1-b \
    --machine-type=e2-micro \
    --network=my-custom-vpc \
    --subnet=subnet-us-east

# Step 6: Verify Network Connectivity
# SSH into VM 1 and ping VM 2's internal IP address
gcloud compute ssh vm-internal-1 --zone=us-central1-a --command="ping -c 3 10.140.0.2"
```


### Lab 3: Getting Started with Cloud Storage and Cloud SQL

#### Objective
Create a Cloud Storage bucket, upload object assets, provision a managed Cloud SQL MySQL database instance, and configure a Compute Engine web application instance to communicate with Cloud SQL.

#### Command Blueprint & Execution Procedure

```bash
# Step 1: Environment Context Setup
export PROJECT_ID=$(gcloud config get-value project)
export REGION="us-central1"
export BUCKET_NAME="${PROJECT_ID}-media-bucket"

# Step 2: Create a Cloud Storage Bucket
gcloud storage buckets create gs://${BUCKET_NAME} \
    --location=${REGION} \
    --default-storage-class=STANDARD \
    --uniform-bucket-level-access

# Step 3: Upload Sample Image Asset to the Bucket
echo "Google Cloud Fundamentals Storage Test" > sample.txt
gcloud storage cp sample.txt gs://${BUCKET_NAME}/sample.txt

# Make object publicly readable for web consumption
gcloud storage objects update gs://${BUCKET_NAME}/sample.txt --add-acl-grant=entity=AllUsers,role=READER

# Step 4: Provision a Cloud SQL Database Instance
gcloud sql instances create my-db-instance \
    --database-version=MYSQL_8_0 \
    --cpu=1 \
    --memory=3840MiB \
    --region=${REGION} \
    --root-password="SuperSecurePassword123!"

# Step 5: Create a Database and User
gcloud sql databases create app_db --instance=my-db-instance
gcloud sql users create app_user --instance=my-db-instance --password="UserPassword123!"

# Step 6: Deploy Web Application VM configured to access Cloud SQL
gcloud compute instances create web-app-vm \
    --zone=us-central1-a \
    --machine-type=e2-medium \
    --tags=http-server \
    --metadata=startup-script="#!/bin/bash
apt-get update
apt-get install -y apache2 php php-mysql
systemctl start apache2"

# Step 7: Authorize VM IP Address on Cloud SQL Instance
export VM_IP=$(gcloud compute instances describe web-app-vm --zone=us-central1-a --format="value(networkInterfaces[0].accessConfigs[0].natIP)")
gcloud sql instances patch my-db-instance --authorized-networks=${VM_IP}
```


### Lab 4: Hello Cloud Run

#### Objective
Deploy a containerized web application to Cloud Run serverlessly using standard container registry images.

#### Command Blueprint & Execution Procedure

```bash
# Step 1: Set Default Region for Cloud Run
gcloud config set run/region us-central1

# Step 2: Deploy Containerized Application to Cloud Run
gcloud run deploy hello-cloudrun \
    --image=gcr.io/google-samples/hello-app:1.0 \
    --region=us-central1

# Step 3: Inspect Service Endpoint URL and Configuration
gcloud run services describe hello-cloudrun --region=us-central1

# Step 4: List Running Cloud Run Services
gcloud run services list
```


---

## 4. Architectural Decision Frameworks for the ACE Exam

### Compute Decision Tree

```
Does the workload require custom OS access, legacy kernel drivers, or non-containerized monoliths?
├── YES ────────> Use Compute Engine (VMs)
└── NO
    ├── Is it a containerized application requiring complex Kubernetes orchestration, stateful sets, or custom plugins?
    │   ├── YES (Full Node Control) ──> Use GKE Standard
    │   └── YES (Serverless Node Ops) ─> Use GKE Autopilot
    └── NO
        ├── Is it a stateless container or web service responding to HTTP requests or event triggers?
        │   └── YES ────────> Use Cloud Run
        └── Is it a single-purpose event handler triggered by Cloud Storage or Pub/Sub?
            └── YES ────────> Use Cloud Run Functions
```

---

### `gcloud` Command Syntax Cheat Sheet for Core Infrastructure

| Target Service / Resource | Syntax Pattern | Example Exam Command |
| :--- | :--- | :--- |
| **CLI Context Setup** | `gcloud config set <section>/<property> <value>` | `gcloud config set compute/zone us-central1-a` |
| **IAM Policy Binding** | `gcloud projects add-iam-policy-binding <PROJECT_ID>` | `gcloud projects add-iam-policy-binding proj-1 --member='user:dev@example.com' --role='roles/viewer'` |
| **VM Instance Creation** | `gcloud compute instances create <NAME>` | `gcloud compute instances create web-vm --machine-type=e2-medium --subnet=my-sub` |
| **SSH VM Access** | `gcloud compute ssh <VM_NAME>` | `gcloud compute ssh web-vm --zone=us-central1-a` |
| **VPC Creation** | `gcloud compute networks create <NAME>` | `gcloud compute networks create prod-vpc --subnet-mode=custom` |
| **Cloud Storage Bucket** | `gcloud storage buckets create gs://<BUCKET>` | `gcloud storage buckets create gs://my-bucket-ace --location=us-central1` |
| **Cloud Storage Object** | `gcloud storage cp <SRC> <DEST>` | `gcloud storage cp file.pdf gs://my-bucket-ace/file.pdf` |
| **Cloud SQL Instance** | `gcloud sql instances create <NAME>` | `gcloud sql instances create db-master --database-version=MYSQL_8_0 --cpu=2` |
| **GKE Cluster** | `gcloud container clusters create <NAME>` | `gcloud container clusters create gke-prod --num-nodes=3 --zone=us-central1-a` |
| **GKE Credentials** | `gcloud container clusters get-credentials <NAME>`| `gcloud container clusters get-credentials gke-prod --zone=us-central1-a` |
| **Cloud Run Deployment** | `gcloud run deploy <SERVICE>` | `gcloud run deploy web-service --image=gcr.io/proj/app:v1` |

---

## 5. Self-Assessment Quiz & Key Terms Glossary

### Review Quiz (10 Scenario Questions)

#### Question 1
An organization requires a relational database in Google Cloud for a web application. The database must support standard MySQL syntax, provide automatic regional failover (High Availability), and fit within a single GCP region. Which database service should you choose?
* A) Cloud Spanner
* B) Cloud SQL
* C) Cloud Bigtable
* D) Firestore

*Answer*: **B**. Cloud SQL provides managed regional relational databases (MySQL, PostgreSQL, SQL Server) with automatic HA failover. Cloud Spanner is intended for globally distributed relational databases across multiple regions.

#### Question 2
You need to grant a junior developer read-only access to Cloud Storage objects in a specific project without allowing them to create or delete buckets. Applying the principle of least privilege, which role should you assign?
* A) `roles/owner`
* B) `roles/editor`
* C) `roles/viewer`
* D) `roles/storage.objectViewer`

*Answer*: **D**. `roles/storage.objectViewer` is a predefined role that grants permissions to read objects without allowing bucket-level modifications or broad project-level read permissions. Basic roles like `Viewer` are overly permissive.

#### Question 3
An application running on a Compute Engine VM needs to read data from a Cloud Storage bucket without storing permanent access keys in the code or VM disk. What is the recommended Google Cloud security practice?
* A) Download a service account JSON key file onto the VM disk.
* B) Embed the user's personal Google account credentials into the application config.
* C) Attach a custom Service Account to the VM instance with `roles/storage.objectViewer` permissions.
* D) Set the Cloud Storage bucket access to `allUsers` (Public).

*Answer*: **C**. Attaching a Service Account to a VM allows the application to retrieve short-lived credentials automatically via the Compute Engine Metadata Server, avoiding hardcoded key security risks.

#### Question 4
You are deploying a stateless web microservice packaged as a Docker container. The application experiences unpredictable traffic spikes and must scale to zero during off-peak hours to minimize cost. Which compute service is most cost-effective and operational-efficient?
* A) Compute Engine unmanaged instance group
* B) GKE Standard Cluster with fixed node count
* C) Cloud Run
* D) Cloud SQL

*Answer*: **C**. Cloud Run is a serverless container platform that automatically scales instances from zero up based on incoming requests, charging only for resources consumed during active request processing.

#### Question 5
An engineer creates a new GCP project and wants to create a Custom Mode VPC network. What happens to subnets when creating a Custom Mode network?
* A) One subnet per region is automatically created with default CIDR ranges.
* B) No subnets are created automatically; the engineer must explicitly define subnets and IP ranges.
* C) Subnets are created only in the default project region.
* D) Custom Mode VPCs do not use subnets.

*Answer*: **B**. Custom Mode VPCs start with zero subnets, giving network administrators full control over subnet IP address allocation. Auto Mode VPCs automatically provision one subnet per region.

#### Question 6
Which Cloud Storage storage class carries a 90-day minimum storage duration commitment and is optimized for data accessed less than once per quarter?
* A) Standard
* B) Nearline
* C) Coldline
* D) Archive

*Answer*: **C**. Coldline storage requires a 90-day minimum storage duration and is designed for data accessed infrequently (at most once every 90 days). Nearline is 30 days; Archive is 365 days.

#### Question 7
What command must you execute prior to running `kubectl` commands against a newly created Google Kubernetes Engine (GKE) cluster from Cloud Shell?
* A) `gcloud auth login`
* B) `gcloud container clusters get-credentials <CLUSTER_NAME>`
* C) `kubectl init cluster`
* D) `gcloud compute ssh <CLUSTER_NAME>`

*Answer*: **B**. `gcloud container clusters get-credentials` fetches cluster endpoint and authentication credentials, writing them to the local `~/.kube/config` file required by `kubectl`.

#### Question 8
You want to run a batch data processing job on Compute Engine that can tolerate unexpected instance terminations. Which VM feature provides the lowest compute cost for this workload?
* A) Reserved Instances
* B) Spot / Preemptible VMs
* C) E2 Standard VMs with Sustained Use Discounts
* D) Sole-tenant nodes

*Answer*: **B**. Spot (Preemptible) VMs offer up to 80-90% cost savings over standard pricing for fault-tolerant, batch, or stateless workloads that can handle VM preemption by GCP.

#### Question 9
A team needs to collect time-series IoT sensor data streaming millions of writes per second with sub-10 millisecond latency. Which database service is designed for this pattern?
* A) Cloud SQL MySQL
* B) Firestore
* C) Cloud Bigtable
* D) BigQuery

*Answer*: **C**. Cloud Bigtable is a high-throughput NoSQL wide-column database optimized for large-scale time-series, IoT, and analytical workloads requiring single-digit millisecond latency.

#### Question 10
If an IAM policy granting `roles/storage.admin` is applied to a user at the **Folder** level in the resource hierarchy, what is the effect of that policy on projects inside that folder?
* A) The user has `roles/storage.admin` access to all Cloud Storage buckets within all projects in that folder, and this permission cannot be revoked at the project level.
* B) The policy applies only to the folder itself, not to child projects.
* C) The policy must be explicitly approved at the project level before taking effect.
* D) The project owner can override and remove the folder-level role.

*Answer*: **A**. IAM policy inheritance flows top-down in the resource hierarchy and is additive. Permissions granted at a parent level (Organization or Folder) automatically apply to child resources and cannot be restricted lower down.

---

### Key Technical Terms Glossary

* **Cloud Identity**: An Identity as a Service (IDaaS) platform that manages users, groups, and security policies centrally for Google Cloud without requiring Workspace subscriptions.
* **Compute Engine**: Google Cloud's Infrastructure as a Service (IaaS) offering for launching and managing virtual machines on Google's infrastructure.
* **Google Kubernetes Engine (GKE)**: Managed Kubernetes service for deploying, scaling, and operating containerized applications.
* **Cloud Run**: Serverless container execution environment built on Knative that automatically scales stateless HTTP workloads.
* **Instance Template**: A reusable resource configuration used to create identical Compute Engine VM instances in Managed Instance Groups.
* **Managed Instance Group (MIG)**: A collection of homogeneous VM instances managed as a single entity with automated scaling, healing, and multi-zone distribution.
* **Service Account**: A non-human IAM identity used by applications and GCP resources to authenticate API calls securely.
* **Virtual Private Cloud (VPC)**: A global virtual network providing networking functionality for GCP resources, segmented into regional subnets.
* **Predefined Role**: A Google-managed IAM role containing a curated set of granular permissions for specific job responsibilities.
* **Ops Agent**: The primary telemetry collection agent installed on Compute Engine VMs to collect logs, system metrics, and process data for Google Cloud Observability.
