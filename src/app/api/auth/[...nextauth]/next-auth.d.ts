import { SessionProvider } from 'next-auth/react';
import NextAuth from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        }
    }
}