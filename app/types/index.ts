import {Listing, User} from "prisma/prisma-client"

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};



export type SafeUser = Omit <
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null; // added to allow for optional emails in the future. This is not a
}

