// react and other poppular library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Box, Container, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

// components
import Header from './Header';

// -------------------------------------------------------------------

export default function WeekStart({ heading, teamConfig }) {
  // store

  const [day, setday] = useState(teamConfig.weekStartDay);

  const handleChange = (e) => {
    setday(e.target.value);

    axios.patch('admin/config', { config: { weekStartDay: e.target.value }, employeeId: null }).then((res) => {
      const newUd = JSON.parse(localStorage.ud);
      newUd.teamConfig.weekStartDay = e.target.value;
      console.log(newUd.teamConfig.weekStartDay);
      localStorage.ud = JSON.stringify(newUd);
    });
  };

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={day} onChange={handleChange}>
          <MenuItem value={0}>Sunday</MenuItem>
          <MenuItem value={1}>Monday</MenuItem>
          <MenuItem value={2}>Tuesday</MenuItem>
          <MenuItem value={3}>Wednesday</MenuItem>
          <MenuItem value={4}>Thursday</MenuItem>
          <MenuItem value={5}>Friday</MenuItem>
          <MenuItem value={6}>Saturday</MenuItem>
        </Select>
        <FormHelperText>Select Day</FormHelperText>
      </FormControl>

      {/* to show individual information title */}
      {/* <Container sx={{ mt: 4 }} disableGutters>
        <Typography variant="h6">Individual Settings</Typography>
        <Typography>There can be only one setting for all users in your company</Typography>
      </Container> */}
    </Box>
  );
}
