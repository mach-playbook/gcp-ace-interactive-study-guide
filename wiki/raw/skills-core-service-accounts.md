---
title: "Service accounts"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-09"
type: "video_transcript"
source_url: "https://www.skills.google/course_templates/60"
youtube_video: "https://www.youtube.com/watch?v=xoo5NfLqePY"
---

# Service accounts (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Next lesson:

- https://www.youtube.com/watch?v=xoo5NfLqePY

https://www.skills.google/paths/11/course_templates/60/video/689555

Imagine you have a Compute Engine virtual machine running a program that needs to access other cloud services regularly.

Instead of requiring a person to manually grant access each time the program runs, you can give the virtual machine itself the necessary permissions.

This is where service accounts come in.

Service accounts allow you to assign specific permissions to a virtual machine, so it can interact with other cloud services without human intervention.

Let’s say you have an application running in a virtual machine that needs to store data in Cloud Storage,

but you don’t want anyone on the internet to have access to that data - just that particular virtual machine.

You can create a service account to authenticate that VM to Cloud Storage.

Service accounts are named with an email address, but instead of passwords they use cryptographic keys to access resources.

So, if a service account has been granted Compute Engine’s Instance Admin role, this would allow

an application running in a VM with that service account to create, modify, and delete other VMs.

Service accounts do need to be managed.

For example, maybe Alice needs to manage which Google accounts can act as service accounts, while Bob just needs to be able to view a list of service accounts.

Fortunately, in addition to being an identity, a service account is also a resource, so it can have IAM policies of its own attached to it.

This means that Alice can have the editor role on a service account, and Bob can have the viewer role.

This is just like granting roles for any other Google Cloud resource.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
