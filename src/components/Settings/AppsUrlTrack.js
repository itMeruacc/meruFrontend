// react and other poppular library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Box, Container, Divider, Switch, Typography, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// components
import Header from './Header';

// ---------------------------------------------------------------

function ToggleSettings({ user }) {
  console.log(user.config);
  const [toggle, settoggle] = useState(user.config.disableAppTracking !== null);
  const [track, settrack] = useState(0);

  useEffect(() => {
    if (user.config.disableAppTracking !== null) settrack(user.config.disableAppTracking ? 1 : 0);
  }, []);

  const handleToggleChange = (e) => {
    settoggle(!toggle);
    console.log(toggle);
    let config;
    // if false
    if (toggle)
      config = {
        disableAppTracking: null,
      };
    else
      config = {
        disableAppTracking: false,
      };
    axios
      .patch('admin/config', {
        employeeId: user._id,
        config,
      })
      .then((res) => console.log(res.data));
  };

  const handleTrackChange = (e) => {
    settrack(e.target.value);
    console.log(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        disableAppTracking: true,
      };
    else
      config = {
        disableAppTracking: false,
      };

    axios
      .patch('admin/config', {
        employeeId: user._id,
        config,
      })
      .then((res) => console.log(res.data));
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Switch onClick={handleToggleChange} checked={toggle} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      {toggle && (
        <FormControl>
          <RadioGroup onChange={handleTrackChange} row name="trackScreenshots" value={track}>
            <FormControlLabel value={1} control={<Radio />} label="Track" />

            <FormControlLabel value={0} control={<Radio />} label="Do not track" />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default function AppsUrlTrack({ heading, teamConfig }) {
  // store
  console.log(teamConfig);
  const [track, settrack] = useState(!teamConfig.disableAppTracking ? 0 : 1);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  useEffect(() => {
    axios.get('/employee/all').then((res) => {
      setusers(res.data.data);
      setfilteredUsers(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = users.filter((user) => {
      // if no input the return the original
      if (lowerCase === '') {
        setfilteredUsers(users);
        return user;
      }
      // return the item which contains the user input
      return user.name.toLowerCase().includes(lowerCase);
    });
    setfilteredUsers(data);
  };

  const handleTrackChange = (e) => {
    settrack(e.target.value);
    console.log(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        disableAppTracking: true,
      };
    else
      config = {
        disableAppTracking: false,
      };

    axios
      .patch('admin/config', {
        employeeId: null,
        config,
      })
      .then((res) => {
        console.log(res.data);
        const newUd = JSON.parse(localStorage.ud);
        newUd.teamConfig.disableAppTracking = config.disableAppTracking;
        console.log(newUd.teamConfig.disableAppTracking);
        localStorage.ud = JSON.stringify(newUd);
      });
  };

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}
      <FormControl sx={{ mt: 2 }}>
        <RadioGroup onChange={handleTrackChange} row name="trackScreenshots" value={track}>
          <FormControlLabel value={1} control={<Radio />} label="Track" />

          <FormControlLabel value={0} control={<Radio />} label="Do not track" />
        </RadioGroup>
      </FormControl>

      {/* search component */}
      <Box sx={{ mt: 5, mb: 1 }}>
        <TextField
          // InputProps={{
          //   endAdornment: <SearchIcon />,
          // }}
          onChange={handleSearch}
          label="Search"
        />
      </Box>

      {/* to show individual information title */}
      <Container disableGutters>
        <Typography variant="h6">Individual Settings</Typography>
        <Typography>If enabled, individual settings will be used instead of the team Settings</Typography>
      </Container>

      {filteredUsers.map((user) => (
        <Box sx={{ mt: 2 }} key={user._id}>
          <ToggleSettings user={user} />
          <Divider dark />
        </Box>
      ))}
    </Box>
  );
}
