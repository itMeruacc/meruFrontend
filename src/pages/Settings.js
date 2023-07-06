// react and other popular library
import React, { useState } from 'react';

// mui library
import { Container } from '@mui/system';
import { Box, CssBaseline } from '@mui/material';

// own components
import Page from '../components/Page';
import Sidebar from '../components/Settings/Sidebar';
import PageHeader from '../components/Projects/PageHeader';

// styles
const rootBox = {
  width: '95%',
  margin: 'auto',
};
const innerBox = {
  height: '78vh',
  width: '100%',
  backgroundColor: '#fdfdff',
};

export default function Settings() {
  // store
  return (
    <Page title="Settings">
      <Container>
        <Box component="div" style={rootBox}>
          <PageHeader title="Settings" />
          {/* -------- sidebar components--------- */}
          <Sidebar />
        </Box>
      </Container>
    </Page>
  );
}

// team

// {
//   "autoPauseMinutes": 2,
//   "screensConfig": {
//       "screenshotsPerHour": 6,
//       "blurScreens": 0
//   },
//   "disableOfflineTime": true,
//   "disableScreenshotNotification": false,
//   "disableActivityLevel": false,
//   "currency": "Rs.",
//   "weeklyLimit": 50,
//   "weekStartDay": 1,
//   "disableAppTracking": false,
//   "dateFormat": null
// }

// individual

// {
//   "autoPauseMinutes": null,
//   "screensConfig": null,
//   "disableOfflineTime": true,
//   "disableScreenshotNotification": null,
//   "disableActivityLevel": false,
//   "currency": "Rs.",
//   "weeklyLimit": null,
//   "weekStartDay": null,
//   "disableAppTracking": null,
//   "dateFormat": null
// }
