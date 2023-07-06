import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// --------------------------------------------------------------------

export default function SelectEmployees({ setclients }) {
  const ud = JSON.parse(localStorage.ud);

  const [options, setoptions] = React.useState([{ _id: null, name: 'Without client' }]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    axios
      .post('/report/options')
      .then((res) => {
        setoptions((prev) => [...prev, ...res.data.projectsClientsOptions[0].clients]);
        setclients([{ _id: null, name: 'Without client' }, ...res.data.projectsClientsOptions[0].clients]);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    ud.role !== 'employee' && (
      <Box sx={{ m: 2, ml: 0 }}>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => `${option.name}`}
          filterSelectedOptions
          onChange={(e, value) => {
            if (value.length !== 0) setclients(value);
            else setclients(options);
          }}
          renderInput={(params) => <TextField {...params} label="Select Clients" />}
        />
      </Box>
    )
  );
}
