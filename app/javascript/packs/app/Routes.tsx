import { Alert, Container, Snackbar } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import MyLinks from './pages/my-links/MyLinks';
import Signup from './pages/signup/Signup';
import { snackbarMessageState, snackbarOpenState, snackbarSeverityState } from './store/atoms';

const Routes: React.FC = () => {
  const snackbarMessage = useRecoilValue(snackbarMessageState);
  const snackbarSeverity = useRecoilValue(snackbarSeverityState);
  const [snackbarOpen, setSnackbarOpen] = useRecoilState(snackbarOpenState);

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container fixed className="mt-4">
          <ReactRoutes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<AuthenticatedRoute />}>
              <Route path="/my-links" element={<MyLinks />} />
            </Route>
          </ReactRoutes>
        </Container>
      </BrowserRouter>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert elevation={10} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Routes;