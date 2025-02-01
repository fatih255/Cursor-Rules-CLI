[Jump to content](#content)

On this page

[Folder Structure (Pages)](#overview)

======================================

Please select your packages to see the folder structure of a newly scaffolded app with those selections. Further down, you will find a description of each entry.

 NextAuth.js

 Prisma

 Drizzle

 Tailwind CSS

 tRPC

### [`prisma`](#prisma)

The `prisma` folder contains the `schema.prisma` file which is used to configure the database connection and the database schema. It is also the location to store migration files and/or seed scripts, if used. See [Prisma usage](/en/usage/prisma)
 for more information.

### [`public`](#public)

The `public` folder contains static assets that are served by the web server. The `favicon.ico` file is an example of a static asset.

### [`src/env`](#srcenv)

Used for environment variable validation and type definitions - see [Environment Variables](usage/env-variables)
.

### [`src/pages`](#srcpages)

The `pages` folder contains all the pages of the Next.js application. The `index.tsx` file at the root directory of `/pages` is the homepage of the application. The `_app.tsx` file is used to wrap the application with providers. See [Next.js documentation↗](https://nextjs.org/docs/basic-features/pages)
 for more information.

#### [`src/pages/api`](#srcpagesapi)

The `api` folder contains all the API routes of the Next.js application. See [Next.js Api Routes Docs↗](https://nextjs.org/docs/api-routes/introduction)
 for info on api routes.

#### [`src/pages/api/auth/[...nextauth].ts`](#srcpagesapiauthnextauthts)

The `[...nextauth].ts` file is the NextAuth.js authentication slug route. It is used to handle authentication requests. See [NextAuth.js usage](usage/next-auth)
 for more information on NextAuth.js, and [Next.js Dynamic Routes Docs↗](https://nextjs.org/docs/routing/dynamic-routes)
 for info on catch-all/slug routes.

#### [`src/pages/api/trpc/[trpc].ts`](#srcpagesapitrpctrpcts)

The `[trpc].ts` file is the tRPC API entrypoint. It is used to handle tRPC requests. See [tRPC usage](usage/trpc#-pagesapitrpctrpcts)
 for more information on this file, and [Next.js Dynamic Routes Docs↗](https://nextjs.org/docs/routing/dynamic-routes)
 for info on catch-all/slug routes.

### [`src/server`](#srcserver)

The `server` folder is used to clearly separate code that is only used on the server.

#### [`src/server/auth.ts`](#srcserverauthts)

The main entrypoint for server-side authentication logic. Here, we setup the NextAuth.js [configuration options](usage/next-auth)
, perform [module augmentation](usage/next-auth#inclusion-of-userid-on-the-session)
 as well as provide some DX utilities for authentication such as retrieving the user’s session on the server-side. See [NextAuth.js usage](usage/next-auth#usage-with-trpc)
 for more information.

#### [`src/server/db.ts`](#srcserverdbts)

The `db.ts` file is used to instantiate the Prisma client at global scope. See [Prisma usage](usage/prisma#prisma-client)
 and [best practices for using Prisma with Next.js↗](https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
 for more information.

### [`src/server/db`](#srcserverdb)

The `db` folder contains the Drizzle client and schema. Note that drizzle also requires the `drizzle.config.ts` file (see below).

#### [`src/server/db/index.ts`](#srcserverdbindexts)

The `index.ts` file is used to instantiate the Drizzle client at global scope. See [Drizzle usage](usage/drizzle#drizzle-client)
 for more information.

#### [`src/server/db/schema.ts`](#srcserverdbschemats)

The `schema.ts` file is used to define the database schema. See [Drizzle usage](usage/drizzle#drizzle-client)
 and [Drizzle schema docs↗](https://orm.drizzle.team/docs/sql-schema-declaration)
 for more information.

### [`src/server/api`](#srcserverapi)

The `api` folder contains the tRPC server-side code.

#### [`src/server/api/routers`](#srcserverapirouters)

The `routers` folder contains all your tRPC sub-routers.

#### [`src/server/api/routers/example.ts`](#srcserverapiroutersexamplets)

The `example.ts` file is an example tRPC router utilizing the `publicProcedure` helper to demonstrate how to create a public tRPC route.

Depending on your chosen packages this router contains more or less routes to best demonstrate the usage to your needs.

#### [`src/server/api/trpc.ts`](#srcserverapitrpcts)

The `trpc.ts` file is the main configuration file for your tRPC back-end. In here we:

1.  Define context used in tRPC requests. See [tRPC usage](usage/trpc#-serverapitrpcts)
     for more information.
2.  Export procedure helpers. See [tRPC usage](usage/trpc#-serverapitrpcts)
     for more information.

#### [`src/server/api/root.ts`](#srcserverapirootts)

The `root.ts` file is used to merge tRPC routers and export them as a single router, as well as the router’s type definition. See [tRPC usage](usage/trpc#-serverapirootts)
 for more information.

### [`src/styles`](#srcstyles)

The `styles` folder contains the global styles of the application.

### [`src/utils`](#srcutils)

The `utils` folder is used to store commonly re-used utility functions.

#### [`src/utils/api.ts`](#srcutilsapits)

The `api.ts` file is the front-end entrypoint to tRPC. See [tRPC usage](usage/trpc#-utilsapits)
 for more information.

### [`.env`](#env)

The `.env` file is used to store environment variables. See [Environment Variables](usage/env-variables)
 for more information. This file should **not** be committed to git history.

### [`.env.example`](#envexample)

The `.env.example` file shows example environment variables based on the chosen libraries. This file should be committed to git history.

### [`.eslintrc.cjs`](#eslintrccjs)

The `.eslintrc.cjs` file is used to configure ESLint. See [ESLint Docs↗](https://eslint.org/docs/latest/user-guide/configuring/configuration-files)
 for more information.

### [`db.sqlite (sqlite only)`](#dbsqlite-sqlite-only)

The `db.sqlite` file contains your development database. This file is only created after running the `db:push` parseCommandLine, and ignored by git.

### [`drizzle.config.ts`](#drizzleconfigts)

The `drizzle.config.ts` file is used to configure drizzle kit. See [the documentation↗](https://orm.drizzle.team/kit-docs/config-reference)
 for more information.

### [`next-env.d.ts`](#next-envdts)

The `next-env.d.ts` file ensures Next.js types are picked up by the TypeScript compiler. **You should not remove it or edit it as it can change at any time.** See [Next.js Docs↗](https://nextjs.org/docs/basic-features/typescript#existing-projects)
 for more information.

### [`next.config.mjs`](#nextconfigmjs)

The `next.config.mjs` file is used to configure Next.js. See [Next.js Docs↗](https://nextjs.org/docs/api-reference/next.config.js/introduction)
 for more information. Note: The .mjs extension is used to allow for ESM imports.

### [`postcss.config.js`](#postcssconfigjs)

The `postcss.config.js` file is used for Tailwind PostCSS usage. See [Tailwind PostCSS Docs↗](https://tailwindcss.com/docs/installation/using-postcss)
 for more information.

### [`prettier.config.mjs`](#prettierconfigmjs)

The `prettier.config.mjs` file is used to configure Prettier to include the prettier-plugin-tailwindcss for formatting Tailwind CSS classes. See the [Tailwind CSS blog post↗](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)
 for more information.

### [`start-database.sh (mysql or postgres only)`](#start-databasesh-mysql-or-postgres-only)

The `start-database.sh` file is used to start the database. Please see the comments inside the file for information on how to start the database with your operating system.

### [`tsconfig.json`](#tsconfigjson)

The `tsconfig.json` file is used to configure TypeScript. Some non-defaults, such as `strict mode`, have been enabled to ensure the best usage of TypeScript for Create T3 App and its libraries. See [TypeScript Docs↗](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
 or [TypeScript Usage](usage/typescript)
 for more information.

[Installation](/en/installation)

[Folder Structure (App)](/en/folder-structure-app)

* * *