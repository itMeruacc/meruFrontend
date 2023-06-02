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

// components
import AddClient from './AddClient';

// store
import useStore from '../../store/clientStore';

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

export default function Sidebar({ setclientId }) {
  // store
  // original clients from the store and its set fn
  const clients = useStore((state) => state.clients);
  const setClients = useStore((state) => state.setClients);
  // filtered after handlesearch
  const [filteredData, setfilteredData] = useState([]);
  const [noClientMessage, setnoClientMessage] = useState('No Clients');

  // fetch the data
  useEffect(() => {
    axios.get(`/client`).then((res) => {
      if (res.status === 200) {
        setClients(res.data.data, false);
        setfilteredData(res.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // setfiltereddata every time clients changes
  useEffect(() => {
    setfilteredData(clients.clients);
  }, [clients]);

  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    if (lowerCase === '') {
      setnoClientMessage('No Clients');
    }

    const data = clients.clients.filter((client) => {
      // if no input the return the original
      if (lowerCase === '') {
        setfilteredData(client);
        return client;
      }
      // return the item which contains the user input
      return client.name ? client.name.toLowerCase().includes(lowerCase) : client.name;
    });
    setfilteredData(data);
    if (filteredData.length === 0 && lowerCase !== '') setnoClientMessage('Please enter valid data/Client name');
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
          {clients.loader ? (
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
                  filteredData.map((client) => (
                    <TreeItem
                      onClick={() => setclientId(client._id)}
                      nodeId={(client._id ? client._id : 1).toString()}
                      label={
                        <Typography
                          sx={{
                            color: '#637381',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                          }}
                        >
                          {client._id ? client.name : 'No Client'}
                        </Typography>
                      }
                      key={client._id}
                    />
                  ))
                ) : (
                  <Typography sx={{ mt: '25vh', textAlign: 'center' }}>{noClientMessage}</Typography>
                )}
              </TreeView>
            </Box>
          )}
          {/* Add Client */}
          <AddClient />
        </Paper>
      </Container>
    </>
  );
}
