/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Typography, CircularProgress, Box, TextField } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/system';

// store
import useStore from '../../store/teamStore';

//-------------------------------------------------------------------------------------------------------------------

// styles
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const listBoxLoader = {
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Sidebar({ setuserId }) {
  // store
  // original users from the store and its set fn
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);
  // filtered after handlesearch
  const [filteredData, setfilteredData] = useState([]);

  // fetch the data
  useEffect(() => {
    axios.get(`/employee/all`).then((res) => {
      if (res.status === 200) {
        setUsers(res.data.data, false);
        setfilteredData(res.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // setfiltereddata every time users changes
  useEffect(() => {
    setfilteredData(users.users);
    console.log(users.users.filter((user) => user._id === null));
  }, [users]);

  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = users.users.filter((user) => {
      // if no input the return the original
      if (lowerCase === '') {
        setfilteredData(user);
        return user;
      }
      // return the item which contains the user input
      return user.name ? user.name.toLowerCase().includes(lowerCase) : user.name;
    });
    setfilteredData(data);
  };

  return (
    <>
      <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {/* search component */}
          <Box sx={{ m: 1 }}>
            <TextField
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              onChange={handleSearch}
              label="Search"
              fullWidth
            />
          </Box>

          {/* -------------------------------------------------------------TreeView component -------------------------------------------------------------------------------- */}
          {users.loader ? (
            <CircularProgress sx={listBoxLoader} />
          ) : (
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                alignItems: 'flex-start',
                overflowY: 'auto',
              }}
            >
              <TreeView
                aria-label="Clients Treeview"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                {filteredData.length ? (
                  filteredData.map((user) => (
                    <TreeItem
                      onClick={() => setuserId(user._id)}
                      nodeId={(user._id ? user._id : 1).toString()}
                      label={
                        <Typography
                          sx={{
                            color: '#637381',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                          }}
                        >
                          {user._id ? user.name : 'No Client'}
                        </Typography>
                      }
                      key={user._id}
                    />
                  ))
                ) : (
                  <Typography sx={{ mt: '25vh', textAlign: 'center' }}>No Clients</Typography>
                )}
              </TreeView>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
