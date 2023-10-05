"use client";

import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { sleep } from "@app/utils/sleep";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
const router = useRouter();
  const [alertState, setAlert] = useState ({
    open: false,
    message: "",
    severity: "success",
  })
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    
    setAlert({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!signInData.email) {
        setAlert({
          open: true,
          message: "Please input email",
          severity: "error"
        })
        return;
      }
      if (!signInData.password) {
        setAlert({
          open: true,
          message: "Please input password",
          severity: "error",
        });   
        return;
      }
      const auth = getAuth();
      await signInWithEmailAndPassword (
        auth,
        signInData.email,
        signInData.password,
      );
      setAlert({
        open: true,
        message: "Sign in successfully",
        severity: "success",
      });
      await sleep(1000);
      router.push("/");
    } catch (e) {
      let errorMessage = e.message;
      if (e.code === "auth/invalid-login-credentials") {
        errorMessage = "Invalid email or password";
      }
      setAlert({
        open: true,
        message: e.message,
        severity: "error",
      });
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white text-white">
      <div className="bg-transparent p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
          <Button variant="contained" type="submit" color="warning">
            Sign in
          </Button>
          {alertState.open && (
          <Snackbar 
            open={alertState.open} 
            autoHideDuration={3000} 
            onClose={handleClose}
          >
            <Alert 
              onClose={handleClose} 
              severity={alertState.severity} 
              sx={{ width: '100%' }}
            >
              {alertState.message} 
            </Alert>
          </Snackbar>
          )}
        </form>
      </div>
    </div>
  );
}