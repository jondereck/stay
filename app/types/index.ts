import {User} from "prisma/prisma-client"

export type SafeUser = Omit <
User,
"cretedAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  email?: string | null; // added to allow for optional emails in the future. This is not a
}