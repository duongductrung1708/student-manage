"use client";

import { AppButton } from "@app/components/app-button";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);

  const goToStudentsPage = () => {
    router.push('/students');
  };
  const signIn = () => {
    router.push('/sign-in');
  };
  const register = () => {
    router.push('/register');
  };
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth);
  };  
  return (
    <main className="sticky top-0 z-50 min-h-screen bg-gradient-to-r from-black to-white text-white p-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Welcome to User List</h1>
        <p className="text-lg mb-8 text-white">
          Show the list of users for ez manage.
        </p>
        <div className="flex justify-center space-x-4">
          {!user.id && (
            <>
              <AppButton className="mr-2" color="black" onClick={signIn}>
                Sign in
              </AppButton>
              <AppButton className="mr-2" color="black" onClick={register}>
                Register
              </AppButton>         
            </>
          )}
          {!!user.id && (
            <>
              <div>Hello, {user.displayName}</div>
              <AppButton className="mr-2" color="black" onClick={signOutUser}>
                Sign out
              </AppButton>  
            </>         
          )}          
          <AppButton className="mr-2" color="white" onClick={goToStudentsPage}>
            Go to Students
          </AppButton>                  
        </div>
      </div>
    </main>
  );
}
