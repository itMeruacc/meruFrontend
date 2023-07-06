import React, { useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
// import { makeStyles } from "@mui/styles";

// components
import Sidebar from '../components/Projects/Sidebar';
import Main from '../components/Projects/Main';
import PageHeader from '../components/Projects/PageHeader';
import Page from '../components/Page';

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
export default function Projects() {
  const [projectId, setprojectId] = useState(null);

  return (
    <Page title="Projects">
      <Container>
        <Box component="div" sx={rootBox}>
          <CssBaseline />
          <PageHeader title="Projects" />
          <Box sx={innerBox}>
            {/* -------- sidebar components--------- */}
            <Sidebar setprojectId={(id) => setprojectId(id)} />
            <Main projectId={projectId} setprojectId={(id) => setprojectId(id)} />
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
