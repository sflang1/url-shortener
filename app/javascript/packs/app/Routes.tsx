import { Alert, Container, Snackbar } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
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
      <Navbar />
      <Container fixed className="mt-4">
        <BrowserRouter>
          <ReactRoutes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signup" element={<Signup/>} />
          </ReactRoutes>
        </BrowserRouter>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert elevation={10} variant="filled" severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Routes;