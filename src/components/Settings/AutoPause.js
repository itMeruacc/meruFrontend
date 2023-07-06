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
  const [toggle, settoggle] = useState(false);
  const [take, settake] = useState(0);

  const handleTakeChange = (e) => {
    settake(e.target.value);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Switch onClick={() => settoggle(!toggle)} checked={toggle} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      {toggle && (
        <FormControl>
          <RadioGroup onChange={handleTakeChange} row name="takeScreenshots" value={take}>
            <FormControlLabel value={1} control={<Radio />} label="Take" />
            {/* no. of screenshots */}
            <FormControl variant="standard" disabled={!Number(take)} sx={{ mr: 3, minWidth: 40, width: 40 }}>
              <Select value={3} label="Age">
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
              {/* <FormHelperText>screenshots per hour</FormHelperText> */}
            </FormControl>

            <FormControlLabel value={0} control={<Radio />} label="Do not Take" />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default function AutoPause({ heading }) {
  // store
  const [take, settake] = useState(0);
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

  const handleTakeChange = (e) => {
    settake(e.target.value);
  };

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}
      <FormControl sx={{ mt: 2 }}>
        <RadioGroup onChange={handleTakeChange} row name="takeScreenshots" value={take}>
          <FormControlLabel value={1} control={<Radio />} label="Take" />
          {/* no. of screenshots */}
          <FormControl variant="standard" disabled={!Number(take)} sx={{ mr: 3, minWidth: 40, width: 40 }}>
            <Select value={3} label="Age">
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            {/* <FormHelperText>screenshots per hour</FormHelperText> */}
          </FormControl>

          <FormControlLabel value={0} control={<Radio />} label="Do not Take" />
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
