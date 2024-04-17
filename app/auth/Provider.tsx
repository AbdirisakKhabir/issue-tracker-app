"use client";

import { SessionProvider } from "next-auth/react";
import Reacr, {PropsWithChildren} from 'react';

export const AuthProvider = ({ children}: PropsWithChildren) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}