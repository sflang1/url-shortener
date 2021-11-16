import React from 'react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../store/atoms';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/client';
import { config } from '../config';

const Navbar: React.FC = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/my-links')
  }

  const logout = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await client.post('/api/oauth/revoke', {
      token: access_token,
      client_id: config.client_id,
      client_secret: config.client_secret
    })
    if (response.status === 200) {
      setCurrentUser(null);
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      navigate('/')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          {
            currentUser && (
              <Stack direction="row" alignItems="center">
                <Typography variant="body1">
                  {currentUser.email}
                </Typography>
                <Button color="inherit" onClick={onClick}>
                  My links
                </Button>
                {
                  currentUser && (
                    <IconButton onClick={logout}>
                      <ExitToAppIcon sx={{ color: '#ffffff' }} />
                    </IconButton>
                  )
                }
              </Stack>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar;