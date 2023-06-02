import React, { useState } from 'react';
import axios from 'axios';

// mui components
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components

// store
import useStore from '../../store/projectStore';

//-------------------------------------------------------------------------------------------------------------------

// store

export default function AddProject() {
  // store
  // to call and set clients again when new added
  const setClients = useStore((state) => state.setClients);
  const [value, setvalue] = useState('');
  const [helperText, sethelperText] = useState('');
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = value.trim();
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      sethelperText('Enter a name for the project');    
      seterror(true);
      setvalue('');
    } else {
      setloading(true);
      // call api here
      try {
        axios.post(`/project`, { name: inputValue }).then((res) => {
          setloading(false);
          setvalue('');
          if (res.status === 201) {
            axios.get(`/project/byClients`).then((res) => {
              setClients(res.data.data, false);
            });
          }
        });
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{ m: 1 }}
      onBlur={() => {
        seterror(false);
        sethelperText('');
      }}
    >
      <TextField
        error={error}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        helperText={helperText}
        required
        fullWidth
        label="Add new project"
      />
      <LoadingButton
        fullWidth
        type="submit"
        loading={loading}
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleSubmit}
      >
        Add Project
      </LoadingButton>
    </Box>
  );
}
