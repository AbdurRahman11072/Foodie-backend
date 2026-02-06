import httpStatus from "http-status-codes";
import config from "../config";
import customError from "../error";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const createAdmin = async () => {
  try {
    const adminData: {
      name: string;
      email: string;
      password: string;
      role: "admin";
    } = {
      name: config.ADMIN_NAME as string,
      email: config.ADMIN_EMAIL as string,
      password: config.ADMIN_PASSWORD as string,
      role: "admin",
    };

    const isUserExist = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (isUserExist) {
      console.log("Admin already exist");
      return;
    }

    const signUpAdmin = await auth.api.createUser({
      body: adminData,
    });
    if (!signUpAdmin) {
      throw new customError(
        "Failed to create admin user",
        httpStatus.EXPECTATION_FAILED,
      );
    }

    const email: string = signUpAdmin?.user.email;

    console.log("Admin is created");

    const verifyEmail = await prisma.user.update({
      where: { email: email },
      data: {
        emailVerified: true,
      },
    });

    if (!verifyEmail) {
      throw new customError(
        "Admin Email verification failed ",
        httpStatus.BAD_REQUEST,
      );
    }

    console.log("Admin Email verification successful");
  } catch (error) {
    throw new customError(error as any, httpStatus.BAD_REQUEST);
  }
};

export default createAdmin;
