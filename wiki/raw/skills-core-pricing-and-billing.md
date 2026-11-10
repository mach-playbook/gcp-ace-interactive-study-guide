---
title: "Pricing and billing"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-08"
type: "video_transcript"
source_url: "https://www.skills.google/course_templates/60"
youtube_video: "https://www.youtube.com/watch?v=OTD61ZfnO28"
---

# Pricing and billing (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Lección 8:

- https://www.youtube.com/watch?v=OTD61ZfnO28

To round off this section of the course, let’s take a brief look at Google Cloud’s pricing structure.

Google was the first major cloud provider to deliver per-second billing for its infrastructure-as-a-service compute offering, Compute Engine.

In addition, per-second billing is now also offered for users of Google Kubernetes Engine our container infrastructure as a service, Managed Service for Apache Spark,

which is the equivalent of the bigdata system Hadoop, but operating as a service, and App Engine flexible environment VMs, a platform as a service.

Compute Engine offers automatically applied sustained-use discounts, which are automatic discounts that you get for running a virtual machine instance for a significant portion of the billing month.

Specifically, when you run an instance for more than 25% of a month, Compute Engine automatically gives you a discount for every incremental minute you use for that instance.

Custom virtual machine types allow Compute Engine virtual machines to be fine-tuned with optimal amounts of

vCPU and memory for their applications so that you can tailor your pricing for your workloads.

Our online pricing calculator can help estimate your costs.

Visit cloud.google.com/products/calculator to try it out.

Now, you’re probably thinking, “How can I make sure I don’t accidentally run up a big Google Cloud bill?”

You can define budgets at the billing account level or at the project level.

A budget can be a fixed limit, or it can be tied to another metric; for example, a percentage of the previous month’s spend.

To be notified when costs approach your budget limit, you can create an alert.

For example, with a budget limit of $20,000 and an alert set at 90%, you’ll receive a notification alert when your expenses reach $18,000.

Alerts are generally set at 50%, 90% and 100%, but can also be customized.

Reports is a visual tool in the Google Cloud console that allows you to monitor expenditure based on a project or services.

Finally, Google Cloud also implements quotas, which are designed to prevent the over-consumption of resources because of

an error or a malicious attack, protecting both account owners and the Google Cloud community as a whole.

There are two types of quotas: rate quotas and allocation quotas.

Both are applied at the project level.

Rate quotas reset after a specific time.

For example, by default, the GKE service implements a quota of 3,000 calls to its API from each Google Cloud project every 100 seconds.

After that 100 seconds, the limit is reset.

Allocation quotas govern the number of resources you can have in your projects.

For example, by default, each Google Cloud project has a quota allowing it no more than 15 Virtual Private Cloud networks.

Although projects all start with the same quotas, you can change some of them by requesting an increase from Google Cloud Support.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
