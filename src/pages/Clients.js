// react components
import React, { useState } from 'react';

// material ui comppnents
import { Box, CssBaseline, Container } from '@mui/material';

// user components
import Sidebar from '../components/Clients/Sidebar';
import Main from '../components/Clients/Main';
import PageHeader from '../components/Projects/PageHeader';
import Page from '../components/Page';

// -------------------------------------------------------------------------------------------------------

// styles
const rootBox = {
  width: '95%',
  margin: 'auto',
};
const innerBox = {
  height: '78vh',
  width: '100%',
  display: 'flex',
  backgroundColor: '#fdfdff',
};

export default function Clients() {
  // store
  const [clientId, setclientId] = useState(null);

  return (
    <Page title="Clients">
      <Container>
        <Box sx={rootBox}>
          <CssBaseline />
          <PageHeader title="Clients" />
          <Box sx={innerBox}>
            {/* -------- sidebar components--------- */}
            <Sidebar setclientId={(id) => setclientId(id)} />
            <Main setclientId={(id) => setclientId(id)} clientId={clientId} />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
