import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import config from "../config";
import { prisma } from "./prisma";

// If your Prisma file is located elsewhere, you can change the path

export const auth = betterAuth({
  baseURL: config.FRONTEND_URL,
  trustedOrigins: [`${config.FRONTEND_URL}`],
  secret: config.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
      },
      address: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
    // requireEmailVerification: true,
  },

  // emailVerification: {
  //   enabled: true,
  //   sendOnSignUp: true,

  //   // ✅ Add the sendVerificationEmail function
  //   sendVerificationEmail: async ({ user, url, token }, request) => {
  //     console.log("🔐 Email verification triggered!");
  //     console.log(`📧 For user: ${user.email}`);
  //     console.log(`🔗 Verification URL: ${url}`);
  //     console.log(`🔑 Token: ${token}`);
  //   },
  // },

  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${config.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  plugins: [admin()],
});
