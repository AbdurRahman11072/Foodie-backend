import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import config from "../config";

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,
  baseURL: config.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    enabled: true,
    sendOnSignUp: true,

    // ✅ Add the sendVerificationEmail function
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("🔐 Email verification triggered!");
      console.log(`📧 For user: ${user.email}`);
      console.log(`🔗 Verification URL: ${url}`);
      console.log(`🔑 Token: ${token}`);
    },
  },

  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
