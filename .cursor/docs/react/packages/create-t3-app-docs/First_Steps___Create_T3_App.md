[Jump to content](#content)

On this page

[First Steps](#overview)

=========================

You just scaffolded a new T3 App and are ready to go. Here is the bare minimum to get your app working.

[Database](#database)

----------------------

### [MySQL, PostgreSQL](#mysql-postgresql)

If you chose MySQL or PostgreSQL as your database, your T3 app will come with a `start-database.sh` bash script that can create a docker container with a database for local development. If you already have a database, feel free to delete this file and put your database credentials in `.env`. On macOS, you can also use [DBngin↗](https://dbngin.com/)
 if you don’t want to use docker.

### [Prisma](#prisma)

If your app includes Prisma, make sure to run `npx prisma db push` from the root directory of your app. This command will sync your Prisma schema with your database and will generate the TypeScript types for the Prisma Client based on your schema. Note that you need to [restart the TypeScript server↗](https://tinytip.co/tips/vscode-restart-ts/)
 after doing this so that it can detect the generated types.

### [Drizzle](#drizzle)

If your app includes Drizzle, check the `.env` file for instructions on how to construct your `DATABASE_URL` env variable. Once your env file is ready, run `pnpm db:push` (or the equivalent for other package managers) to push your schema.

[Authentication](#authentication)

----------------------------------

If your app includes NextAuth.js, we get you started with the `DiscordProvider`. This is one of the simplest providers that NextAuth.js offers, but it still requires a bit of initial setup on your part.

Of course, if you prefer to use a different auth provider, you can also use one of the [many providers↗](https://next-auth.js.org/providers/)
 that NextAuth.js offers.

1.  You will need a Discord account, so register one if you haven’t already.
2.  Navigate to [https://discord.com/developers/applications↗](https://discord.com/developers/applications)
     and click “New Application” in the top right corner. Give your application a name and agree to the Terms of Service.
3.  Once your application has been created, navigate to “Settings → OAuth2 → General”.
4.  Copy the “Client ID” and add it to your `.env` as `AUTH_DISCORD_ID`.
5.  Click “Reset Secret”, copy the new secret, and add it to your `.env` as `AUTH_DISCORD_SECRET`.
6.  Click “Add Redirect” and type in `http://localhost:3000/api/auth/callback/discord`.
    *   For production deployment, follow the previous steps to create another Discord Application, but this time replace `http://localhost:3000` with the URL that you are deploying to.
7.  Save Changes.

You should now be able to log in.

[Editor Setup](#editor-setup)

------------------------------

The following extensions are recommended for an optimal developer experience. The links below provide editor specific plugin support.

*   [Prisma Extension↗](https://www.prisma.io/docs/guides/development-environment/editor-setup)
    
*   [Tailwind CSS IntelliSense Extension↗](https://tailwindcss.com/docs/editor-setup)
    
*   [Prettier Extension↗](https://prettier.io/docs/en/editors.html)
    

[Next Steps](#next-steps)

--------------------------

*   If your app includes tRPC, check out `src/pages/index.tsx` and `src/server/api/routers/post.ts` to see how tRPC queries work.
*   Have a look around the Create T3 App docs, as well as the docs of the packages that your app includes.
*   Join our [Discord↗](https://t3.gg/discord)
     and give us a star on [GitHub↗](https://github.com/t3-oss/create-t3-app)
    ! :)

[Other Recommendations](/en/other-recs)

[Next.js](/en/usage/next-js)

* * *