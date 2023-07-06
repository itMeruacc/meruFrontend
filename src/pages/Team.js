// react libraries
import React, { useState } from 'react';

// mui libraries
import { Box, CssBaseline } from '@mui/material';

// own libraries
import PageHeader from '../components/Projects/PageHeader';
import Sidebar from '../components/Team/Sidebar';
import Main from '../components/Team/Main';
import NoTeamSelected from '../components/Team/NoTeamSelected';

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
  // backgroundColor: 'red',
};

const Team = () => {
  const [id, setId] = useState(null);
  return (
    <Box sx={rootBox}>
      <CssBaseline />
      <PageHeader title="Teams" />
      <Box sx={innerBox}>
        <Sidebar setTeamId={(id) => setId(id)} />
        {id === null ? <NoTeamSelected /> : <Main teamId={id} />}
      </Box>
    </Box>
  );
};

export default Team;
