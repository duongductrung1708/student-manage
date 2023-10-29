"use client";

import React from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useExecute } from "@app/hooks/use-execute";
import { authService } from "@app/services/auth.service";
import { MainButton } from "@app/components/main-button";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const { setNotification } = useDispatch();
  const { execute, busy } = useExecute();

  const resetPassword = (values) =>
    execute(async () => {
      await authService.resetPassword(values.email);
      setNotification({
        open: true,
        severity: "success",
        message:
          "Request has been processed. If your email is correct, you will receive an email with instructions to reset your password.",
      });
    });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  const backToSignIn = () => {
    window.location.href = "/sign-in";
  };

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
            Forgot Password
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
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
            <MainButton
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 mb-3"
              disabled={busy}
            >
              {busy ? "Processing..." : "Reset Password"}
            </MainButton>
            <Button
              variant="contained"
              color="info"
              fullWidth
              className="mb-3"
              startIcon={<ArrowBack />}
              onClick={backToSignIn}
            >
              Back to Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
