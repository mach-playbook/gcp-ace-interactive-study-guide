# Raw Lab Guide: Securing Virtual Machines using Chrome Enterprise Premium (Course 654 / Lab GSP1036 / 592551)

- **Course:** Build a Secure Google Cloud Network (`course_templates/654`)
- **Lab Title:** Securing Virtual Machines using Chrome Enterprise Premium *(formerly BeyondCorp Enterprise — BCE)*
- **Lab Code:** `GSP1036`
- **Skills Lab ID:** `592551`
- **Skills Lab URL:** https://www.skills.google/course_templates/654/labs/592551
- **Cost:** 5 Credits
- **Duration:** 30 minutes
- **Level:** Intermediate
- **Last Updated / Tested:** August 04, 2026

---

## Overview & Learning Objectives

Learn how to use **Chrome Enterprise Premium** (formerly BeyondCorp Enterprise / BCE) and **Identity-Aware Proxy (IAP) TCP forwarding** to enable administrative SSH and RDP access to Compute Engine VM instances that do not have external IP addresses or do not permit direct access over the internet.

### Objectives
1. Verify IAP TCP forwarding (`Cloud Identity-Aware Proxy API`) in the Google Cloud project.
2. Deploy private Linux and Windows VMs without external IPv4 addresses plus a Windows connectivity VM with IAP Desktop.
3. Verify direct SSH/RDP fails without external IPs.
4. Configure the required VPC firewall rule (`allow-ingress-from-iap`) for TCP ports `22` and `3389` from `35.235.240.0/20`.
5. Grant `Cloud IAP > IAP-Secured Tunnel User` (`roles/iap.tunnelResourceAccessor`) permissions on the target VMs.
6. Connect to private Windows/Linux VMs using **IAP Desktop** and CLI tunneling (`gcloud compute ssh` and `gcloud compute start-iap-tunnel`).

---

## Tasks & Official Steps

### Task 1. Enable IAP TCP forwarding
- Navigate to **APIs and Services > Library** → search **Cloud Identity-Aware Proxy API** → confirm **API Enabled** (pre-enabled in the lab).

### Task 2. Create Linux and Windows instances (3 VMs)
1. **`linux-iap`**:
   - Zone: assigned lab `Zone`
   - Networking → `default` interface → **External IPv4 address: `None`**
2. **`windows-iap`**:
   - Zone: assigned lab `Zone`
   - Boot disk: Public Images → **Windows Server** → **Windows Server 2016 Datacenter**
   - Networking → `default` interface → **External IPv4 address: `None`**
3. **`windows-connectivity`**:
   - Zone: assigned lab `Zone`
   - Boot disk: Custom Images → Source project: **Qwiklabs Resources** → Image: **`iap-desktop-v001`**
   - Security → Access scopes: **Allow full access to all Cloud APIs**
   - Keep **External IP enabled** (used as the client jump host with IAP Desktop and Cloud SDK).

### Task 3. Test connectivity to Linux and Windows instances
- Attempt SSH on `linux-iap` and RDP on `windows-iap` → confirm direct access fails because neither instance has an external IPv4 address.

### Task 4. Configure required firewall rule for BCE / IAP
Create a VPC firewall rule in **VPC Network > Firewall**:
- **Name:** `allow-ingress-from-iap`
- **Direction:** `Ingress`
- **Target:** `All instances in the network`
- **Source IPv4 Ranges:** `35.235.240.0/20`
- **Protocols and ports:** `tcp:22,3389` (SSH + RDP)

Equivalent CLI command:
```bash
gcloud compute firewall-rules create allow-ingress-from-iap \
  --direction=INGRESS \
  --action=ALLOW \
  --rules=tcp:22,3389 \
  --source-ranges=35.235.240.0/20
```

### Task 5. Grant permissions to use IAP TCP forwarding
- Navigate to **Security > Identity-Aware Proxy → SSH and TCP Resources** tab (ignore OAuth Consent Screen warning in the HTTPS tab).
- Select **`linux-iap`** and **`windows-iap`**.
- Click **Add principal** and assign **Cloud IAP > IAP-Secured Tunnel User** (`roles/iap.tunnelResourceAccessor`) to:
  1. The Compute Engine default service account associated with `windows-connectivity`: `<PROJECT_NUMBER>-compute@developer.gserviceaccount.com`
  2. The student account email.

### Task 6. Use IAP Desktop to connect to Windows and Linux instances
- Download the RDP file for `windows-connectivity` and sign in (`student` / `Learn123!`).
- Launch **IAP Desktop** (`github.com/GoogleCloudPlatform/iap-desktop`), sign in with Google using lab credentials, add the lab project, double-click `windows-iap`, and choose **Generate new credentials** to establish an IAP-tunneled RDP desktop session.

### Task 7. Demonstrate CLI tunneling using SSH and RDP connections
From the Google Cloud SDK shell inside `windows-connectivity`:
1. **SSH via IAP to `linux-iap`**:
   ```bash
   gcloud compute ssh linux-iap --zone=<ZONE>
   ```
   *(Automatically detects no external IP and routes through IAP TCP forwarding.)*
2. **RDP Tunnel via IAP to `windows-iap`**:
   ```bash
   gcloud compute start-iap-tunnel windows-iap 3389 --local-host-port=localhost:0 --zone=<ZONE>
   ```
   - Note the dynamically allocated local port (`Listening on port [XXX]`).
   - Set Windows password for `windows-iap` in Compute Engine console.
   - Connect Microsoft Remote Desktop Connection (or Spark View in browser) to `localhost:<PORT>` using the generated credentials.
