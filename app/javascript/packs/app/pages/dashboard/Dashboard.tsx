import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">
          Introduce here your URL for being shortened!
        </Typography>
      </Grid>
      <Grid item>
        <div className="flex row align-items-center">
          <div className="flex-grow flex mr-4">
            <TextField
              className="flex-grow"
              value={url}
              onChange={(e) => setUrl(e.target.value)}/>
          </div>
          <div className="flex">
            <Button
              variant="contained">
              Shorten
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          <span>You can also&nbsp;</span>
          <Link to="/signup">sign up&nbsp;</Link>
          <span>or&nbsp;</span>
          <Link to="/login">log in&nbsp;</Link>
          <span>if you wish to keep the links you've shortened</span>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Dashboard;