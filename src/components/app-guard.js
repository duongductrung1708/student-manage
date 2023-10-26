"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppButton } from "./app-button";

export const AppGuard = ({ children }) => {
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);

  const signIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!user.id ? (
        <>
          <div className="text-2xl font-semibold text-black mb-4">
            Authentication required. Please sign in.
          </div>
          <AppButton
            className="bg-black text-white hover:bg-gray-800"
            onClick={signIn}
          >
            Sign in
          </AppButton>
        </>
      ) : (
        children
      )}
    </div>
  );
};
