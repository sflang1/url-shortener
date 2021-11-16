import React from "react";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { config } from '../../config';
import { client } from "../../utils/client";
import { currentUserState, showSnackbarMessage } from "../../store/atoms";
import { useRecoilState } from "recoil";
import { createAuthClient } from "../../utils/authenticated-client";
import { GeneralResponse } from "../../interfaces/responses/general-response";
import { User } from "../../interfaces/models/user";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await client.post('/api/oauth/token', {
        email: values.email,
        password: values.password,
        grant_type: "password",
        client_id: config.client_id,
        client_secret: config.client_secret
      });

      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      const meResponse = await createAuthClient().post('/api/auth/users/me')
      const parsedResponse = meResponse.data as GeneralResponse<User>;
      setCurrentUser(parsedResponse.data);
      setSubmitting(false);
      navigate('/');
    } catch(err) {
      showSnackbarMessage("Login attempt failed. Please check your email and password.", 'error')
      setSubmitting(false);
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        email: '',
        password: ''
      }}>
      {
        ({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
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
                  helperText={touched.email && errors.email} />
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
                  helperText={touched.password && errors.password} />
              </FormControl>
              <div>
                <Typography variant="body1">
                  <span>Or if you don't have an account,&nbsp;</span>
                  <Link to="/signup">
                    sign up
                  </Link>
                </Typography>
              </div>
              <div className="flex row-reverse">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained">
                  Log in
                </Button>
              </div>
            </Stack>
          </form>
        )
      }
    </Formik>
  )
}

export default Login;