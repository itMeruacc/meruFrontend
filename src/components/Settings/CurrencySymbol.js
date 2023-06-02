// react and other poppular library
import React, { useState } from 'react';
import axios from 'axios';

// mui components
import { Box, Container, Typography, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// components
import Header from './Header';

// -------------------------------------------------------------------

export default function CurrencySymbol({ heading, teamConfig }) {
  // store
  const [currency, setcurrency] = useState(teamConfig.currency);

  const handleChange = (e) => {
    setcurrency(e.target.value);

    axios.patch('admin/config', { config: { currency: e.target.value }, employeeId: null }).then((res) => {
      const newUd = JSON.parse(localStorage.ud);
      newUd.teamConfig.currency = e.target.value;
      console.log(newUd.teamConfig.currency);
      localStorage.ud = JSON.stringify(newUd);
    });
  };

  return (
    <Box>
      {/* Heading */}
      <Header title={heading.title} desc={heading.desc} />

      {/* Team settings handler */}

      <FormControl sx={{ m: 1, maxWidth: 80 }}>
        <TextField
          inputProps={{ maxLength: 3 }}
          sx={{ widht: 20 }}
          value={currency}
          onChange={handleChange}
          label="Currency"
          variant="outlined"
        />
        <FormHelperText>Enter currency</FormHelperText>
      </FormControl>

      {/* to show individual information title */}
      {/* <Container sx={{ mt: 4 }} disableGutters>
        <Typography variant="h6">Individual Settings</Typography>
        <Typography>There can be only one setting for all users in your company</Typography>
      </Container> */}
    </Box>
  );
}
