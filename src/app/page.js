"use client";

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function Home() {
  const user = useSelector((rootState) => rootState.user);

  const goToStudentsPage = () => {
    window.location.href = "/students";
  };
  const signIn = () => {
    window.location.href = "/sign-in";
  };
  const register = () => {
    window.location.href = "/register";
  };
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth);
  };
  return (
    <main
      className="sticky top-0 z-50 min-h-screen text-white p-10"
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,9,121,1) 49%, rgba(134,0,255,1) 100%);",
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Welcome to User List
        </h1>
        <p className="text-lg mb-8 text-white">
          Show the list of users for ez manage.
        </p>
        <div className="flex justify-center space-x-4">
          {!user.id && (
            <>
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={signIn}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={register}
              >
                Register
              </Button>
            </>
          )}
          {!!user.id && (
            <>
              <div>Hello, {user.displayName}</div>
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={signOutUser}
              >
                Sign out
              </Button>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            className="mr-2"
            onClick={goToStudentsPage}
          >
            Go to Students
          </Button>
        </div>
      </div>
    </main>
  );
}
