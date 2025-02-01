[Jump to content](#content)

On this page

[NextAuth.js](#overview)

=========================

When you want an authentication system in your Next.js application, NextAuth.js is an excellent solution to bring in the complexity of security without the hassle of having to build it yourself. It comes with an extensive list of providers to quickly add OAuth authentication and provides adapters for many databases and ORMs.

Pages Router App Router

[Context Provider](#context-provider)

--------------------------------------

In your app’s entrypoint, you’ll see that your application is wrapped in a [SessionProvider↗](https://next-auth.js.org/getting-started/client#sessionprovider)
:

pages/\_app.tsx

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    

This context provider allows your application to access the session data from anywhere in your application, without having to pass it down as props:

pages/users/\[id\].tsx

    import { useSession } from "next-auth/react";
    
    const User = () => {
      const { data: session } = useSession();
    
      if (!session) {
        // Handle unauthenticated state, e.g. render a SignIn component
        return <SignIn />;
      }
    
      return <p>Welcome {session.user.name}!</p>;
    };
    

[Retrieving session server-side](#retrieving-session-server-side)

------------------------------------------------------------------

Sometimes you might want to request the session on the server. To do so, prefetch the session using the `getServerAuthSession` helper function that `create-t3-app` provides, and pass it down to the client using `getServerSideProps`:

pages/users/\[id\].tsx

    import { getServerAuthSession } from "../server/auth";
    import { type GetServerSideProps } from "next";
    
    export const getServerSideProps: GetServerSideProps = async (ctx) => {
      const session = await getServerAuthSession(ctx);
      return {
        props: { session },
      };
    };
    
    const User = () => {
      const { data: session } = useSession();
      // NOTE: `session` wont have a loading state since it's already prefetched on the server
    
      ...
    }
    

[Inclusion of `user.id` on the Session](#inclusion-of-userid-on-the-session)

-----------------------------------------------------------------------------

Create T3 App is configured to utilise the [session callback↗](https://next-auth.js.org/configuration/callbacks#session-callback)
 in the NextAuth.js config to include the user’s ID within the `session` object.

server/auth.ts

    callbacks: {
        session({ session, user }) {
          if (session.user) {
            session.user.id = user.id;
          }
          return session;
        },
      },
    

This is coupled with a type declaration file to make sure the `user.id` is typed when accessed on the `session` object. Read more about [`Module Augmentation`↗](https://next-auth.js.org/getting-started/typescript#module-augmentation)
 on NextAuth.js’s docs.

server/auth.ts

    import { DefaultSession } from "next-auth";
    
    declare module "next-auth" {
      interface Session {
        user?: {
          id: string;
        } & DefaultSession["user"];
      }
    }
    

The same pattern can be used to add any other data to the `session` object, such as a `role` field, but **should not be misused to store sensitive data** on the client.

[Usage with tRPC](#usage-with-trpc)

------------------------------------

When using NextAuth.js with tRPC, you can create reusable, protected procedures using [middleware↗](https://trpc.io/docs/v10/middlewares)
. This allows you to create procedures that can only be accessed by authenticated users. `create-t3-app` sets all of this up for you, allowing you to easily access the session object within authenticated procedures.

This is done in a two step process:

1.  Grab the session from the request headers using the [`getServerSession`↗](https://next-auth.js.org/configuration/nextjs#getServerSession)
     function. The advantage of using `getServerSession` instead of the regular `getSession` is that it’s a server-side only function and doesn’t trigger unnecessary fetch calls. `create-t3-app` creates a helper function that abstracts this peculiar API away so that you don’t need to import both your NextAuth.js options as well as the `getServerSession` function every time you need to access the session.

server/auth.ts

    export const getServerAuthSession = (ctx: {
      req: GetServerSidePropsContext["req"];
      res: GetServerSidePropsContext["res"];
    }) => {
      return getServerSession(ctx.req, ctx.res, authOptions);
    };
    

Using this helper function, we can grab the session and pass it through to the tRPC context:

server/api/trpc.ts

    import { getServerAuthSession } from "../auth";
    
    export const createContext = async (opts: CreateNextContextOptions) => {
      const { req, res } = opts;
      const session = await getServerAuthSession({ req, res });
      return await createContextInner({
        session,
      });
    };
    

2.  Create a tRPC middleware that checks if the user is authenticated. We then use the middleware in a `protectedProcedure`. Any caller to these procedures must be authenticated, or else an error will be thrown which can be appropriately handled by the client.

server/api/trpc.ts

    export const protectedProcedure = t.procedure.use(({ ctx, next }) =>  {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return next({
        ctx: {
          // infers the `session` as non-nullable
          session: { ...ctx.session, user: ctx.session.user },
        },
      });
    })
    

The session object is a light, minimal representation of the user and only contains a few fields. When using the `protectedProcedures`, you have access to the user’s id which can be used to fetch more data from the database.

server/api/routers/user.ts

    const userRouter = router({
      me: protectedProcedure.query(async ({ ctx }) => {
        const user = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
        return user;
      }),
    });
    

[Usage with Prisma](#usage-with-prisma)

----------------------------------------

Getting NextAuth.js to work with Prisma requires a lot of [initial setup↗](https://authjs.dev/reference/adapter/prisma/)
. `create-t3-app` handles all of this for you, and if you select both Prisma and NextAuth.js, you’ll get a fully working authentication system with all the required models preconfigured. We ship your scaffolded app with a preconfigured Discord OAuth provider, which we chose because it is one of the easiest to get started with - just provide your tokens in the `.env` and you’re good to go. However, you can easily add more providers by following the [NextAuth.js docs↗](https://next-auth.js.org/providers/)
. Note that certain providers require extra fields to be added to certain models. We recommend you read the documentation for the provider you would like to use to make sure you have all the required fields.

### [Adding new fields to your models](#adding-new-fields-to-your-models)

When adding new fields to any of the `User`, `Account`, `Session`, or `VerificationToken` models (most likely you’d only need to modify the `User` model), you need to keep in mind that the [Prisma adapter↗](https://next-auth.js.org/adapters/prisma)
 automatically creates fields on these models when new users sign up and log in. Therefore, when adding new fields to these models, you must provide default values for them, since the adapter is not aware of these fields.

If for example, you’d like to add a `role` to the `User` model, you would need to provide a default value to the `role` field. This is done by adding a `@default` value to the `role` field in the `User` model:

prisma/schema.prisma

    + enum Role {
    +   USER
    +   ADMIN
    + }
    
      model User {
        ...
    +   role Role @default(USER)
      }
    

[Usage with Next.js middleware](#usage-with-nextjs-middleware)

---------------------------------------------------------------

Usage of NextAuth.js with Next.js middleware [requires the use of the JWT session strategy↗](https://next-auth.js.org/configuration/nextjs#caveats)
 for authentication. This is because the middleware is only able to access the session cookie if it is a JWT. By default, Create T3 App is configured to use the **default** database strategy, in combination with Prisma as the database adapter.

⚠️

Using database sessions is the recommended approach and you should read up on JWTs before switching to the JWT session strategy to avoid any security issues.

After switching to the JWT session strategy. Make sure to update the `session` callback in `src/server/auth.ts`. The `user` object will be `undefined`. Instead, retrieve the user’s ID from the `token` object. I.e.:

server/auth.ts

      export const authOptions: NextAuthOptions = {
    +   session: {
    +     strategy: "jwt",
    +   },
        callbacks: {
    -     session: ({ session, user }) => ({
    +     session: ({ session, token }) => ({
            ...session,
            user: {
              ...session.user,
    -         id: user.id,
    +         id: token.sub,
            },
          }),
        },
      }
    

[Setting up the default DiscordProvider](#setting-up-the-default-discordprovider)

----------------------------------------------------------------------------------

1.  Head to [the Applications section in the Discord Developer Portal↗](https://discord.com/developers/applications)
    , and click on “New Application”
2.  In the settings menu, go to “OAuth2 => General”

*   Copy the Client ID and paste it in `DISCORD_CLIENT_ID` in `.env`.
*   Under Client Secret, click “Reset Secret” and copy that string to `DISCORD_CLIENT_SECRET` in `.env`. Be careful as you won’t be able to see this secret again, and resetting it will cause the existing one to expire.
*   Click “Add Redirect” and paste in `<app url>/api/auth/callback/discord` (example for local development: `[http://localhost:3000/api/auth/callback/discord↗](http://localhost:3000/api/auth/callback/discord) `)
*   Save your changes
*   It is possible, but not recommended, to use the same Discord Application for both development and production. You could also consider [Mocking the Provider↗](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts)
     during development.

[Useful Resources](#useful-resources)

--------------------------------------

| Resource | Link |
| --- | --- |
| NextAuth.js Docs | [https://next-auth.js.org/↗](https://next-auth.js.org/) |
| NextAuth.js GitHub | [https://github.com/nextauthjs/next-auth↗](https://github.com/nextauthjs/next-auth) |
| tRPC Kitchen Sink - with NextAuth | [https://kitchen-sink.trpc.io/next-auth↗](https://kitchen-sink.trpc.io/next-auth) |

⚠️

The newest version of NextAuth has migrated to [Auth.js↗](https://authjs.dev/)

[Retrieving session server side](#retrieving-session-server-side)

------------------------------------------------------------------

Sometimes you might want to request the session on the server. To do so, use the `auth` helper function that `create-t3-app` provides.

app/page.tsx

    import { auth } from "~/server/auth";
    
    export default async function Home() {
      const session = await auth();
      ...
    }
    

[Inclusion of `user.id` on the Session](#inclusion-of-userid-on-the-session)

-----------------------------------------------------------------------------

Create T3 App is configured to utilise the [session callback↗](https://authjs.dev/guides/extending-the-session)
 in the NextAuth.js config to include the user’s ID within the `session` object.

server/auth/config.ts

    callbacks: {
        session: ({ session, user }) => ({
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        }),
      },
    

This is coupled with a type declaration file to make sure the `user.id` is typed when accessed on the `session` object. Read more about [`Module Augmentation`↗](https://authjs.dev/getting-started/typescript#resources*module-augmentation)
 on NextAuth.js’s docs.

server/auth/config.ts

    import { DefaultSession } from "next-auth";
    
    declare module "next-auth" {
      interface Session extends DefaultSession {
        user: {
          id: string;
        } & DefaultSession["user"];
      }
    

The same pattern can be used to add any other data to the `session` object, such as a `role` field, but **should not be misused to store sensitive data** on the client.

[Usage with tRPC](#usage-with-trpc)

------------------------------------

When using NextAuth.js with tRPC, you can create reusable, protected procedures using [middleware↗](https://trpc.io/docs/v10/middlewares)
. This allows you to create procedures that can only be accessed by authenticated users. `create-t3-app` sets all of this up for you, allowing you to easily access the session object within authenticated procedures.

This is done in a two step process:

1.  Pass the authentication session into the tRPC context:

server/api/trpc.ts

    import { auth } from "~/server/auth";
    import { db } from "~/server/db";
    
    export const createTRPCContext = async (opts: { headers: Headers }) => {
      const session = await auth();
    
      return {
        db,
        session,
        ...opts,
      };
    };
    

2.  Create a tRPC middleware that checks if the user is authenticated. We then use the middleware in a `protectedProcedure`. Any caller to these procedures must be authenticated, or else an error will be thrown which can be appropriately handled by the client.

server/api/trpc.ts

    export const protectedProcedure = t.procedure
      .use(({ ctx, next }) => {
        if (!ctx.session?.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next({
          ctx: {
            session: { ...ctx.session, user: ctx.session.user },
          },
        });
      });
    

The session object is a light, minimal representation of the user and only contains a few fields. When using the `protectedProcedures`, you have access to the user’s id which can be used to fetch more data from the database.

server/api/routers/user.ts

    const userRouter = router({
      me: protectedProcedure.query(async ({ ctx }) => {
        const user = await prisma.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
        return user;
      }),
    });
    

[Usage with a database provider](#usage-with-a-database-provider)

------------------------------------------------------------------

Prisma Drizzle

Getting NextAuth.js to work with Prisma requires a lot of [initial setup↗](https://authjs.dev/reference/adapter/prisma/)
. `create-t3-app` handles all of this for you, and if you select both Prisma and NextAuth.js, you’ll get a fully working authentication system with all the required models preconfigured. We ship your scaffolded app with a preconfigured Discord OAuth provider, which we chose because it is one of the easiest to get started with - just provide your tokens in the `.env` and you’re good to go. However, you can easily add more providers by following the [Auth.js docs↗](https://authjs.dev/getting-started/authentication/oauth)
. Note that certain providers require extra fields to be added to certain models. We recommend you read the documentation for the provider you would like to use to make sure you have all the required fields.

Getting NextAuth.js to work with Drizzle requires a lot of [initial setup↗](https://authjs.dev/getting-started/adapters/drizzle)
. `create-t3-app` handles all of this for you, and if you select both Drizzle and NextAuth.js, you’ll get a fully working authentication system with all the required models preconfigured. We ship your scaffolded app with a preconfigured Discord OAuth provider, which we chose because it is one of the easiest to get started with - just provide your tokens in the `.env` and you’re good to go. However, you can easily add more providers by following the [Auth.js docs↗](https://authjs.dev/getting-started/authentication/oauth)
. Note that certain providers require extra fields to be added to certain models. We recommend you read the documentation for the provider you would like to use to make sure you have all the required fields.

### [Adding new fields to your models](#adding-new-fields-to-your-models)

When adding new fields to any of the `User`, `Account`, `Session`, or `VerificationToken` models (most likely you’d only need to modify the `User` model), you need to keep in mind that the [Prisma adapter↗](https://authjs.dev/reference/adapter/prisma/)
 automatically creates fields on these models when new users sign up and log in. Therefore, when adding new fields to these models, you must provide default values for them, since the adapter is not aware of these fields.

If for example, you’d like to add a `role` to the `User` model, you would need to provide a default value to the `role` field. This is done by adding a `@default` value to the `role` field in the `User` model:

prisma/schema.prisma

    + enum Role {
    +   USER
    +   ADMIN
    + }
    
      model User {
        ...
    +   role Role @default(USER)
      }
    

[Usage with Next.js middleware](#usage-with-nextjs-middleware)

---------------------------------------------------------------

With Next.js 12+, the easiest way to protect a set of pages is using the [middleware file↗](https://authjs.dev/getting-started/session-management/protecting?framework=express#nextjs-middleware)
. You can create a middleware.ts file in your root pages directory with the following contents.

    export { auth as middleware } from "@/auth"
    

Then define authorized callback in your auth.ts file. For more details check out the [reference docs.↗](https://authjs.dev/reference/nextjs#authorized)

    async authorized({ request, auth }) {
      const url = request.nextUrl
    
      if(request.method === "POST") {
        const { authToken } = (await request.json()) ?? {}
        // If the request has a valid auth token, it is authorized
        const valid = await validateAuthToken(authToken)
        if(valid) return true
        return NextResponse.json("Invalid auth token", { status: 401 })
      }
    
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth.user
    }
    

⚠️

You should not rely on middleware exclusively for authorization. Always ensure that the session is verified as close to your data fetching as possible.

[Setting up the default DiscordProvider](#setting-up-the-default-discordprovider)

----------------------------------------------------------------------------------

1.  Head to [the Applications section in the Discord Developer Portal↗](https://discord.com/developers/applications)
    , and click on “New Application”
2.  In the settings menu, go to “OAuth2 => General”

*   Copy the Client ID and paste it in `DISCORD_CLIENT_ID` in `.env`.
*   Under Client Secret, click “Reset Secret” and copy that string to `DISCORD_CLIENT_SECRET` in `.env`. Be careful as you won’t be able to see this secret again, and resetting it will cause the existing one to expire.
*   Click “Add Redirect” and paste in `<app url>/api/auth/callback/discord` (example for local development: `[http://localhost:3000/api/auth/callback/discord↗](http://localhost:3000/api/auth/callback/discord) `)
*   Save your changes
*   It is possible, but not recommended, to use the same Discord Application for both development and production. You could also consider [Mocking the Provider↗](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts)
     during development.

[Useful Resources](#useful-resources)

--------------------------------------

| Resource | Link |
| --- | --- |
| NextAuth.js Docs | [https://authjs.dev/↗](https://authjs.dev/) |
| NextAuth.js GitHub | [https://github.com/nextauthjs/next-auth↗](https://github.com/nextauthjs/next-auth) |
| tRPC Kitchen Sink - with NextAuth | [https://kitchen-sink.trpc.io/next-auth↗](https://kitchen-sink.trpc.io/next-auth) |

[Prisma](/en/usage/prisma)

[Environment Variables](/en/usage/env-variables)

* * *