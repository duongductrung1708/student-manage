"use client";

import { AppButton } from "@app/components/app-button";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import MuiAlert from "@mui/material/Alert";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import { sleep } from "@app/utils/sleep";
import { studentBackendService } from "@app/services/student-backend.services";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup
    .number("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be greater than 0")
    .max(100, "Age must be less than 100"),
  gender: yup.string().required("Gender is required"),
});

export default function CreateNewStudent() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const [alertState, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
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

  const onSubmit = async (values) => {
    try {
      setBusy(true);
      await sleep(2000);
      await studentBackendService.createStudent({
        ...values,
        age: +values.age,
      });
      setAlert({
        open: true,
        message: "Saved successfully",
        severity: "success",
      });
      await sleep(1000);
      router.push("/students");
    } catch (e) {
      setAlert({
        open: true,
        message: "Save failed. Please try again",
        severity: "error",
      });
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "M",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-white text-white">
      <div className="bg-zinc-300 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Create New Student
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <TextField
            variant="standard"
            id="name"
            name="name"
            label="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            autoFocus
          />
          {formik.touched.name && formik.errors.name && (
            <FormHelperText error>{formik.errors.name}</FormHelperText>
          )}
          <TextField
            variant="standard"
            id="age"
            name="age"
            label="Age"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
          {formik.touched.age && formik.errors.age && (
            <FormHelperText error>{formik.errors.age}</FormHelperText>
          )}
          <FormControl>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender-label"
              value={formik.values.gender}
              onChange={(e) => {
                formik.setFieldValue("gender", e.target.value);
                console.log(e.target.value);
              }}
              name="radio-buttons-group"
            >
              <FormControlLabel value="F" control={<Radio />} label="Female" />
              <FormControlLabel value="M" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" className="mt-2" disabled={busy}>
            Save
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
    </div>
  );
}
