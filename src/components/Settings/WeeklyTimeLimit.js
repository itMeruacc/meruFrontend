// react and other poppular library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Box, Container, Divider, Switch, Typography, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

// components
import Header from './Header';
import IndividaulInfo from './IndividaulInfo';
import Option from './Option';
import SearchField from './SearchField';

function ToggleSettings({ user }) {
  const [toggle, settoggle] = useState(user.config.weeklyLimit !== null);
  const [limit, setlimit] = useState(0);
  const [hours, sethours] = useState(0);

  useEffect(() => {
    if (user.config.screensConfig) {
      setlimit(user.config.weeklyLimit !== 0 ? 1 : 0);
      sethours(user.config.weeklyLimit === 0 ? 0 : user.config.weeklyLimit);
    }
  }, []);

  const handleToggleChange = (e) => {
    settoggle(!toggle);
    let config;
    // if false
    if (toggle)
      config = {
        weeklyLimit: null,
      };
    else
      config = {
        weeklyLimit: 0,
      };
    axios
      .patch('admin/config', {
        employeeId: user._id,
        config,
      })
      .then((res) => console.log(res.data));
  };

  const handleLimitChange = (e) => {
    setlimit(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        weeklyLimit: hours,
      };
    else
      config = {
        weeklyLimit: 0,
      };

    axios
      .patch('admin/config', {
        employeeId: user._id,
        config,
      })
      .then((res) => console.log(res.data));
  };

  const min = 5;
  const max = 100;
  const handleHoursChange = (e) => {
    console.log(e.target.value);
    let value = parseInt(e.target.value, 10);
    if (value > max) value = max;
    if (value < min) value = min;
    sethours(value);
    axios
      .patch('admin/config', {
        employeeId: user._id,
        config: {
          weeklyLimit: value,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Switch onClick={handleToggleChange} checked={toggle} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      {toggle && (
        <FormControl>
          <RadioGroup onChange={handleLimitChange} row name="limitScreenshots" value={limit}>
            <FormControlLabel value={1} control={<Radio />} label="Limit to" />

            <FormControl variant="standard" disabled={!Number(limit)} sx={{ mr: 3, minWidth: 40, width: 120 }}>
              <TextField
                inputProps={{ min, max, step: 2 }}
                disabled={!Number(limit)}
                onChange={handleHoursChange}
                value={hours}
                type="number"
                helperText="hrs per week"
                variant="standard"
              />
            </FormControl>

            <FormControlLabel value={0} control={<Radio />} label="Do not limit" />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default function WeeklyTimeLimit({ heading, teamConfig }) {
  // store
  console.log(teamConfig);
  const [limit, setlimit] = useState(teamConfig.weeklyLimit === 0 ? 0 : 1);
  const [hours, sethours] = useState(teamConfig.weeklyLimit);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  useEffect(() => {
    axios.get('/employee/all').then((res) => {
      setusers(res.data.data);
      setfilteredUsers(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLimitChange = (e) => {
    setlimit(e.target.value);
    let config;
    if (e.target.value !== '0')
      config = {
        weeklyLimit: hours,
      };
    else
      config = {
        weeklyLimit: 0,
      };

    axios
      .patch('admin/config', {
        employeeId: null,
        config,
      })
      .then((res) => {
        console.log(res.data);
        const newUd = JSON.parse(localStorage.ud);
        newUd.teamConfig.weeklyLimit = config.weeklyLimit;
        localStorage.ud = JSON.stringify(newUd);
      });
  };

  const min = 5;
  const max = 100;
  const handleHoursChange = (e) => {
    console.log(e.target.value);
    let value = parseInt(e.target.value, 10);
    if (value > max) value = max;
    if (value < min) value = min;
    sethours(value);
    axios
      .patch('admin/config', {
        employeeId: null,
        config: {
          weeklyLimit: value,
        },
      })
      .then((res) => {
        console.log(res.data);
        const newUd = JSON.parse(localStorage.ud);
        newUd.teamConfig.weeklyLimit = value;
        localStorage.ud = JSON.stringify(newUd);
      });
  };

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

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}
      <FormControl sx={{ mt: 2 }}>
        <RadioGroup onChange={handleLimitChange} row name="limitScreenshots" value={limit}>
          <FormControlLabel value={1} control={<Radio />} label="Limit to" />
          <FormControl variant="standard" disabled={!Number(limit)} sx={{ mr: 3, minWidth: 40, width: 120 }}>
            <TextField
              inputProps={{ min, max, step: 2 }}
              disabled={!Number(limit)}
              onChange={handleHoursChange}
              value={hours}
              type="number"
              helperText="hrs per week"
              variant="standard"
            />
          </FormControl>

          <FormControlLabel value={0} control={<Radio />} label="Do not limit" />
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
