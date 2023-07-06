import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Tooltip, Button, Link, Typography, Container, CircularProgress, Paper, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import NoUserSelected from './NoUserSelected';
import ChangePayRate from './ChangePayRate';
import ChangeRole from './ChangeRole';
import UserSettings from './UserSettings';

// store
import useStore from '../../store/teamStore';

//---------------------------------------------------------------

// style
// const input = {
//   color: '#000',
//   width: 'fit-content',
//   maxWidth: '50%',
//   wordWrap: 'break-word',
//   height: '30px',
//   fontSize: '30px',
//   fontWeight: 'bold',
//   border: 'none',
//   background: '#fff',
//   transition: 'width 0.4s ease-in-out',
//   '& :focus': { width: '100%' },
// };
const mainLoader = {
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const input = {
  marginTop: '8px',
  color: '#000',
  width: 'fit-content',
  wordWrap: 'break-word',
  height: '35px',
  fontSize: '30px',
  fontWeight: 'bold',
  border: 'none',
  background: '#fff',
  transition: 'width 0.4s ease-in-out',
  '& :focus': { width: '100%' },
};

export default function Main({ userId }) {
  const [user, setuser] = useState({ user: {}, loader: true });

  // fetch the data
  useEffect(() => {
    if (!userId) return;
    axios.get(`employee/${userId}`).then((res) => {
      setuser({ user: res.data.data, loader: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!userId) return <NoUserSelected />;

  return (
    <>
      <Container sx={{ width: '70%', m: 1, ml: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {user.loader ? (
            <Box sx={mainLoader}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ m: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* User Name */}
                <Box style={input}>{`${user.user.firstName} ${user.user.lastName}`}</Box>
              </Box>
              {/* email */}
              <Typography sx={{ mt: 0.5 }}>{`${user.user.email}`}</Typography>
              <ChangePayRate user={user} />
              <Link href={`/dashboard/timeline/${user.user._id}`} underline="hover" color="secondary">
                View Timeline
              </Link>
              <ChangeRole user={user} />
              <UserSettings user={user} />
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
