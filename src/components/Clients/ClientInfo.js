// react components
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// mui library
import { Box } from '@mui/system';
import { Typography, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// own components

// store
import useStore from '../../store/clientStore';

// ------------------------------------------------------------------

// styles
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

export default function ClientInfo({ client, setclientId }) {
  // store
  const setClients = useStore((state) => state.setClients);
  const [name, setName] = useState(client.client.name);
  const [deleteOpen, setdeleteOpen] = useState(false);

  // to make the form focused
  const inputRef = useRef();
  // edit name, refresh clients in sidebar and change local state of name
  const handleEditSubmit = (e) => {
    try {
      e.preventDefault();
      axios.patch(`/client/${client.client._id}`, { name }).then((res) => {
        console.log(res);
        axios.get(`/client`).then((res) => {
          setClients(res.data.data, false);
          inputRef.current.blur();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setName(client.client.name);
  }, [client]);

  // del client, set clientId to null, refresh sidebar clients(store)
  const handleDelete = () => {
    try {
      axios.delete(`/client/${client.client._id}`).then((res) => {
        console.log(res);
        axios.get(`/client`).then((res) => {
          setClients(res.data.data, false);
        });
        setclientId(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    const regex = /^[A-Za-z]+$/;
    if (regex.test(inputValue) || inputValue === '') {
      setName(inputValue);
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Client Name components */}
          <form
            // onBlur={(e) => {
            //   handleEditSubmit(e);
            // }}
            onSubmit={handleEditSubmit}
            style={{ display: 'inline' }}
          >
            <input
              minLength={4}
              maxLength={10}
              ref={inputRef}
              onChange={(e) => handleNameChange(e)}
              type="text"
              style={input}
              value={name}
            />
          </form>

          {/* edit and del buttons */}
          <Box>
            <Tooltip title="Edit Client">
              <Button>
                <EditIcon
                  onClick={() => {
                    inputRef.current.focus();
                  }}
                  color="action"
                />
              </Button>
            </Tooltip>
            <Tooltip onClick={() => setdeleteOpen(true)} title="Delete Client">
              <Button>
                <DeleteIcon color="action" />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {/* ------------------------------ heading and delete tags ------------------------------------------------------------------------*/}
      <Typography sx={{ marginTop: 2, fontWeight: 'bold' }}>
        <Link to="/dashboard/projects" style={{ textDecoration: 'none', color: 'green' }}>
          Assign Projects
        </Link>
      </Typography>

      {/* ----------------------------------------------- Create date and creator name -------------------------------------------------------- */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Box>
          <Typography variant="h6">Created On: {dayjs(client.client.createdAt).format('DD/MM/YYYY')}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Created By: {client.client.createdBy.name}</Typography>
        </Box>
      </Box>

      {/* delete confirmation dialog */}

      <Dialog open={deleteOpen} onClose={() => setdeleteOpen(false)}>
        <DialogTitle id="responsive-dialog-title">{'Delete Confirmation'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please confirm to delete the client, this cannot be reversed.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setdeleteOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
