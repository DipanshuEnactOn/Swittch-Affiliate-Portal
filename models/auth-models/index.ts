import { auth } from "@/app/api/(auth)/auth/[...nextauth]/route";

export const getAuthSession = async () => {
  try {
    const user = (await auth()) as any;
    return user;
  } catch (error) {
    return null;
  }
};
