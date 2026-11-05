# ☁️ Google Cloud Associate Cloud Engineer (ACE) — Interactive Exam Prep Guide

Welcome to the interactive study guide for the **Google Cloud Associate Cloud Engineer (ACE)** certification exam.

Interactive study guide and exam prep web application for the Google Cloud Associate Cloud Engineer (ACE) certification, featuring domain blueprints, decision trees, and CLI cheat sheets.

---

## 📌 1. Exam Overview & Logistics
* **Exam Duration**: 120 minutes (50–60 questions).
* **Passing Score**: Scaled score (~70% pass threshold).
* **Validity**: 3 Years.
* **Format**: Multiple-choice and multiple-select scenario-based questions.

### 🔗 Official Google Resources
* 📖 [Google Cloud ACE Official Certification Page](https://cloud.google.com/learn/certification/cloud-engineer)
* 📄 [Google Cloud ACE Exam Guide (v4.0 PDF)](https://services.google.com/fh/files/misc/v4.0_associate_cloud_engineer_exam_guide_english.pdf)
* 🎓 [Google Cloud Skills Boost — ACE Learning Path](https://www.skills.google/paths/11)
* 📝 [Official Google Cloud Sample Questions](https://docs.google.com/forms/d/e/1FAIpQLSfexWKtXT2OSFJ-obA4iT3GmzgiOCGvjrT9OfxilWC1yPtmfQ/viewform)
* 💻 [The gcloud CLI Official Cheat Sheet](https://docs.cloud.google.com/sdk/docs/cheatsheet)

### 📚 Community Study Guides & Deep Dives
* 🛠️ [CloudMasterIT — ACE Complete Certification Guide](https://cloudmasterit.com/en/blog/gcp-ace-exam-complete-guide)
* 💡 [NoblerWorks — Cloud Engineer Exam Tips & Best Practices](https://cloud.noblerworks.com/exams/gcp/cloud-engineer/notes/exam-tips-best-practices/)
* 📑 [Prepa — GCP ACE Study Guide & Exam Traps](https://prepa.co.za/exams/gcp-ace)
* ⚡ [Edureify — Free GCP ACE Cheat Sheet & Weights](https://edureify.com/certification/cloud-computing/gcp-associate-cloud-engineer/cheat-sheet)
* 🎯 [ExamForge — GCP ACE Practice Exam & 30-Day Roadmap](https://www.examforgeprep.com/docs/google-cloud-associate-cloud-engineer-ace-practice-exam-guide)

---

## 🎯 2. Exam Blueprint & Domain Syllabus (v4.0 Standards)

### Domain 1: Setting Up a Cloud Solution Environment (~23%)
* **Resource Hierarchy**: Organizations, Folders, Projects, and Resources inheritance rules.
* **Billing & FinOps**: Centralized billing accounts, budgets, alerts, and BigQuery billing export streams.
* **Identity & Quotas**: Cloud Identity user management, quota allocation requests, and Organization Policies.
* **Observability & AI Tools**: Initializing Cloud Observability, Cloud Asset Inventory, and Gemini Cloud Assist.
* 🔗 *Reference Links*: [Google Cloud Resource Hierarchy Guide](https://docs.cloud.google.com/docs/access-resources), [Google Cloud Fundamentals Core Course](https://www.skills.google/paths/11/course_templates/60).

### Domain 2: Planning and Implementing a Cloud Solution (~30%)
* **Compute Selection**: Compute Engine VMs, Google Kubernetes Engine (GKE Autopilot vs Regional), Cloud Run, and Cloud Run Functions.
* **Storage & Databases**: Matching workloads to Cloud Storage classes (Standard, Nearline, Coldline, Archive), Cloud SQL, Cloud Spanner, Firestore, Bigtable, BigQuery, and AlloyDB.
* **Networking**: Custom VPC subnets, Shared VPC, Cloud NGFW firewall rules, Load Balancing (HTTP/S vs TCP/UDP), and Cloud VPN/Interconnect.
* **Infrastructure as Code (IaC)**: Deployments via Terraform, Helm, Config Connector, and Fabric FAST.
* 🔗 *Reference Links*: [GCP Architecture Center](https://cloud.google.com/architecture), [Cloud Storage Documentation](https://cloud.google.com/storage).

### Domain 3: Ensuring Successful Operation of a Cloud Solution (~27%)
* **Compute Operations**: SSH access via OS Login, persistent disk snapshots, VM custom images, and GKE node pool management with `kubectl`.
* **Data Operations**: Database backup/restore procedures, job execution tracking (BigQuery/Dataflow), and Database Center management.
* **Observability & Operations Suite**: Cloud Monitoring alerts, Cloud Logging routers/sinks, Ops Agent deployment, Managed Service for Prometheus, and Active Assist diagnostics.
* 🔗 *Reference Links*: [Google Cloud Operations Suite Overview](https://cloud.google.com/products/observability).

### Domain 4: Configuring Access and Security (~20%)
* **Identity & Access Management (IAM)**: Applying least privilege using Predefined and Custom roles instead of Basic/Primitive roles.
* **Service Accounts & Workload Identity**: Managing service accounts, short-lived credentials, and GKE Workload Identity Federation.
* **Security & Auditing**: Configuring Cloud Audit Logs and VPC perimeter security.
* 🔗 *Reference Links*: [Understanding IAM Roles](https://cloud.google.com/iam/docs/understanding-roles).

---

## 🛠️ 3. Proposed Interactive Web Components

1. **`gcloud` CLI Syntax Interactive Quiz**:
   * Practice typing or selecting correct CLI grammar: `gcloud <group> <subgroup> <action> [flags]` (e.g., `gcloud compute instances create`, `gcloud container clusters get-credentials`).
2. **Database & Compute Decision Matrix Widget**:
   * Scenario-based decision tree for selecting the right storage (e.g., Cloud SQL vs Spanner vs Bigtable) or compute option (Compute Engine vs GKE vs Cloud Run) based on performance, consistency, and scale requirements.
3. **Interactive Flashcards & Scenario Traps**:
   * Review high-frequency exam traps like IAM policy inheritance, stateful firewall rules, and VPC subnet expansion.
4. **Domain Progress & Readiness Tracker**:
   * Interactive checkboxes and scoring widget based on the 4 exam weights to measure domain readiness.

## Disclaimer
This project is an independent, open-source educational resource created for study purposes to help candidates prepare for the Google Cloud Associate Cloud Engineer (ACE) certification exam. 

Google Cloud, GCP, Compute Engine, Google Kubernetes Engine, Cloud Run, gcloud, and related product names are trademarks or registered trademarks of Google LLC. This project is not affiliated with, sponsored by, endorsed by, or associated with Google LLC in any way.
