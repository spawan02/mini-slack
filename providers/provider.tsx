'use client'

import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <RecoilRoot>

        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}

export default AuthProvider