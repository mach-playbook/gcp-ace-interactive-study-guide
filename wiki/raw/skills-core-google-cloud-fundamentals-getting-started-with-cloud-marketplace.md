---
title: "Google Cloud Fundamentals: Getting Started with Cloud Marketplace"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-09"
type: "lab"
source_url: "https://www.skills.google/course_templates/60"

---

# Google Cloud Fundamentals: Getting Started with Cloud Marketplace (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Siguiente Laboratorio:

- https://www.skills.google/course_templates/60/labs/689558

Lab

5 Credits

25 minutes

Introductory

Updated 3 days ago

sparkThis lab may incorporate AI tools to support your learning.

Overview

In this lab, you use Google Cloud Marketplace to quickly and easily deploy a LAMP stack on a Compute Engine instance. The Google Click to Deploy LAMP Stack provides a complete web development environment for Linux that can be launched in one click.

Component

Role

Linux

Operating system

Apache HTTP Server

Web server

MySQL

Relational database

PHP

Web application framework

phpMyAdmin

PHP administration tool

Objectives

In this lab, you learn how to launch a solution using Cloud Marketplace.

Task 1. Sign in to the Google Cloud console

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

Click the Start Lab button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the right is the Lab setup and access panel with the following:

The Open Google Cloud console button

The temporary credentials (username and password) that you must use for this lab

Other information, if needed, to step through this lab

Note that the lab timer is located near the top of the page, showing the remaining time.

Click Open Google Cloud console (or right-click and select Open Link in Incognito Window if you are running the Chrome browser).

The lab spins up resources, and then opens another tab that shows the Sign in page.

Tip: Arrange the tabs in separate windows, side-by-side.

Note: If you see the Choose an account dialog, click Use Another Account.

If necessary, copy the Username below and paste it into the Sign in dialog.

"Username"

Copied!

You can also find the Username in the Lab setup and access panel.

Click Next.

Copy the Password below and paste it into the Welcome dialog.

"Password"

Copied!

You can also find the Password in the Lab setup and access panel.

Click Next.

Important: You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.

Note: Using your own Google Cloud account for this lab may incur extra charges.

Click through the subsequent pages:

Accept the terms and conditions.

Do not add recovery options or two-factor authentication (because this is a temporary account).

Do not sign up for free trials.

After a few moments, the Google Cloud console opens in this tab.

Note: To view a menu with a list of Google Cloud products and services, click the Navigation menu at the top-left, or type the service or product name in the Search field.

Task 2. Use Cloud Marketplace to deploy a LAMP stack

In the Google Cloud console, in the Navigation menu (), click Marketplace.

In the search bar, type LAMP and then press ENTER.

In the search results, click LAMP Stack Server on Ubuntu 26.04, by Cloud Infrastructure Services.

If you choose another LAMP stack, the lab instructions may not work as expected.

On the LAMP page, click GET STARTED.

On the Agreements page, check the box for Terms and agreements, and click AGREE.

On the Successfully agreed to terms pop up, click DEPLOY.

If prompted, click on Enable for the Compute Engine API and the Infrastructure Manager API.

For Zone, select the deployment zone to ZONE .

For Machine Type, select E2 as the Series and e2-medium as the Machine Type.

Leave the remaining settings as their defaults.

Click Deploy.

Note: Warnings may appear as the deployment is happening. You can disregard these for this lab.

The status of the deployment appears in the console window: lamp-1 is being deployed. When the deployment of the infrastructure is complete, the status changes to lamp-1 has been deployed.

After the software is installed, a summary of the details for the instance, including the site address, is displayed.

Click Check my progress to verify the objective.

Use Cloud Marketplace to deploy a LAMP stack

Task 3. Verify your deployment

When the deployment is complete, click lamp-1-vm > Details.

Click the Site Url link. (If the website is not responding, wait 30 seconds and try again.) If you see a redirection notice, click on that link to view your new site. A new browser tab displays a congratulations message. This page confirms that, as part of the LAMP stack, the Apache HTTP Server is running.

Note: If you can't see the web page in the browser on your corporate laptop: If possible, exit any corporate VPN/network and try again. Enter the IP address on another device, such as a tablet or even a phone.

To view the deployment welcome message, navigate to Network interfaces section, copy the External IP address, and paste it into a new browser tab.

Congratulations!

In this lab, you deployed a LAMP stack to a Compute Engine instance.

End your lab

When you have completed your lab, click End Lab. Google Skills removes the resources you’ve used and cleans the account for you.

You will be given an opportunity to rate the lab experience. Select the applicable number of stars, type a comment, and then click Submit.

The number of stars indicates the following:

1 star = Very dissatisfied

2 stars = Dissatisfied

3 stars = Neutral

4 stars = Satisfied

5 stars = Very satisfied

You can close the dialog box if you don't want to provide feedback.

For feedback, suggestions, or corrections, please use the Support tab.

Copyright 2026 Google LLC All rights reserved. Google and the Google logo are trademarks of Google LLC. All other company and product names may be trademarks of the respective companies with which they are associated.

More resources

Read the [Google Cloud documentation on Cloud Marketplace](https://cloud.google.com/marketplace/docs/).

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
