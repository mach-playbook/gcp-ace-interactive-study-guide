# Raw Lab Guide: Create and Configure Multiple VPC Networks (Course 654 / Lab GSP211 / 464657)

- **Course:** Build a Secure Google Cloud Network (`course_templates/654`)
- **Lab Title:** Create and Configure Multiple VPC Networks
- **Lab Code:** `GSP211`
- **Skills Lab ID:** `464657`
- **Skills Lab URL:** https://www.skills.google/course_templates/654/labs/464657
- **Cost:** 5 Credits
- **Duration:** 25 minutes
- **Level:** Intermediate
- **Manual Last Updated:** November 13, 2026
- **Lab Last Tested:** September 2, 2026
- **Current Points Snapshot:** 16,644

---

## Overview & Objectives

Create two Custom Mode VPC networks (`managementnet` and `privatenet`) alongside pre-existing Auto Mode networks (`default` and `mynetwork` with `mynet-vm-1` and `mynet-vm-2`), configure firewall rules, test external vs internal connectivity across VPCs/regions, and build a multi-NIC appliance VM (`vm-appliance`).

### Objectives
1. Create custom mode VPC networks (`managementnet`, `privatenet`) with firewall rules.
2. Create VM instances (`managementnet-vm-1`, `privatenet-vm-1`) using Compute Engine.
3. Explore external vs internal connectivity across VPC networks and regions.
4. Create a multi-NIC VM instance (`vm-appliance`) and inspect `sudo ifconfig` and `ip route`.

---

## Tasks & Official Commands

### Task 1. Create custom mode VPC networks with firewall rules
1. **`managementnet`** (via Console):
   - Subnet creation mode: `Custom`
   - Subnet: `managementsubnet-1` in `Region_1` (`10.130.0.0/20`)
   - Firewall rule `managementnet-allow-icmp-ssh-rdp`: Ingress, `0.0.0.0/0`, `icmp, tcp:22, tcp:3389`
2. **`privatenet`** (via Cloud Shell CLI):
   ```bash
   gcloud compute networks create privatenet --subnet-mode=custom
   gcloud compute networks subnets create privatesubnet-1 --network=privatenet --region=Region_1 --range=172.16.0.0/24
   gcloud compute networks subnets create privatesubnet-2 --network=privatenet --region=Region_2 --range=172.20.0.0/20
   gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp \
     --direction=INGRESS --priority=1000 --network=privatenet \
     --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0
   ```
3. Verification commands:
   ```bash
   gcloud compute networks list
   gcloud compute networks subnets list --sort-by=NETWORK
   gcloud compute firewall-rules list --sort-by=NETWORK
   ```

### Task 2. Create VM instances
- **`managementnet-vm-1`** (Console): `e2-micro` in `managementnet` / `managementsubnet-1`.
- **`privatenet-vm-1`** (Cloud Shell CLI):
  ```bash
  gcloud compute instances create privatenet-vm-1 --zone=<US_ZONE> --machine-type=e2-micro --subnet=privatesubnet-1
  gcloud compute instances list --sort-by=ZONE
  ```

### Task 3. Explore connectivity between VM instances
From SSH on **`mynet-vm-1`** (`mynetwork`, `Region_1`):
- **External IP pings:** Succeed to `mynet-vm-2`, `managementnet-vm-1`, and `privatenet-vm-1` (ICMP firewall rules allow public access).
- **Internal IP pings:**
  - `mynet-vm-2` (same VPC `mynetwork`, different region/continent) → **SUCCEEDS**.
  - `managementnet-vm-1` & `privatenet-vm-1` (same region `Region_1`, different VPCs) → **100% packet loss** (VPCs are isolated private domains by default; cross-VPC internal communication requires VPC Network Peering or Cloud VPN).

#### Formative Check
- **Question:** *Which instance(s) should you be able to ping from `mynet-region-1-vm` using internal IP addresses?*
- **Correct Answer:** **`mynet-region-2-vm`** (same VPC network).
- **Distractors:** `privatenet-region-1-vm`, `managementnet-region-1-vm`.

### Task 4. Create a VM instance with multiple network interfaces (`vm-appliance`)
- Machine type: **`e2-standard-4`** (4 vCPUs → supports up to 4 NICs; max 8 NICs depending on machine type).
- Attached non-overlapping subnets (all in same region `US_Region`):
  - **`nic0` (`eth0`)**: `privatenet` / `privatesubnet-1` (`172.16.0.0/24`) — Primary NIC.
  - **`nic1` (`eth1`)**: `managementnet` / `managementsubnet-1` (`10.130.0.0/20`).
  - **`nic2` (`eth2`)**: `mynetwork` (`10.128.0.0/20`).
- Verification inside `vm-appliance` SSH:
  ```bash
  sudo ifconfig
  ping -c 3 privatenet-vm-1   # Works via internal DNS (resolves to primary nic0 network)
  ip route
  ```
- **Critical Multi-NIC Routing Behavior:**
  - `vm-appliance` can ping internal IPs of `privatenet-vm-1`, `managementnet-vm-1`, and `mynet-vm-1` (all in directly attached subnets).
  - Pinging **`mynet-vm-2`** (`10.132.0.0/20`, remote subnet in `mynetwork`) **FAILS** because a multi-NIC VM gets a single default route associated with **`eth0`** (`default via 172.16.0.1 dev eth0`), so traffic to any non-directly-connected subnet exits via `eth0` (`privatenet`) unless **policy routing** is configured.
