import React, { useEffect, useState } from 'react';
import axios from 'axios';

// mui components
import { Box, Link, Divider, Switch, Typography, TextField } from '@mui/material';

// function ToggleMember({ user, project }) {
//   return (
//     <Box sx={{ mt: 2 }} key={user._id}>
//       <Box sx={{ display: 'flex' }}>
//         <Switch onChange={(e) => console.log(e.target.value)} defaultChecked={user._id in project.project.employees} />
//         <Typography variant="h5">{user.name}</Typography>
//       </Box>
//       <Divider dark />
//     </Box>
//   );
// }

export default function ProjectMembers({ project }) {
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

  function ToggleMember({ user }) {
    const [isMember, setisMember] = useState(project.project.employees.includes(user._id));

    const editMember = (e, employeeId) => {
      let editType = 'remove';
      if (e.target.checked) editType = 'add';
      // convert input text to lower case
      axios
        .patch(`project/members/${editType}/${project.project._id}`, { employeeId })
        .then((res) => {
          console.log(res);
          setisMember(!isMember);
        })
        .catch((error) => console.log(error));
    };

    return (
      <Box component="div" sx={{ mt: 2 }} key={user._id}>
        <Box sx={{ display: 'flex' }}>
          <Switch onClick={(e) => editMember(e, user._id)} checked={isMember} />
          <Typography variant="h5">{user.name}</Typography>
        </Box>
        <Divider dark />
      </Box>
    );
  }

  return (
    <Box sx={{}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, mb: 1 }}>
        <Box>
          <Typography variant="h4">Project Members</Typography>
          <Link underline="hover" sx={{ cursor: 'pointer', pr: 1 }}>
            Add all
          </Link>
          <Link underline="hover" sx={{ cursor: 'pointer', pr: 1 }}>
            Remove all
          </Link>
        </Box>
        <TextField
          sx={{ mt: 1 }}
          // InputProps={{
          //   endAdornment: <SearchIcon />,
          // }}
          onChange={handleSearch}
          label="Search"
        />
      </Box>
      <Box sx={{ maxHeight: '340px', overflow: 'auto' }}>
        {filteredUsers.map((user) => (
          <ToggleMember key={user._id} user={user} />
        ))}
      </Box>
    </Box>
  );
}
