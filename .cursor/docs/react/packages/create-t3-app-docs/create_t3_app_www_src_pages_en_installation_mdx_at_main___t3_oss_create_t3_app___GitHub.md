
 

You signed in with another tab or window. Reload to refresh your session. You signed out in another tab or window. Reload to refresh your session. You switched accounts on another tab or window. Reload to refresh your session. Dismiss alert

[t3-oss](/t3-oss) / **[create-t3-app](/t3-oss/create-t3-app)** Public

*   [Notifications](/login?return_to=%2Ft3-oss%2Fcreate-t3-app)
     You must be signed in to change notification settings
*   [Fork 1.2k](/login?return_to=%2Ft3-oss%2Fcreate-t3-app)
    
*   [Star 26.1k](/login?return_to=%2Ft3-oss%2Fcreate-t3-app)
    

Files
-----

 main

/

installation.mdx
================

Copy path

Blame

Blame

Latest commit
-------------

History
-------

[History](/t3-oss/create-t3-app/commits/main/www/src/pages/en/installation.mdx)

[](/t3-oss/create-t3-app/commits/main/www/src/pages/en/installation.mdx)

83 lines (59 loc) · 3 KB

 main

/

installation.mdx
================

Top

File metadata and controls
--------------------------

*   Preview
    
*   Code
    
*   Blame
    

83 lines (59 loc) · 3 KB

[Raw](https://github.com/t3-oss/create-t3-app/raw/refs/heads/main/www/src/pages/en/installation.mdx)

| title | description | layout | lang | isMdx |
| --- | --- | --- | --- | --- |
| Installation | Installation instructions for Create T3 App | ../../layouts/docs.astro | en  | true |

import Callout from "../../components/docs/callout.tsx";

To scaffold an app using `create-t3-app`, run any of the following commands and answer the command prompt questions:

### npm

[](#npm)

```shell
npm create t3-app@latest
```

### yarn

[](#yarn)

```shell
yarn create t3-app
```

### pnpm

[](#pnpm)

```shell
pnpm create t3-app@latest
```

### bun

[](#bun)

```shell
bun create t3-app@latest
```

After your app has been scaffolded, check out the [first steps](/t3-oss/create-t3-app/blob/main/en/usage/first-steps)
 to get started on your new application.

Advanced usage
--------------

[](#advanced-usage)

| Option/Flag | Description |
| --- | --- |
| `[dir]` | Include a directory argument with a name for the project |
| `--noGit` | Explicitly tell the CLI to not initialize a new git repo in the project |
| `-y`, `--default` | Bypass the CLI and bootstrap a new t3-app with all options selected |
| `--noInstall` | Generate project without installing dependencies |

Experimental usage
------------------

[](#experimental-usage)

For our CI, we have some experimental flags that allow you to scaffold any app without any prompts. If this use case applies to you, you can use these flags. Please note that these flags are experimental and may change in the future without following semver versioning.

| Flag | Description |
| --- | --- |
| `--CI` | Let the CLI know you're in CI mode |
| `--trpc` | Include tRPC in the project |
| `--prisma` | Include Prisma in the project |
| `--drizzle` | Include Drizzle in the project |
| `--nextAuth` | Include NextAuth.js in the project |
| `--tailwind` | Include Tailwind CSS in the project |
| `--dbProvider [provider]` | Include a configured database in the project |
| `--appRouter` | Use Next.js App Router in the project |

If you don't provide the \`CI\` flag, the rest of these flags have no effect.

You don't need to explicitly opt-out of the packages you don't want. However, if you prefer to be explicit, you can pass `false`, e.g. `--nextAuth false`.

The --dbProvider command has 4 database values to choose from: mysql, postgres, planetscale, sqlite. If the command is not provided the default value will be sqlite.

### Example

[](#example)

The following would scaffold a T3 App with tRPC and Tailwind CSS.

```shell
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```

The following would scaffold a T3 App with NextAuth.js, Tailwind CSS, Drizzle, and PostgreSQL.

```shell
pnpm dlx create-t3-app@latest --CI --nextAuth --tailwind --drizzle --dbProvider postgres
```

You can’t perform that action at this time.