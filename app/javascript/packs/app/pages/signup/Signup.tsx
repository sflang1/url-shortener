import React from "react";
import { Formik } from "formik";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import * as Yup from 'yup';
import { client } from "../../utils/client";
import { showSnackbarMessage } from "../../store/atoms";
import { get } from 'lodash';
import { humanize } from "../../utils/functions";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const onSubmit = (values, { setSubmitting }) => {
    client.post('/api/users', {
      user: {
        email: values.email,
        password: values.password
      }
    }).then((response) => {
      console.log("response ", response);
      showSnackbarMessage('The user was successfully created');
      setSubmitting(false);
    }).catch(err => {
      const errorMessages = get(err, 'response.data.errors', []);
      const errorMessage = errorMessages.length === 0 ?
                            'An error ocurred. Please try again' :
                            Object.keys(errorMessages).map(key => `${humanize(key)} ${errorMessages[key]}`).join(',')
      showSnackbarMessage(errorMessage,'error');
      setSubmitting(false);
    })
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(128).required()
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit, values, handleChange, touched, errors, isSubmitting, handleBlur }) => ((
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl variant="standard">
              <TextField
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}/>
            </FormControl>
            <FormControl variant="standard">
              <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}/>
            </FormControl>
            <div>
              <Typography variant="body1">
                <span>Or if you already have an account,&nbsp;</span>
                <Link to="/login">
                  log in
                </Link>
              </Typography>
            </div>
            <div className="flex row-reverse">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained">
                Sign up
              </Button>
            </div>
          </Stack>
        </form>
      ))}
    </Formik>
  )
}

export default Signup;