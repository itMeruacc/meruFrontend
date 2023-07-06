// react components
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material ui components
import { Box } from '@mui/system';
import { Paper, CircularProgress, Container } from '@mui/material';

// OWN components
import ClientInfo from './ClientInfo';
import NoClientSelected from './NoClientSelected';
import ClientTime from './ClientTime';

// helpers
import secondsToHms from '../../helpers/secondsToHms';

//---------------------------------------------------------------

// style
const mainLoader = {
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

// end of data

export default function Main({ clientId, setclientId }) {
  // store
  const [client, setclient] = useState({ client: {}, loader: true });

  // to fill data in datagrid and set clientName and other things

  useEffect(() => {
    if (!clientId) return;
    axios.get(`client/${clientId}`).then((res) => {
      setclient({ client: res.data.data, loader: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  if (!clientId) return <NoClientSelected />;

  return (
    <>
      <Container sx={{ width: '70%', m: 1, ml: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {client.loader ? (
            <Box sx={mainLoader}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ m: 1 }}>
              {/* Client Info ///////////////////////// */}

              <ClientInfo setclientId={(id) => setclientId(id)} client={client} />

              {/* Client Time ///////////////////////// */}
              <ClientTime clientId={clientId} />
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
