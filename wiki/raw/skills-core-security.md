---
title: "Security"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-08"
type: "video_transcript"
source_url: "https://www.skills.google/course_templates/60"
youtube_video: "https://www.youtube.com/watch?v=BggWZl8qTzk"
---

# Security (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Lección 6:

- https://www.youtube.com/watch?v=BggWZl8qTzk

Nine of Google’s services have more than one billion users each, and so you can be assured that security is always on the minds of Google's employees.

Design for security is prevalent throughout the infrastructure that Google Cloud and Google services run on.

Let's talk about a few ways Google works to keep customers' data safe.

The security infrastructure can be explained in progressive layers, starting from the physical security of our data centers, continuing on to how the

hardware and software that underlie the infrastructure are secured, and finally, describing the technical constraints and processes in place to support operational security.

We begin with the Hardware infrastructure layer which comprises three key security features: The first is hardware design and provenance.

Both the server boards and the networking equipment in Google data centers are custom-designed by Google.

Google also designs custom chips, including a hardware security chip that's currently being deployed on both servers and peripherals.

The next feature is a secure boot stack.

Google server machines use a variety of technologies to ensure that they are booting the correct

software stack, such as cryptographic signatures over the BIOS, bootloader, kernel, and base operating system image.

This layer's final feature is premises security.

Google designs and builds its own data centers, which incorporate multiple layers of physical security protections.

Access to these data centers is limited to only a very small number of Google employees.

Google additionally hosts some servers in third-party data centers, where we ensure that there are

Google-controlled physical security measures on top of the security layers provided by the data center operator.

Next is the Service deployment layer, where the key feature is encryption of inter-service communication.

Google’s infrastructure provides cryptographic privacy and integrity for remote procedure call (“RPC”) data on the network.

Google’s services communicate with each other using RPC calls.

The infrastructure automatically encrypts all infrastructure RPC traffic that goes between data centers.

Google has started to deploy hardware cryptographic accelerators that will allow it to extend this default encryption to all infrastructure RPC traffic inside Google data centers.

Then we have the User identity layer.

Google’s central identity service, which usually manifests to end users as the Google login page, goes beyond asking for a simple username and password.

The service also intelligently challenges users for additional information based on risk factors such as

whether they have logged in from the same device or a similar location in the past.

Users can also employ secondary factors when signing in, including devices based on the Universal 2nd Factor (U2F) open standard.

On the Storage services layer we find the encryption at rest security feature.

Most applications at Google access physical storage (in other words, “file storage”) indirectly via storage

services, and encryption using centrally managed keys is applied at the layer of these storage services.

Google also enables hardware encryption support in hard drives and SSDs.

The next layer up is the Internet communication layer, and this comprises two key security features.

Google services that are being made available on the internet, register themselves with an infrastructure service called the Google Front End, which ensures that all TLS connections

are ended using a public-private key pair and an X.509 certificate from a Certified Authority (CA), as well as following best practices such as supporting perfect forward secrecy.

The GFE additionally applies protections against Denial of Service attacks.

Also provided is Denial of Service (“DoS”) protection.

The sheer scale of its infrastructure enables Google to simply absorb many DoS attacks.

Google also has multi-tier, multi-layer DoS protections that further reduce the risk of any DoS impact on a service running behind a GFE.

The final layer is Google's Operational security layer which provides four key features.

First is intrusion detection.

Rules and machine intelligence give Google’s operational security teams warnings of possible incidents.

Google conducts Red Team exercises to measure and improve the effectiveness of its detection and response mechanisms.

Next is reducing insider risk.

Google aggressively limits and actively monitors the activities of employees who have been granted administrative access to the infrastructure.

Then there’s employee U2F use.

To guard against phishing attacks against Google employees, employee accounts require use of U2F-compatible Security Keys.

Finally, there are stringent software development practices.

Google employs central source control and requires two-party review of new code.

Google also provides its developers libraries that prevent them from introducing certain classes of security bugs.

Additionally, Google runs a Vulnerability Rewards Program where we pay anyone who is able to discover and inform us of bugs in our infrastructure or applications.

You can learn more about Google’s technical-infrastructure security at cloud.google.com/security/security-design.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
