import React, { useState } from "react";
import { Button, Fade, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from "react-router-dom";
import { GeneralResponse } from "../../interfaces/responses/general-response";
import { ShortenLinkResponse } from "../../interfaces/responses/shorten-link-response";
import { currentUserState, showSnackbarMessage } from "../../store/atoms";
import { client } from "../../utils/client";
import { useRecoilValue } from "recoil";
import { createAuthClient } from "../../utils/authenticated-client";

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const currentUser = useRecoilValue(currentUserState);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [tooltip, setTooltip] = useState('Copy')

  const shortenLink = async () => {
    try {
      const executableClient = currentUser ? createAuthClient() : client;
      const response = await executableClient.post('/api/auth/links', {
        original_url: url
      });
      const parsedResponse = response.data as GeneralResponse<ShortenLinkResponse>;
      setShortenedUrl(`${window.location.origin}/${parsedResponse.data.unique_identifier}`)
    } catch(err) {
      const dataResponse = err.response.data as GeneralResponse<any>;
      const message = dataResponse.message.length > 0 ? dataResponse.message[0] : 'An error ocurred'
      showSnackbarMessage(message, 'error')
    }
  }

  const copyShortenedLink = async () => {
    await navigator.clipboard.writeText(shortenedUrl);

    setTooltip('Copied!')
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        Introduce here your URL for being shortened!
      </Typography>
      <div className="flex row align-items-flex-start">
        <div className="flex-grow flex mr-4">
          <TextField
            className="flex-grow"
            value={url}
            label="URL"
            onChange={(e) => setUrl(e.target.value)}
            helperText="Please include http or https in the URL."/>
        </div>
        <div className="flex">
          <Button
            onClick={shortenLink}
            variant="contained">
            Shorten
          </Button>
        </div>
      </div>
      {
        !currentUser && (
          <Typography variant="body1">
            <span>You can also&nbsp;</span>
            <Link to="/signup">sign up&nbsp;</Link>
            <span>or&nbsp;</span>
            <Link to="/login">log in&nbsp;</Link>
            <span>if you wish to keep the links you've shortened</span>
          </Typography>
        )
      }
      <Fade in={shortenedUrl !== ''}>
        <Paper elevation={2} className="p-4">
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body1">
              {`Your shortened link is ${shortenedUrl}`}
            </Typography>
            <Tooltip title={tooltip}>
              <IconButton onClick={copyShortenedLink}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Fade>
    </Stack>
  )
}

export default Dashboard;