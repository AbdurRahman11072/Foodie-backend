export type AuthType = {
  id: string;
  email: string;
  name: string;
  role: "user" | "seller" | "admin";
  emailVerified: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user: AuthType;
    }
  }
}
