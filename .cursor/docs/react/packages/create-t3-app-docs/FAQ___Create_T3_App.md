[Jump to content](#content)

On this page

[FAQ](#overview)

=================

Here are some commonly asked questions about Create T3 App.

[What’s next? How do I make an app with this?](#whats-next-how-do-i-make-an-app-with-this)

-------------------------------------------------------------------------------------------

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord↗](https://t3.gg/discord)
 and ask for help.

*   [Next.js↗](https://nextjs.org/)
    
*   [NextAuth.js↗](https://next-auth.js.org)
    
*   [Prisma↗](https://prisma.io)
    
*   [Tailwind CSS↗](https://tailwindcss.com)
    
*   [tRPC↗](https://trpc.io)
    
*   [Drizzle↗](https://orm.drizzle.team/docs/overview)
    

[How do I keep my app up to date?](#how-do-i-keep-my-app-up-to-date)

---------------------------------------------------------------------

Create T3 App is a scaffolding tool, not a framework. This means that once you initialize an app, it’s yours. There is no postinstall CLI tool similar to help you stay up to date. If you want to keep track of any improvements we make to the template, you could [enable notifications for releases↗](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository)
 on our repository. That being said it is not really necessary to implement every change we make to the template in your app.

[What learning resources are currently available?](#what-learning-resources-are-currently-available)

-----------------------------------------------------------------------------------------------------

Although the resources listed below are some of the best that exist for the T3 Stack, the community (and [Theo↗](https://youtu.be/rzwaaWH0ksk?t=1436)
) recommend that you just start using the stack and learn along the way by building with it.

If you are considering Create T3 App, chances are you might have already used some of the parts of the stack. So why not just dive in head first and learn the other parts while you build something?

Now, we realize this path doesn’t work for everyone. So, if you feel like you’ve tried the recommendation and would still like some resources, or you just aren’t confident doing it by yourself and/or feel overwhelmed by the stack, checkout these awesome tutorials on Create T3 App:

### [Articles](#articles)

Some of these might be outdated.

*   [A first look at Create T3 App↗](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
    
*   [Migrating your T3 App into a Turborepo↗](https://www.jumr.dev/blog/t3-turbo)
    
*   [Integrating Stripe into your T3 App↗](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)
    

### [Videos](#videos)

*   [From 0 to Production - The Modern React Tutorial (RSCs, Next.js, Shadui, Drizzle, TS and more)↗](https://www.youtube.com/watch?v=d5x0JCZbAJs)
     **(recommended)** (updated 2024)\*
*   [Jack Herrington - Build a Note Taking app with the T3 Stack↗](https://www.youtube.com/watch?v=J1gzN1SAhyM)
    
*   [Build a Twitter Clone with the T3 Stack - tRPC, Next.js, Prisma, Tailwind & Zod↗](https://www.youtube.com/watch?v=nzJsYJPCc80)
    
*   [Build a Blog With the T3 Stack - tRPC, TypeScript, Next.js, Prisma & Zod↗](https://www.youtube.com/watch?v=syEWlxVFUrY)
    
*   [Build a Live Chat Application with the T3 Stack - TypeScript, Tailwind, tRPC↗](https://www.youtube.com/watch?v=dXRRY37MPuk)
    
*   [The T3 Stack - How We Built It↗](https://www.youtube.com/watch?v=H-FXwnEjSsI)
    
*   [An overview of the Create T3 App (Next, Typescript, Tailwind, tRPC, Next-Auth)↗](https://www.youtube.com/watch?v=VJH8dsPtbeU)
    

[Why are there `.js` files in the project?](#why-are-there-js-files-in-the-project)

------------------------------------------------------------------------------------

As per [T3-Axiom #3](/en/introduction#typesafety-isnt-optional)
, we treat typesafety as a first class citizen. Unfortunately, not all frameworks and plugins support TypeScript which means some of the configuration files have to be `.js` files.

We try to emphasize that these files are JavaScript for a reason, by explicitly declaring each file’s type (`cjs` or `mjs`) depending on what’s supported by the library it is used by. Also, all the `js` files in this project are still typechecked using a checkJs option in the compiler (tsconfig).

[I’m struggling to add i18n to my app. Is there any reference I can use?](#im-struggling-to-add-i18n-to-my-app-is-there-any-reference-i-can-use)

-------------------------------------------------------------------------------------------------------------------------------------------------

We have decided against including i18n by default in `create-t3-app` because it’s a very opinionated topic and there are many ways to implement it.

However, if you struggle to implement it and want to see a reference project, we have a [reference repo↗](https://github.com/juliusmarminge/t3-i18n)
 that shows how you can add i18n to a T3 App using [next-i18next↗](https://github.com/i18next/next-i18next)
.

[Should I use `/app` from Next.js 13 or the more mature `/pages` paradigm?](#should-i-use-app-from-nextjs-13-or-the-more-mature-pages-paradigm)

------------------------------------------------------------------------------------------------------------------------------------------------

You have the option when scaffolding an app using Create T3 App to opt into the `/app` directory structure. As of the time of writing, this feature is generally considered mature enough to be used in production by the T3 stack community. For an explanation of why it took us so long to include, you can watch [this video↗](https://www.youtube.com/watch?v=PmBfq-SpzCU)
.

Nevertheless, if you strongly prefer to use the old `/pages` paradigm, that’s still an option. Porting over your existing router can be a monumental effort, so do not feel undue pressure to do so unnecessarily.

ℹ️

For a list of supported, planned, and worked on features in the `/app` dir, visit the [beta Next.js docs↗](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features)
.

[Folder Structure (App)](/en/folder-structure-app)

[T3 Collection](/en/t3-collection)

* * *