import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "./interfaces/models/user";
import { GeneralResponse } from "./interfaces/responses/general-response";
import Routes from "./Routes";
import { currentUserState } from "./store/atoms";
import { createAuthClient } from "./utils/authenticated-client";

const SessionInfoLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useRecoilState<User>(currentUserState);

  const preloadSession = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setLoading(false);
    } else {
      if (!currentUser) {
        console.log("token there but no currentUser");
        const response = await createAuthClient().post('/api/auth/users/me')
        const parsedResponse = response.data as GeneralResponse<User>;
        setCurrentUser(parsedResponse.data);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    preloadSession();
  }, []);

  return (
    loading ? (
      <div id="loading_banner">
        <Stack spacing={2} alignItems="center">
          <Typography variant="h5">
            Loading information...
          </Typography>
          <CircularProgress size={48}/>
        </Stack>
      </div>
    ) : (
      <Routes />
    )
  )
}

export default SessionInfoLoader;