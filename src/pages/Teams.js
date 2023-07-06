// react components
import React, { useState } from 'react';

// material ui comppnents
import { Box, CssBaseline, Container } from '@mui/material';

// user components
import Sidebar from '../components/Teams/Sidebar';
import Main from '../components/Teams/Main';
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

export default function Teams() {
  // store
  const [userId, setuserId] = useState(null);

  return (
    <Page title="Teams">
      <Container>
        <Box sx={rootBox}>
          <CssBaseline />
          <PageHeader title="Teams" />
          <Box sx={innerBox}>
            {/* -------- sidebar components--------- */}
            <Sidebar setuserId={(id) => setuserId(id)} />
            <Main setuserId={(id) => setuserId(id)} userId={userId} />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
