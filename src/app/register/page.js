"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Alert,
  Card,
  IconButton,
  InputAdornment,
  Snackbar,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must contain at least 8 character, one uppercase, one lowercase, one number and one special case character"
    ),
});

export default function Register() {
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
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.push("/");
    } catch (e) {
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
            Register
          </Typography>
          <div className="flex flex-col gap-3">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-3"
            >
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.email}
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
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                )}
              <Button
                variant="contained"
                type="submit"
                // onClick={onSubmit}
                color="primary"
              >
                Register
              </Button>
            </form>
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
          </div>
        </Card>
      </div>
    </div>
  );
}
