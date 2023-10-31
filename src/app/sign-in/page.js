"use client";

import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { sleep } from "@app/utils/sleep";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Card,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { authService } from "@app/services/auth.service";
import { useExecute } from "@app/hooks/use-execute";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const { busy } = useExecute();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentAction, setCurrentAction] = useState("sign-in-google");

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
      window.location.href = "/";
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

  const signInWithGoogle = async () => {
    try {
      setCurrentAction("sign-in-google");
      await authService.signUpWithGoogle();
      window.location.href = "/";
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        severity: "error",
      });
      console.error(error);
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
    <div
      className="min-h-screen flex items-center justify-center text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(83,9,121,1) 49%, rgba(134,0,255,1) 100%);",
      }}
    >
      <div>
        <Card
          className="w-96 rounded-xl p-8 text-center glass-background dark:glass-background-dark"
          elevation={8}
        >
          <Typography className="text-2xl font-bold mb-4 text-black">
            Sign In
          </Typography>
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
            <a
              href="/forgot-password"
              className="text-primary-800 dark:text-primary-200 text-sm flex items-start"
            >
              Forgot Password?
            </a>
            <Button variant="contained" type="submit" color="primary">
              Sign in
            </Button>
            <div className="">------------------- Or -------------------</div>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              className="mb-3 bg-red-500 hover:bg-red-600 text-white"
              startIcon={<Google />}
              onClick={signInWithGoogle}
              disabled={busy}
            >
              {busy && currentAction === "sign-in-google"
                ? "Processing..."
                : "Sign In with Google"}
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
        </Card>
      </div>
    </div>
  );
}
