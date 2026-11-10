---
title: "Identity and Access Management (IAM)"
course: "Google Cloud Fundamentals: Core Infrastructure"
date_ingested: "2026-11-08"
type: "video_transcript"
source_url: "https://www.skills.google/course_templates/60"
youtube_video: "https://www.youtube.com/watch?v=Di1T4RyO9yg"
---

# Identity and Access Management (IAM) (Google Cloud Fundamentals: Core Infrastructure)

## 📝 Contenido Sanitizado

Video:

- https://www.youtube.com/watch?v=Di1T4RyO9yg

Siguiente lección:

- https://www.skills.google/paths/11/course_templates/60/video/689554

When an organization node contains lots of folders, projects, and resources, a workforce might need to restrict who has access to what.

To help with this task, administrators can use Identity and Access Management, or IAM.

With IAM, administrators can apply policies that define who can do what and on which resources.

The “who” part of an IAM policy can be a Google account, a Google group, a service account, or a Cloud Identity domain.

A “who” is also called a “principal.”

Each principal has its own identifier, usually an email address.

The “can do what” part of an IAM policy is defined by a role.

An IAM role is a collection of permissions.

When you grant a role to a principal, you grant all the permissions that the role contains.

For example, to manage virtual machine instances in a project, you must be able to create, delete, start, stop and change virtual machines.

So these permissions are grouped into a role to make them easier to understand and easier to manage.

When a principal is given a role on a specific element of the resource hierarchy, the

resulting policy applies to both the chosen element and all the elements below it in the hierarchy.

You can define deny rules that prevent certain principals from using certain permissions, regardless of the roles they're granted.

This is because IAM always checks relevant deny policies before checking relevant allow policies.

Deny policies, like allow policies, are inherited through the resource hierarchy.

There are three kinds of roles in IAM: basic, predefined, and custom.

The first role type is basic.

Basic roles are quite broad in scope.

When applied to a Google Cloud project, they affect all resources in that project.

Basic roles include owner, editor, viewer, and billing administrator.

Let’s look at these basic roles in a bit more detail.

Project viewers can access resources but can’t make changes.

Project editors can access and make changes to a resource.

And project owners can also access and make changes to a resource.

In addition, project owners can manage the associated roles and permissions and set up billing.

Often companies want someone to control the billing for a project but not be able to change the resources in the project.

This is possible through a billing administrator role.

A word of caution: If several people are working together on a project that contains sensitive data, basic roles are probably too broad.

Fortunately, IAM provides other ways to assign permissions that are more specifically tailored to meet the needs of typical job roles.

This brings us to the second type of role, predefined roles.

Specific Google Cloud services offer sets of predefined roles, and they even define where those roles can be applied.

Let’s look at Compute Engine, for example, a Google Cloud product that offers virtual machines as a service.

With Compute Engine, you can apply specific predefined roles—such as “instanceAdmin”—to Compute Engine resources in a given project, a given folder, or an entire organization.

This then allows whoever has these roles to perform a specific set of predefined actions.

But what if you need to assign a role that has even more specific permissions?

That’s when you’d use a custom role.

Many companies use a “least-privilege” model in which each person in your organization is given the minimal amount of privilege needed to do their job.

So, for example, maybe you want to define an “instanceOperator” role to allow some users to stop and start Compute Engine virtual machines, but not reconfigure them.

Custom roles will allow you to define those exact permissions.

Before you start creating custom roles, please note two important details.

First, you’ll need to manage the permissions that define the custom role you’ve created.

Because of this, some organizations decide they’d rather use the predefined roles.

And second, custom roles can only be applied to either the project level or organization level.

They can’t be applied to the folder level.

---
*Ingestado automáticamente para la LLM Wiki del proyecto GCP ACE Interactive Study Guide.*
