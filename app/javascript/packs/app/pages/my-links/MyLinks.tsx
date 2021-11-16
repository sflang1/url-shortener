import React, { useEffect, useState } from "react";
import { Button, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { createAuthClient } from "../../utils/authenticated-client";
import { GeneralResponse } from "../../interfaces/responses/general-response";
import { Link } from "../../interfaces/models/link";
import { showSnackbarMessage } from "../../store/atoms";
import { useNavigate } from "react-router";

const MyLinks: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<Link[]>([]);
  const navigate = useNavigate();

  const loadLinks = async () => {
    try {
      console.log("loading links");
      const response = await createAuthClient().get('/api/auth/links/mine');
      const parsedResponse = response.data as GeneralResponse<Link[]>
      setLinks(parsedResponse.data);
    } catch(err) {
      showSnackbarMessage("Error retrieving links", 'error')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks();
  }, [])

  return (
    loading ? (
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: '57%' }} />
      </Skeleton>
    ) : (
      <Stack spacing={2}>
        <div className="flex row-reverse">
          <Button onClick={() => navigate('/')}>
            Go back
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Shortened URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                links.map((link, index) => (
                  <TableRow key={`link-${index}`}>
                    <TableCell>{link.original_url}</TableCell>
                    <TableCell>{`${window.location.origin}/${link.unique_identifier}`}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    )
  )
};

export default MyLinks;