[Jump to content](#content)

On this page

[Environment Variables](#overview)

===================================

Create T3 App uses its own package [@t3-oss/env-nextjs↗](https://env.t3.gg)
 along with [zod↗](https://zod.dev)
 under the hood for validating environment variables at runtime _and_ buildtime by providing a simple logic in `src/env.js`.

[env.js](#envjs)

-----------------

_TLDR; If you want to add a new environment variable, you must add a validator for it in `src/env.js`, and then add the KV-pair in `.env`_

env.js

    import { createEnv } from "@t3-oss/env-nextjs";
    import { z } from "zod";
    
    export const env = createEnv({
      server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
      },
      client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
      },
      runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
      },
    });
    

T3 Env uses the `createEnv` function to create the schema validate both client and server-side environment variables.

ℹ️

For more information about how `createEnv` works internally, check out the [T3 Env↗](https://env.t3.gg/docs/introduction)
 docs

[Using Environment Variables](#using-environment-variables)

------------------------------------------------------------

When you want to use your environment variables, you can import them from the created `env.js` and use them as you would normally do. If you import this on the client and try accessing a server-side environment variable, you will get a runtime error.

pages/api/hello.ts

    import { env } from "../../env.js";
    
    // `env` is fully typesafe and provides autocompletion
    const dbUrl = env.DATABASE_URL;
    

pages/index.tsx

    import { env } from "../env.js";
    
    // ❌ This will throw a runtime error
    const dbUrl = env.DATABASE_URL;
    
    // ✅ This is fine
    const wsKey = env.NEXT_PUBLIC_WS_KEY;
    

[.env.example](#envexample)

----------------------------

Since the default `.env` file is not committed to version control, we have also included a `.env.example` file, in which you can optionally keep a copy of your `.env` file with any secrets removed. This is not required, but we recommend keeping the example up to date to make it as easy as possible for contributors to get started with their environment.

Some frameworks and build tools, like Next.js, suggest that you store secrets in a `.env.local` file and commit `.env` files to your project. This is not recommended, as it could make it easy to accidentally commit secrets to your project. Instead, we recommend that you store secrets in `.env`, keep your `.env` file in your `.gitignore` and only commit `.env.example` files to your project.

[Adding Environment Variables](#adding-environment-variables)

--------------------------------------------------------------

To ensure your build never completes without the environment variables the project needs, you will need to add new environment variables in **two** locations:

📄 `.env`: Enter your environment variable like you would normally do in a `.env` file, i.e. `KEY=VALUE`

📄 `env.js`: Add the appropriate validation logic for the environment variables by defining a Zod schema inside `createEnv` for each one, e.g. `KEY: z.string()`. Besides that, make sure to destruct them in the `runtimeEnv` option, e.g.: `KEY: process.env.KEY`

ℹ️

Why do I need to destructure the environment variable in the `runtimeEnv`? This is due to how Next.js bundles environment variables in certain runtimes. By destructuring it manually, you ensure that the variable will never be stripped out from the bundle.

Optionally, you can also keep `.env.example` updated:

📄 `.env.example`: Enter your environment variable, but be sure to not include the value if it is secret, i.e. `KEY=VALUE` or `KEY=`

### [Example](#example)

_I want to add my Twitter API Token as a server-side environment variable_

1.  Add the environment variable to `.env`:

    TWITTER_API_TOKEN=1234567890
    

2.  Add the environment variable to `env.js`:

    import { createEnv } from "@t3-oss/env-nextjs";
    import { z } from "zod";
    
    export const env = createEnv({
      server: {
        TWITTER_API_TOKEN: z.string(),
      },
      // ...
      runtimeEnv: {
        // ...
        TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
      },
    });
    

3.  _Optional:_ Add the environment variable to `.env.example` and make sure not to include the secret in the `runtimeEnv` option

    TWITTER_API_TOKEN=
    

[Type Coercion](#type-coercion)

--------------------------------

All variables you add to `.env` will be imported as strings, even if their value is intended to represent a different type. If you want to use your environment variables as a different type at runtime, you can use Zod’s `coerce` to convert the string to the type you want. It will throw if the coercion fails.

Add the variables to your `.env`:

    SOME_NUMBER=123
    SOME_BOOLEAN=true
    

Then, validate them in `env.js`:

    import { createEnv } from "@t3-oss/env-nextjs";
    import { z } from "zod";
    
    export const env = createEnv({
      server: {
        SOME_NUMBER: z.coerce.number(),
        SOME_BOOLEAN: z.coerce.boolean(),
      },
      // ...
      runtimeEnv: {
        SOME_NUMBER: process.env.SOME_NUMBER,
        SOME_BOOLEAN: process.env.SOME_BOOLEAN,
      },
    });
    

[NextAuth.js](/en/usage/next-auth)

[Tailwind CSS](/en/usage/tailwind)

* * *