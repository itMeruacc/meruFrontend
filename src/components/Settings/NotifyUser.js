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
  const [toggle, settoggle] = useState(user.config.disableScreenshotNotification !== null);
  const [notify, setnotify] = useState(0);

  useEffect(() => {
    if (user.config.disableScreenshotNotification !== null)
      setnotify(user.config.disableScreenshotNotification ? 1 : 0);
  }, []);

  const handleToggleChange = (e) => {
    settoggle(!toggle);
    console.log(toggle);
    let config;
    // if false
    if (toggle)
      config = {
        disableScreenshotNotification: null,
      };
    else
      config = {
        disableScreenshotNotification: false,
      };
    axios
      .patch('admin/config', {
        employeeId: user._id,
        config,
      })
      .then((res) => console.log(res.data));
  };

  const handlenotifyChange = (e) => {
    setnotify(e.target.value);
    console.log(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        disableScreenshotNotification: true,
      };
    else
      config = {
        disableScreenshotNotification: false,
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
          <RadioGroup onChange={handlenotifyChange} row name="notifyScreenshots" value={notify}>
            <FormControlLabel value={1} control={<Radio />} label="notify" />

            <FormControlLabel value={0} control={<Radio />} label="Do not notify" />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default function NotifyUser({ heading, teamConfig }) {
  // store
  console.log(teamConfig);
  const [notify, setnotify] = useState(!teamConfig.disableScreenshotNotification ? 0 : 1);
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

  const handlenotifyChange = (e) => {
    setnotify(e.target.value);
    console.log(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        disableScreenshotNotification: true,
      };
    else
      config = {
        disableScreenshotNotification: false,
      };

    axios
      .patch('admin/config', {
        employeeId: null,
        config,
      })
      .then((res) => {
        console.log(res.data);
        const newUd = JSON.parse(localStorage.ud);
        newUd.teamConfig.disableScreenshotNotification = config.disableScreenshotNotification;
        console.log(newUd.teamConfig.disableScreenshotNotification);
        localStorage.ud = JSON.stringify(newUd);
      });
  };

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}
      <FormControl sx={{ mt: 2 }}>
        <RadioGroup onChange={handlenotifyChange} row name="notifyScreenshots" value={notify}>
          <FormControlLabel value={1} control={<Radio />} label="notify" />

          <FormControlLabel value={0} control={<Radio />} label="Do not notify" />
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
