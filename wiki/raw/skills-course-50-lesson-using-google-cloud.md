# Raw Transcript: Using Google Cloud (Course 50 / Video 690259)

- **Course:** Essential Google Cloud Infrastructure: Foundation
- **Module:** Module 1: Interacting with Google Cloud
- **Lesson Title:** Using Google Cloud
- **Skills Video URL:** https://www.skills.google/course_templates/50/video/690259
- **YouTube Video URL:** https://www.youtube.com/watch?v=DvOb1yWbTcw
- **Course URL:** https://www.skills.google/course_templates/50
- **Series:** Architecting with Google Compute Engine (Track: Associate Cloud Engineer)
- **Current Points Snapshot:** 16,526

---

## Verbatim Sanitized Transcript

**[00:00]** There are four ways you can interact with Google Cloud, and we’ll talk about each in turn.  
**[00:07]** There’s the Google Cloud console, Cloud Shell and the Google Cloud CLI, the APIs, and the Google Cloud app.  
**[00:15]** The Google Cloud console provides a web-based, graphical user interface that you access through `console.cloud.google.com`.  
**[00:23]** For example, you can view your virtual machines and their details, as shown on the top.  
**[00:29]** If you prefer to work in a terminal window, the Google Cloud CLI provides the `gcloud` command-line tool.  
**[00:36]** For example, you can list your virtual machines and their details as shown on the bottom with the `gcloud compute instances list` command.  
**[00:45]** Google Cloud also provides Cloud Shell, which is a browser-based, interactive shell environment for Google Cloud that you can access from the Google Cloud console.  
**[00:56]** Cloud Shell is a temporary virtual machine with 5 GB of persistent disk storage that has the Google Cloud CLI pre-installed.  
**[01:06]** Throughout this course, you will apply what you learn in different labs.  
**[01:10]** These labs will have instructions to use the Google Cloud console, such as, “On the Navigation menu, click Compute Engine > VM instances.”  
**[01:21]** Let me dissect these instructions.  
**[01:23]** In the Google Cloud console, all of the major products and services are listed.  
**[01:28]** Within the menu, hover over “Compute Engine” to open a submenu.  
**[01:34]** Finally, click on “VM instances” on the submenu.  
**[01:37]** You will get more comfortable with these instructions and the console as you work on labs.  
**[01:42]** Now labs will also use command-line instructions.  
**[01:45]** You will enter these instructions either in Cloud Shell or an SSH terminal by simply copying and pasting them.  
**[01:53]** In some cases, you will have to modify these commands, for example, when choosing a globally unique name for a Cloud Storage bucket.  
**[02:01]** In addition to the Google Cloud CLI, you can also use client libraries that enable you to easily create and manage resources.  
**[02:09]** Google Cloud client libraries expose APIs for two main purposes: App APIs provide access to services, and they are optimized for supported languages, such as Node.js or Python.  
**[02:22]** Admin APIs offer functionality for resource management.  
**[02:26]** For example, you can use admin APIs if you want to build your own automated tools.  
**[02:33]** The Google Cloud app is another way to interact with Google Cloud.  
**[02:37]** It allows you to manage Google Cloud services from your Android or iOS device.  
**[02:41]** For example, you can start, stop, and SSH into Compute Engine instances and see logs from each instance.  
**[02:49]** You can also set up customizable graphs showing key metrics such as CPU usage, network usage, requests per second, and server errors.  
**[02:58]** The app even offers alerts and incident management and allows you to get up-to-date billing information for your projects and get billing alerts for projects that are going over budget.  
**[03:08]** You can download the Google Cloud app from Google Play or from the App Store.
