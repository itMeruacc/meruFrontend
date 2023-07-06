import React, { useEffect, useState } from 'react';
import axios from 'axios';

// mui
import { Radio, Box, Typography, TextField, Divider, Switch } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// -----------------------------------------------------------------

export default function ChangeRole({ user }) {
  const [value, setvalue] = React.useState(user.user.role);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  // get list of all users
  useEffect(() => {
    axios.get('/employee/all').then((res) => {
      setusers(res.data.data);
      setfilteredUsers(res.data.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setvalue(user.user.role);
  }, [user]);

  const handleRadioChange = (event) => {
    // call api before local change
    axios.patch(`/employee/edit/${user.user._id}`, { role: event.target.value }).then((res) => {
      setvalue(event.target.value);
    });
    // local change
  };

  // toggle member for manager
  function ToggleMember({ employee, user }) {
    const [isMember, setisMember] = useState(user.user.managerFor.includes(employee._id));

    const editMember = (e, employeeId) => {
      let assign = false;
      if (e.target.checked) assign = true;
      // convert input text to lower case
      axios
        .patch(`employee/manager/${user.user._id}`, { employeeId, assign })
        .then((res) => {
          console.log(res);
          setisMember(!isMember);
        })
        .catch((error) => console.log(error));
    };

    return (
      <Box component="div" sx={{ mt: 2, overflowY: 'auto' }} key={user._id}>
        <Box sx={{ display: 'flex' }}>
          <Switch
            checked={isMember}
            onClick={(e) => {
              editMember(e, employee._id);
            }}
          />
          <Typography variant="h5">{employee.name}</Typography>
        </Box>
        <Divider dark />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }} component="div">
      <FormControl>
        <FormLabel sx={{ typography: 'h5', mt: 2 }}>Role</FormLabel>
        <RadioGroup onChange={handleRadioChange} value={value} name="role">
          <FormControlLabel value="employee" control={<Radio />} label="Employee" />
          <FormControlLabel value="projectLeader" control={<Radio />} label="Project Leader" />
          <FormControlLabel value="manager" control={<Radio />} label="Manager" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </FormControl>

      {value === 'manager' && (
        <Box>
          <Box sx={{ overflow: 'auto', display: 'flex' }}>
            <Typography variant="h5">Manager for</Typography>
            {/* <TextField
              // InputProps={{
              //   endAdornment: <SearchIcon />,
              // }}
              // onChange={handleSearch}
              label="Search"
            /> */}
          </Box>
          {users.map((employee) => (
            <Box sx={{ mt: 2 }} key={employee._id}>
              <ToggleMember user={user} key={employee._id} employee={employee} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
