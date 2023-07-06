import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Paper } from '@mui/material';
import Main from '../components/Reports/Main';
import PageHeader from '../components/Reports/PageHeader';
import Page from '../components/Page';

export default function Reports() {
  return (
    <>
      <Page title="Reports">
        <Container>
          <CssBaseline />
          <PageHeader title="Reports" />
          <Paper elevation={3} sx={{ height: '100%', width: '100%' }}>
            <Main />
          </Paper>
        </Container>
      </Page>
    </>
  );
}
