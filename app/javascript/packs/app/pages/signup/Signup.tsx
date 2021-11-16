import React from "react";
import { Formik } from "formik";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import * as Yup from 'yup';
import { client } from "../../utils/client";
import { currentUserState, showSnackbarMessage } from "../../store/atoms";
import { get } from 'lodash';
import { humanize } from "../../utils/functions";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { config } from '../../config';
import { GeneralResponse } from "../../interfaces/responses/general-response";
import { User } from "../../interfaces/models/user";

const Signup: React.FC = () => {
  const [_, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    client.post('/api/users', {
      client_id: config.client_id,
      user: {
        email: values.email,
        password: values.password
      }
    }).then((response) => {
      const parsedResponse = response.data as GeneralResponse<User>;
      localStorage.setItem('access_token', parsedResponse.data.access_token);
      localStorage.setItem('refresh_token', parsedResponse.data.refresh_token);
      setCurrentUser(parsedResponse.data);
      navigate('/')
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
    password: Yup.string().min(6).max(128).required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirmation: ''
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
            <FormControl variant="standard">
              <TextField
                name="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}/>
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