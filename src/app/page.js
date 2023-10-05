"use client";

import { AppButton } from "@app/components/app-button";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

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
              <Button variant="contained" color="primary" className="mr-2" onClick={signIn}>
                Sign in
              </Button>
              <Button variant="contained" color="primary" className="mr-2" onClick={register}>
                Register
              </Button>         
            </>
          )}
          {!!user.id && (
            <>
              <div>Hello, {user.displayName}</div>
              <Button variant="contained" color="primary" className="mr-2" onClick={signOutUser}>
                Sign out
              </Button>  
            </>         
          )}          
          <Button variant="contained" color="primary" className="mr-2" onClick={goToStudentsPage}>
            Go to Students
          </Button>
        </div>
      </div>
    </main>
  );
}
