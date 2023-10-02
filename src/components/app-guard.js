"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppButton } from "./app-button";

export const AppGuard = ({ children }) => {
    const router = useRouter();
    const user = useSelector((rootState) => rootState.user);
    const signIn = () => {
        router.push('/sign-in');
    };
    if (!user.id) {
        return (
            <>
                <div>Authentication required. Please sign in</div>
                <AppButton className="mr-2" color="black" onClick={signIn}>
                    Sign in
                </AppButton>            
            </>
        );
    }
    return <>{children}</>
};