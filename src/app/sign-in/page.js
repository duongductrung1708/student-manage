"use client";

import { AppButton } from "@app/components/app-button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
const router = useRouter();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!signInData.email) {
        alert("Please input email");
        return;
      }
      if (!signInData.password) {
        alert("Please input password");
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword (
        auth,
        signInData.email,
        signInData.password,
      );
      router.push("/");
    } catch (e) {
      alert(e.message);
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white text-white">
      <div className="bg-transparent p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full font-bold text-black"
              type="email"
              name="email"
              id="email"
              value={signInData.email}
              onChange={(e) => {
                setSignInData({
                  ...signInData,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              className="border border-gray-300 px-3 py-2 rounded w-full font-bold text-black"
              type="password"
              name="password"
              id="password"
              value={signInData.password}
              onChange={(e) => {
                setSignInData({
                  ...signInData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <AppButton type="submit" color="black">
            Sign in
          </AppButton>
        </form>
      </div>
    </div>
  );
}