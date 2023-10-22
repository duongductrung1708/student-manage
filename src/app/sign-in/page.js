"use client";

import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { sleep } from "@app/utils/sleep";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const router = useRouter();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (values) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, values.email, values.password);
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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white text-white">
      <div className="bg-zinc-300 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">Sign In</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email &&
            formik.errors.email &&
            formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    size="small"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.email &&
            formik.errors.password &&
            formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          <Button variant="contained" type="submit" color="primary">
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
                sx={{ width: "100%" }}
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
