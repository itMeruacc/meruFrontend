import React, { useState, useEffect } from 'react';

// mui components
import { TextField, Modal, Autocomplete, Typography, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// ---------------------------------------------------------

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeProjectLeader({ project }) {
  const [projectLeader, setprojectLeader] = useState(null);
  const [userOptions, setuserOptions] = useState([]);
  const [open, setopen] = useState(false);

  // change the local pLeader state every time project changes
  useEffect(() => {
    setprojectLeader(() => (project.project.projectLeader._id ? project.project.projectLeader : null));
  }, [project]);

  // everytime modal opens fetch the list
  useEffect(() => {
    axios.get(`/employee/all`).then((res) => {
      if (res.status === 200) {
        setuserOptions(res.data.data);
      }
    });
  }, [open]);

  // to set projectLeader to null, no need to call api again
  // because single state(managable locally)
  const handleDelete = () => {
    axios.patch(`project/${project.project._id}/pLeader`, { projectLeader: null }).then((res) => {
      if (res.status === 200) {
        setprojectLeader(null);
      }
    });
  };

  // edit projectLeader
  const handleChange = (e, value) => {
    axios.patch(`project/${project.project._id}/pLeader`, { projectLeader: value._id }).then((res) => {
      if (res.status === 200) {
        setprojectLeader(value);
      }
    });
    setopen(false);
  };

  return (
    <Box>
      <TextField
        InputProps={{
          endAdornment: (
            <>
              <EditIcon sx={{ cursor: 'pointer' }} onClick={() => setopen(true)} />
              <DeleteIcon onClick={handleDelete} sx={{ cursor: 'pointer', ml: 1 }} />
            </>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        sx={{ m: 1 }}
        disabled
        id="standard-required"
        label="Project Leader"
        value={projectLeader ? projectLeader.name : 'No Project Leader'}
        variant="standard"
      />

      {/* modal */}
      <Modal
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Change Project Leader
          </Typography>
          <Autocomplete
            disablePortal
            options={userOptions}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleChange(e, value)}
            sx={{ width: 300, mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Project Leader" />}
          />
        </Box>
      </Modal>
    </Box>
  );
}
