import { z } from "zod";

import accounts from "./accounts.json";
import calls from "./calls.json";
import emails from "./emails.json";
import user from "./users.json";

/* -----------------------------------------------------------------------------------------------
 * Constants
 * -----------------------------------------------------------------------------------------------*/

export const PAGE_SIZE = 12;

/* -----------------------------------------------------------------------------------------------
 * Accounts
 * -----------------------------------------------------------------------------------------------*/

const accountSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.string(),
  territory: z.string(),
  speciality: z.string(),
});

export type Account = z.infer<typeof accountSchema>;

export const ACCOUNTS = z.array(accountSchema).parse(accounts);

/* -----------------------------------------------------------------------------------------------
 * Calls
 * -----------------------------------------------------------------------------------------------*/

const callSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  callType: z.string(),
  callDate: z.string(),
  callStatus: z.string(),
});

export type Call = z.infer<typeof callSchema>;

export const CALLS = z.array(callSchema).parse(calls);

/* -----------------------------------------------------------------------------------------------
 * Emails
 * -----------------------------------------------------------------------------------------------*/

const emailSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  emailType: z.string().optional(),
  emailDate: z.string(),
  emailStatus: z.string().optional(),
});

export type Email = z.infer<typeof emailSchema>;

export const EMAILS = z.array(emailSchema).parse(emails);

/* -----------------------------------------------------------------------------------------------
 * Users
 * -----------------------------------------------------------------------------------------------*/

const userSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  userProfile: z.string(),
  territory: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const USERS = z.array(userSchema).parse(user);
