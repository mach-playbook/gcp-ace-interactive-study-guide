# Raw Transcript: Course Introduction (Course 50 / Video 690256)

- **Course:** Essential Google Cloud Infrastructure: Foundation
- **Lesson Title:** Course Introduction
- **Skills Video URL:** https://www.skills.google/course_templates/50/video/690256
- **YouTube Video URL:** https://www.youtube.com/watch?v=-zTJk_MbmBg
- **Speaker:** Rekha Niveda (Cloud Learning Services team, Google Cloud)
- **Series:** Architecting with Google Compute Engine (Track: Associate Cloud Engineer)

---

## Verbatim Sanitized Transcript

**[00:00]** Hello everyone! I'm Rekha Niveda. I'm part of the Cloud Learning Services team here at Google Cloud.  
**[00:06]** I'm so excited to have you join me for *Architecting with Google Compute Engine*, a course series where we'll explore the essential services of the Google Cloud ecosystem.  
**[00:16]** Before we start using all of the different services that Google Cloud offers, let's talk about what Google Cloud is.  
**[00:23]** When you look at Google Cloud, you will see that it's actually part of a much larger ecosystem.  
**[00:29]** This ecosystem consists of open-source software, partners, developers, third-party software, and other cloud providers.  
**[00:37]** Google is actually a very strong supporter of open-source software.  
**[00:42]** In fact, Google Cloud powers Chrome, Google devices, Google Maps, Gmail, Google Analytics, Google Workspace, and Gemini.  
**[00:52]** Google Cloud itself is a computing solution platform that encompasses three core features: infrastructure, platform, and software.  
**[01:03]** This map represents Google Cloud's global infrastructure.  
**[01:07]** Google Cloud's well-provisioned global network connects regions, zones, and points of presence through a global network of fiber optic cables.  
**[01:18]** The number of zones and regions Google Cloud supports is increasing all the time. So refer to `cloud.google.com/about/locations` for the most up to date information.  
**[01:31]** On top of this infrastructure, Google Cloud uses state-of-the-art, software-defined networking and distributed systems technology to host and deliver your services around the world.  
**[01:44]** These technologies are represented by a suite of cloud-based products and services that are continuously expanding.  
**[01:52]** Now, it's important to understand that there is usually more than one solution for a task or application in Google Cloud.  
**[02:01]** To better understand this, let's look at a solution continuum.  
**[02:05]** Google Cloud spans from infrastructure as a service (IaaS) to software as a service (SaaS).  
**[02:13]** You really can build applications on Google Cloud for the web or mobile that are global, autoscaling, assistive, and that provide services where the infrastructure is completely invisible to the user.  
**[02:27]** It is not just that Google has opened the infrastructure that powers applications like Search, Gmail, Google Maps, and Google Workspace. Google has opened all of the services that make these products possible, and packaged them for you to use.  
**[02:46]** Alternative solutions are possible.  
**[02:48]** For example, you could start up your own VM in Google Compute Engine, and install open-source MySQL on it, and run it just like a MySQL database on your own computer in a data center.  
**[03:01]** Or you could use the Cloud SQL service, which provides a MySQL instance and handles operational work like backups and security patching for you, using the same services Google does to automate backups and patches.  
**[03:15]** You could even move to a NoSQL database that is autoscaling and serverless, so that growth no longer requires adding server instances or possibly changing the design to handle the new capacity.  
**[03:29]** This series of courses focuses on infrastructure.  
**[03:33]** An IT infrastructure is like a city infrastructure. The infrastructure is the basic underlying framework of fundamental facilities and systems such as transport, communication, power, water, fuel, and other essential services.  
**[03:49]** The people in the city are like "users". And the cars, the bikes, and buildings in the city are like "applications".  
**[03:57]** Everything that goes into creating and supporting those applications for the user is the infrastructure.  
**[04:04]** The purpose of this course series is to explore as efficiently and clearly as possible, the infrastructure services provided by Google Cloud.  
**[04:14]** You should become familiar enough with the infrastructure services so that you know what the services do and how to use them.  
**[04:23]** The course won't go into very deep dive case studies on specific vertical applications, but you will know enough to put all the building blocks together to build your own solution.  
**[04:34]** Now, Google Cloud offers a range of compute services.  
**[04:39]** The service that might be most familiar to newcomers is Compute Engine, which lets you run virtual machines on demand in the cloud. It's Google Cloud's infrastructure as a service solution. It provides maximum flexibility for people who prefer to manage server instances themselves.  
**[04:58]** Google Kubernetes Engine lets you run containerized applications on a cloud environment that Google manages for you under your administrative control. Think of containerization as a way to package code that's designed to be highly portable, and to use resources very efficiently; and think of Kubernetes as a way to orchestrate code in containers.  
**[05:23]** Cloud Run, a managed compute platform that lets you run stateless containers via web requests or Pub/Sub events. Cloud Run is serverless. That means it removes all infrastructure management tasks so you can focus on developing applications. It is built on Knative, an open API and runtime environment built on Kubernetes that gives you freedom to move your workloads across different environments and platforms. It can be fully managed on Google Cloud, on Google Kubernetes Engine, or anywhere Knative runs.  
**[05:58]** Cloud Run functions is a completely serverless execution environment, or functions as a service. It executes your code in response to events, whether those events occur once a day or many times per second. Google scales resources as required, but you only pay for the service while your code runs.  
**[06:19]** The "Developing Applications with Cloud Run Functions on Google Cloud" course also discusses Cloud Run functions.  
**[06:27]** "Architecting with Google Compute Engine" is a course series that is part of the Cloud Engineer learning path.  
**[06:33]** In this series of courses, Compute Engine will be our main focus. This path is designed for IT professionals who are responsible for implementing, deploying, migrating, and maintaining applications in the cloud.  
**[06:47]** The prerequisite for these courses is the "Google Cloud Fundamentals: Core Infrastructure" course.  
**[06:53]** "Essential Cloud Infrastructure: Foundation" is the first course of the Architecting with Google Compute Engine series:  
- We start by introducing you to Google Cloud and how to interact with the Google Cloud console and Cloud Shell.  
- Next, we will get into virtual networks and you will create VPC networks and other networking objects.  
- Then, we will take a deep dive into virtual machines, and you will create virtual machines using Compute Engine.  
**[07:23]** "Essential Cloud Infrastructure: Core Services" is the second course of the series:  
- We start by talking about IAM, administering Identity and Access Management for resources.  
- Cover the different data storage services in Google Cloud.  
- Resource management and billing of Google Cloud resources.  
- Resource monitoring using Google Cloud Monitoring.  
**[08:01]** "Elastic Cloud Infrastructure: Scaling and Automation" is the third course of this series:  
- Different options to interconnect networks (Hybrid/Multi-cloud).  
- Load balancing and autoscaling services.  
- Infrastructure automation services like Terraform.  
- Other managed services in Google Cloud.  
**[08:38]** Now, my goal for you is to remember and understand the different Google Cloud services and features, and also be able to apply your knowledge, analyze requirements, and evaluate different options and create your own services.  
**[08:53]** And that's why these courses include interactive hands-on-labs through the Google Skills platform.  
**[09:00]** Google Skills provides you with a Google account and credentials so you can access the Google Cloud console for each lab at no cost.
