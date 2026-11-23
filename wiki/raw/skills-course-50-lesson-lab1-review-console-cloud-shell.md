# Raw Transcript: Lab Review: Explore the Google Cloud Console and Cloud Shell (Course 50 / Video 690262)

- **Course:** Essential Google Cloud Infrastructure: Foundation
- **Module:** Module 1: Interacting with Google Cloud
- **Lesson Title:** Lab Review: Explore the Google Cloud Console and Cloud Shell
- **Skills Video URL:** https://www.skills.google/course_templates/50/video/690262
- **YouTube Video URL:** https://www.youtube.com/watch?v=aYVwJ-_-pyg
- **Course URL:** https://www.skills.google/course_templates/50
- **Series:** Architecting with Google Compute Engine (Track: Associate Cloud Engineer)
- **Current Points Snapshot:** 16,546

---

## Verbatim Sanitized Transcript

**[00:00]** In this lab, you created a Cloud Storage bucket using both the Google Cloud console and Cloud Shell within Google Cloud.  
**[00:08]** The Google Cloud Console can do things Cloud Shell can't do and vice versa.  
**[00:14]** For example, the Google Cloud console can keep track of the context of your configuration activities.  
**[00:20]** It can use the Cloud API to determine from current system state what options are valid, and it can perform repetitive and more leveraged activities on your behalf.  
**[00:30]** Cloud Shell, in contrast, offers detailed and precise control, and through its commands, a way to script and automate activities.  
**[00:40]** However, don't think of the console and Cloud Shell as alternatives.  
**[00:44]** Think of them as one extremely flexible and powerful interface.  
**[00:48]** You can stick around for a lab walkthrough, but remember that Google Cloud’s user interface can change, so your environment might look slightly different.  
**[00:59]** Hi, so here we are in the GCP Console and the first thing we're going to do is create a bucket using the GCP Console.  
**[01:06]** So to do that, I'm going to use the navigation menu which is the icon up here in the top left corner, and I'm currently scroll down to Storage which is here, and click on Browser.  
**[01:21]** What we want to do is create a bucket, so I'm going to click Create bucket.  
**[01:26]** The first thing we need to do is define a name, and now this name needs to be a globally unique name.  
**[01:33]** So you could for example use your Qwiklabs project ID here, so that's what I'll do, copy that and paste it in there.  
**[01:46]** The instructions just say to create, you could also choose to change the default storage class (currently set to multi-regional). We'll talk more about that in a later module.  
**[01:55]** You can control the access to the objects and there are even some advanced settings around encryption.  
**[02:01]** So I'm just going to go ahead and click Create.  
**[02:05]** You can see that this now has created a bucket and here we see the bucket ID or the name.  
**[02:13]** So now we're going to access Cloud Shell.  
**[02:16]** We're going to click this button up here on the right corner, Activate Cloud Shell, and then start Cloud Shell.  
**[02:31]** You could actually expand this and open this in a new tab, or realign it to get a little bit more real estate.  
**[02:40]** So we created a bucket using the GCP Console, now we're going to repeat the same using Cloud Shell.  
**[02:46]** I'm going to copy the command from the lab instructions and paste it in here.  
**[02:58]** This again has to be a globally unique name, so we could grab the ID of our project and add `-shell` to indicate it was created from Cloud Shell.  
**[03:19]** The command shown in the walkthrough is `gsutil mb` (make bucket; modern equivalent in current lab: `gcloud storage buckets create`).  
**[03:27]** If we navigate back in the GCP Console to buckets, we now have two buckets in here.  
**[03:40]** There are other Cloud Shell features we can explore: click the three dots menu to upload a file from the local machine (`MyFile.txt`), then use `ls` to list it.  
**[04:13]** Then we copy that file to the bucket (`gsutil cp MyFile.txt gs://[BUCKET_NAME]`, modern equivalent: `gcloud storage cp`), and verify the uploaded file inside the bucket in Console.  
**[05:08]** Task 5 of the lab goes into creating a persistent state in Cloud Shell: run `gcloud compute regions list`, pick a region (e.g., `us-central1`), store it in `INFRACLASS_REGION`, and verify with `echo`.  
**[05:57]** Create a folder (`mkdir infraclass`), create `infraclass/config`, append `INFRACLASS_REGION` and `INFRACLASS_PROJECT_ID` to the config file, and verify with `source infraclass/config`.  
**[06:57]** This gives us a method to recreate environment variables as Cloud Shell is cycled, though you would still need to issue `source` each time Cloud Shell is opened.  
**[07:08]** So we modify the `.profile` file using `nano`, appending `source infraclass/config` at the end, save, and exit.  
**[08:16]** Note: `.profile` is executed when a new Cloud Shell session starts, so you must close and reopen Cloud Shell to see `echo $INFRACLASS_PROJECT_ID` return the persisted value automatically.  
**[08:39]** Summary: created Cloud Storage buckets via GCP Console and Cloud Shell, uploaded and copied files to a bucket, and configured `.profile` for persistent environment variables across Cloud Shell sessions.
