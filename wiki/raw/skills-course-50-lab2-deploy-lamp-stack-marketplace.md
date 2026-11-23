# Raw Lab Guide: Deploy a LAMP Stack with Google Cloud Marketplace (Course 50 / Lab CBL011 / 690264)

- **Course:** Essential Google Cloud Infrastructure: Foundation
- **Module:** Module 1: Interacting with Google Cloud
- **Lab Title:** Deploy a LAMP Stack with Google Cloud Marketplace
- **Lab Code:** `CBL011`
- **Skills Lab ID:** `690264`
- **Skills Lab URL:** https://www.skills.google/course_templates/50/labs/690264
- **Cost:** 5 Credits
- **Duration:** 15 minutes
- **Level:** Introductory
- **Last Tested:** November 16, 2026
- **Current Points Snapshot:** 16,568

---

## Overview & Stack Components

Use Google Cloud Marketplace to quickly deploy a complete web development LAMP stack on a Compute Engine VM instance in one click.

| Component | Role |
| :--- | :--- |
| **Linux** | Operating system (Debian 12) |
| **Apache HTTP Server** | Web server |
| **MySQL** | Relational database |
| **PHP** | Web application framework |
| **phpMyAdmin** | PHP administration tool |

### Objective
- Launch and verify a production-ready LAMP stack solution using Google Cloud Marketplace.

---

## Tasks & Official Steps

### Task 1. Deploy a LAMP stack using Cloud Marketplace
1. Navigate to **Navigation menu > Marketplace** and search for `LAMP Stack`.
2. Select **LAMP Stack on Debian12** (Product provided by **Apps4Rent LLC**).
3. Click **Get Started** → check **Terms and agreements** → click **Agree** → click **Deploy**.
4. If prompted, enable **Compute Engine API** and **Infrastructure Manager API**.
5. Configure deployment parameters:
   - **Zone:** assigned lab `ZONE`
   - **Machine Type:** Series `E2`, Machine Type `e2-medium`
   - Leave remaining settings as defaults and click **Deploy**.
6. Monitor provisioning (`Step 3/3. Deploying`) until a green checkmark appears next to `lamp-1` and `Instance Nat Ip` is displayed under the **Details** tab's **Outputs** section.

#### Formative Check
- **Question:** *Which tool is used to deploy Google Cloud Marketplace solutions like the LAMP Stack?*
- **Options:** `Terraform`, `Deployment Manager`, `Firestore`, `Template Manager`
- **Answer:** **Terraform** (orchestrated natively by **Infrastructure Manager API**, which replaced legacy Cloud Deployment Manager for modern Google Cloud Marketplace VM deployments).

### Task 2. Verify your deployment
1. Click `lamp-1-vm` → **Details**.
2. Copy the external IP address (`Instance Nat Ip`) and open `http://<External IP>` in a new browser tab (wait ~30 seconds if the web server is still initializing; follow any redirection notice).
3. Confirm the congratulations page confirming **Apache HTTP Server** is running.
4. Troubleshooting tip: If corporate VPN/network blocks direct HTTP access to raw IPs, disconnect from VPN or test from another device (tablet/phone).

### Task 3. Review
- Successfully deployed and verified a complete LAMP stack on a Compute Engine instance via Cloud Marketplace.
