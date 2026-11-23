# Raw Syllabus: Build a Secure Google Cloud Network (Course 654)

- **Course Title:** Build a Secure Google Cloud Network
- **Template ID:** `654`
- **Course URL:** https://www.skills.google/course_templates/654
- **Skill Badge URL:** https://www.skills.google/course_templates/654/badge
- **Duration:** 1 hour 15 minutes
- **Level:** Intermediate
- **Rating / Stars:** 33 stars
- **Badge Type:** Google Cloud Skill Badge
- **Current Points Snapshot:** 16,644
- **Platform Note:** *There is a new version of this course available!* (Course template 654 corresponds to the classic Intermediate Skill Badge track.)

---

## Course Description

Earn a skill badge by completing the **Build a Secure Google Cloud Network** skill badge course, where you will learn about multiple networking-related resources to build, scale, and secure your applications on Google Cloud.

---

## Required Labs & Structure (6 Labs)

| # | Type | Lab Title | Session Lab ID | Core Focus |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Required Lab | **Securing Virtual Machines using BeyondCorp Enterprise (BCE)** | — | Identity-Aware Proxy (IAP) TCP forwarding (`35.235.240.0/20`) for SSH/RDP to VMs without external IP addresses or direct internet access |
| **2** | Required Lab | **Create and Configure Multiple VPC Networks** | `464657` | Creating multiple VPC networks and VM instances, then testing connectivity across networks |
| **3** | Required Lab | **Control Access to VPC Networks Using Firewall Rules and IAM** | `464658` | Two nginx web servers, controlling external HTTP access via tagged firewall rules, exploring IAM policies and service accounts |
| **4** | Required Lab | **Configure an Application Load Balancer with Google Cloud Armor** | `464659` | Global External Application Load Balancer with global backends, stress testing, and denylisting the stress test IP with Google Cloud Armor |
| **5** | Required Lab | **Enhance Application Reliability and Scalability with Internal Load Balancing** | `464660` | Two Managed Instance Groups (MIGs) in the same region behind an Internal Load Balancer without exposure to the public internet |
| **6** | Challenge Lab | **Build a Secure Google Cloud Network: Challenge Lab** | `464661` | Challenge Lab securing remote SSH access (IAP) and implementing tagged firewall rules |

### Detailed Lab Descriptions
1. **Securing Virtual Machines using BeyondCorp Enterprise (BCE):** Learn how to use Identity-Aware Proxy (IAP) TCP forwarding to enable administrative access to VM instances that do not have external IP addresses or do not permit direct access over the internet.
2. **Create and Configure Multiple VPC Networks** (`464657`): Create several VPC networks and VM instances, then test connectivity across networks.
3. **Control Access to VPC Networks Using Firewall Rules and IAM** (`464658`): Create two nginx web servers and control external HTTP access to the web servers using tagged firewall rules; explore IAM policies and service accounts.
4. **Configure an Application Load Balancer with Google Cloud Armor** (`464659`): Configure an Application Load Balancer with global backends, stress test the Load Balancer, and denylist the stress test IP with Google Cloud Armor.
5. **Enhance Application Reliability and Scalability with Internal Load Balancing** (`464660`): Create two Managed Instance Groups in the same region and configure an Internal Load Balancer with the instance groups as backends so an internal application is accessible without exposure to the public internet.
6. **Build a Secure Google Cloud Network: Challenge Lab** (`464661`): Secure remote SSH access and implement firewall rules under timed challenge conditions to earn the Skill Badge.
