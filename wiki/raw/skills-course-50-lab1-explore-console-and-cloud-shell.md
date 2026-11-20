# Raw Lab Guide: Explore the Google Cloud Console and Cloud Shell (Course 50 / Lab CBL006 / 690261)

- **Course:** Essential Google Cloud Infrastructure: Foundation
- **Module:** Module 1: Interacting with Google Cloud
- **Lab Title:** Explore the Google Cloud Console and Cloud Shell
- **Lab Code:** `CBL006`
- **Skills Lab ID:** `690261`
- **Skills Lab URL:** https://www.skills.google/course_templates/50/labs/690261
- **Cost:** 5 Credits
- **Duration:** 20 minutes
- **Level:** Introductory
- **Last Tested:** November 10, 2026
- **Current Points Snapshot:** 16,546

---

## Overview & Objectives

Familiarization with Google Cloud's two integrated web-based environments:
1. **Google Cloud Console (GUI):** Continuously updated web interface; fast for multi-step/repetitive tasks; reduces errors by offering only valid options and performing behind-the-scenes SDK validation before submitting changes. Very new technologies or granular API/CLI flags may require CLI or APIs instead.
2. **Cloud Shell (CLI):** Browser-based interactive terminal running on a temporary Compute Engine VM with **5 GB of persistent disk storage** (`/home` / `$HOME`) and pre-installed tools (`gcloud`, `gcloud storage`, `kubectl`, `bq`, Java, Go, Python, Node.js, PHP, Ruby), Web Preview, and built-in authorization.

**Important Lifecycle Note:** After **1 hour of inactivity**, the Cloud Shell instance is recycled. Only the `/home` directory persists. Any changes made to system configuration, including environment variables, are lost between sessions unless persisted via shell startup files.

### Objectives
- Get access to Google Cloud.
- Use the Cloud console to create a Cloud Storage bucket.
- Use Cloud Shell to create a Cloud Storage bucket.
- Become familiar with Cloud Shell features and persistent state.

---

## Tasks & Official Commands

### Task 1. Create a bucket using the Cloud console
- Navigate to **Navigation menu > Cloud Storage > Buckets > Create**.
- Enter a globally unique bucket name, leave defaults, click **Create**, and confirm *Public access will be prevented* if prompted.
- Inspect the **Notifications** icon in the Cloud console header for underlying command feedback and operation history.

### Task 2. Access Cloud Shell
- Click **Activate Cloud Shell** on the console title bar.
- Toolbar controls: **Minimize**, **Restore/Maximize**, **Open in a new window**, and **Close terminal** (closing resets the VM and loses machine context outside `/home`).

#### Formative Check 1
- **Question:** *Select the features and capabilities provided by Cloud Shell. (Select all that apply).*
- **Correct Answers:**
  - `5 GB of persistent storage (/home)`
  - `Command-line access to a free temporary Compute Engine VM`
  - `Built-in authorization for access to resources and instances`
- **Incorrect Option:** `A command-line tool that requires you to install Cloud SDK` (Cloud SDK is pre-installed).

### Task 3. Use Cloud Shell to create a Cloud Storage bucket
```bash
gcloud storage buckets create gs://[BUCKET_NAME]
```
- Verify the newly created bucket in **Cloud Storage > Buckets** (refresh if already open).

### Task 4. Explore more Cloud Shell features
- Click **More > Upload** in the Cloud Shell toolbar to upload a local file (`[MY_FILE]`).
- Verify with `ls` and copy it to a bucket:
```bash
ls
gcloud storage cp [MY_FILE] gs://[BUCKET_NAME]
# If filename contains spaces, wrap in single quotes:
gcloud storage cp 'my file.txt' gs://[BUCKET_NAME]
```

### Task 5. Create a persistent state in Cloud Shell
- List available regions and define environment variables:
```bash
gcloud compute regions list
INFRACLASS_REGION=[YOUR_REGION]
echo $INFRACLASS_REGION
```
- Persist variables inside `~/infraclass/config`:
```bash
mkdir infraclass
touch infraclass/config
echo INFRACLASS_REGION=$INFRACLASS_REGION >> ~/infraclass/config
INFRACLASS_PROJECT_ID=[YOUR_PROJECT_ID]
echo INFRACLASS_PROJECT_ID=$INFRACLASS_PROJECT_ID >> ~/infraclass/config
source infraclass/config
echo $INFRACLASS_PROJECT_ID
```
- Automatically load `infraclass/config` on every new Cloud Shell session by editing `~/.profile`:
```bash
nano .profile
# Add at the end of ~/.profile:
source infraclass/config
```
- Close and reopen Cloud Shell, then verify persistence with `echo $INFRACLASS_PROJECT_ID`.

#### Formative Check 2
- **Question:** *Identify the file used to create a persistent state in Cloud Shell.*
- **Correct Answer:** `.profile`
- **Distractors:** `.bashrc`, `.config`, `.my_variables`

### Task 6. Review the Google Cloud interface
- **Cloud Console:** Fast way to perform tasks, presents valid options without needing to memorize syntax, performs behind-the-scenes validation before submission.
- **Cloud Shell:** Detailed control, complete range of options and features, clear path to automation via Bash (Linux) or PowerShell (Windows) scripting.
