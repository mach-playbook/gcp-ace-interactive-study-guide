# Raw Lab Guide: Control Access to VPC Networks Using Firewall Rules and IAM (Course 654 / Lab GSP213 / 464658)

- **Course:** Build a Secure Google Cloud Network (`course_templates/654`)
- **Lab Title:** Control Access to VPC Networks Using Firewall Rules and IAM
- **Lab Code:** `GSP213`
- **Skills Lab ID:** `464658`
- **Skills Lab URL:** https://www.skills.google/course_templates/654/labs/464658
- **Cost:** 5 Credits
- **Duration:** 20 minutes
- **Level:** Intermediate
- **Manual Last Updated / Lab Last Tested:** November 7, 2026
- **Current Points Snapshot:** 16,644

---

## Overview & Objectives

Deploy two Nginx web servers (`blue` and `green`) on the `default` VPC using startup scripts, control external HTTP access selectively with tagged firewall rules (`web-server`), contrast external vs internal reachability (`default-allow-internal`), and explore least-privilege separation of duties between **Compute Network Admin** and **Compute Security Admin** using a service account (`network-admin`).

### Objectives
1. Create `blue` (tagged `web-server`) and `green` (untagged control) Nginx web servers using automated startup scripts.
2. Create tagged firewall rule `allow-http-web-server` and test external vs internal HTTP connectivity via `test-vm`.
3. Grant `Compute Network Admin` (`roles/compute.networkAdmin`) and verify it can list—but not delete—firewall rules.
4. Switch the service account to `Compute Security Admin` (`roles/compute.securityAdmin`) and verify firewall deletion succeeds.

---

## Tasks & Official Commands

### Task 1. Create the web servers (`blue` and `green`)
- **`blue`** (Debian GNU/Linux 12 bookworm, Network tag: **`web-server`**):
  ```bash
  #!/bin/bash
  apt-get update
  apt-get install -y nginx-light
  echo "<h1>Welcome to the blue server!</h1>" > /var/www/html/index.nginx-debian.html
  ```
- **`green`** (Debian GNU/Linux 12 bookworm, **NO network tags**):
  ```bash
  #!/bin/bash
  apt-get update
  apt-get install -y nginx-light
  echo "<h1>Welcome to the green server!</h1>" > /var/www/html/index.nginx-debian.html
  ```

### Task 2. Create tagged firewall rule and test HTTP connectivity
1. Create firewall rule **`allow-http-web-server`** on `default`:
   - Targets: `Specified target tags` → `web-server`
   - Source IPv4 ranges: `0.0.0.0/0`
   - Protocols and ports: `tcp:80`, `icmp`
2. Create `test-vm` and test external vs internal reachability:
   ```bash
   gcloud compute instances create test-vm --machine-type=e2-micro --subnet=default --zone=$ZONE

   export BLUE_EXTERNAL_IP=$(gcloud compute instances describe blue --zone=$ZONE --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
   export GREEN_EXTERNAL_IP=$(gcloud compute instances describe green --zone=$ZONE --format='get(networkInterfaces[0].accessConfigs[0].natIP)')
   export BLUE_INTERNAL_IP=$(gcloud compute instances describe blue --zone=$ZONE --format='get(networkInterfaces[0].networkIP)')
   export GREEN_INTERNAL_IP=$(gcloud compute instances describe green --zone=$ZONE --format='get(networkInterfaces[0].networkIP)')

   curl -m 3 http://$BLUE_EXTERNAL_IP   # Succeeds: <h1>Welcome to the blue server!</h1>
   curl -m 3 http://$GREEN_EXTERNAL_IP  # Times out (missing web-server tag)

   gcloud compute ssh test-vm --zone=$ZONE --command="curl -s http://$BLUE_INTERNAL_IP"
   gcloud compute ssh test-vm --zone=$ZONE --command="curl -s http://$GREEN_INTERNAL_IP"
   # Both internal curls succeed because default-allow-internal permits intra-VPC traffic.
   ```

### Task 3. Explore Network Admin vs Security Admin IAM roles
- **`roles/compute.networkAdmin`**: Create, modify, and delete networking resources **except firewall rules and SSL certificates** (can list firewall rules via `compute.firewalls.list`, cannot delete).
- **`roles/compute.securityAdmin`**: Create, modify, and delete **firewall rules and SSL certificates**.
- Lab verification workflow with pre-created `network-admin@PROJECT_ID.iam.gserviceaccount.com`:
  ```bash
  # 1. With roles/compute.networkAdmin assigned:
  gcloud iam service-accounts keys create $HOME/credentials.json \
    --iam-account=network-admin@PROJECT_ID.iam.gserviceaccount.com
  gcloud auth activate-service-account --key-file=$HOME/credentials.json

  gcloud compute firewall-rules list                                # Succeeds
  gcloud compute firewall-rules delete allow-http-web-server --quiet # Fails: Required 'compute.firewall.delete'

  # 2. After changing role to roles/compute.securityAdmin:
  gcloud compute firewall-rules delete allow-http-web-server --quiet # Succeeds

  # 3. Switch back to student account and verify external HTTP to blue now times out:
  gcloud config set account STUDENT_EMAIL
  curl -m 3 http://$BLUE_EXTERNAL_IP
  ```
- **Production Security Best Practice:** Avoid downloading persistent JSON service account keys in production; prefer short-lived credentials via service account impersonation (`gcloud --impersonate-service-account`) or **Workload Identity Federation**.
