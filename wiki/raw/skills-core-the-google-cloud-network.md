---
title: "The Google Cloud network"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-08"
type: "video_transcript"
source_url: "https://www.skills.google/course_templates/60"
youtube_video: "https://www.youtube.com/watch?v=SDGJqKIE5yY"
---

# The Google Cloud network (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Lección 4:

- https://www.youtube.com/watch?v=SDGJqKIE5yY

Google Cloud runs on Google’s own global network.

It’s the largest network of its kind, and Google has invested billions of dollars over many years to build it.

This network is designed to give customers the highest possible throughput and lowest possible latencies for their applications by leveraging more than 100 content caching nodes worldwide.

These are locations where high demand content is cached for quicker access, allowing applications to respond to user requests from the location that will provide the quickest response time.

Google Cloud’s locations underpin all of the important work we do for our customers.

From redundant cloud regions to high- bandwidth connectivity via subsea cables, every aspect of our infrastructure

is designed to deliver your services to your users, no matter where they are around the world.

Google Cloud’s infrastructure is based in seven major geographic locations: North America, South America, Europe, Africa, the Middle East, Asia, and Australia.

Having multiple service locations is important because choosing where to locate applications affects qualities like availability, durability, and latency,

the latter of which measures the time a packet of information takes to travel from its source to its destination.

Each of these locations is divided into several different regions and zones.

Regions represent independent geographic areas and are composed of zones.

For example, London, or europe-west2, is a region that currently comprises three different zones.

A zone is an area where Google Cloud resources are deployed.

For example, if you launch a virtual machine using Compute Engine it will run in the zone that you specify to ensure resource redundancy.

You can run also resources in different regions.

This is useful for bringing applications closer to users around the world, and also for protection in case there are issues with an entire region, such as a natural disaster.

Some of Google Cloud’s services support placing resources in what we call a multi-region.

For example, Spanner multi-region configurations allow you to replicate the database's data not just in multiple zones, but in multiple zones across multiple regions, as defined by the instance configuration.

These additional replicas enable you to read data with low latency from multiple locations close to or within the regions in the configuration, like The Netherlands, and Belgium.

The number of zones and regions Google Cloud supports is increasing all the time.

You can find the most up-to-date numbers at cloud.google.com/about/locations.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
