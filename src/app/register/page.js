"use client";

import { AppButton } from "@app/components/app-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Register() {
const router = useRouter();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    try {
      if (!signInData.email) {
        alert("Please input email");
        return;
      }
      if (!signInData.password) {
        alert("Please input password");
        return;
      }
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth, 
        signInData.email, 
        signInData.password
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
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="flex flex-col gap-3">
          <TextField 
            id="email" 
            name="email" 
            label="Email" 
            variant="standard" 
            value={signInData.email}
            onChange={(e) => {
              setSignInData({
                ...signInData,
                email: e.target.value,
              });
            }}
          />
          <TextField 
            id="password"  
            name="password" 
            label="Password" 
            variant="standard"
            type="password" 
            value={signInData.password}
            onChange={(e) => {
              setSignInData({
                ...signInData,
                password: e.target.value,
              });
            }}
          />          
          <Button
          variant="contained"
          type="button" 
          onClick={onSubmit}
          color="warning"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}