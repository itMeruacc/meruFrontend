import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// ------------------------------------------------------------------

export default function SelectEmployees({ setprojects }) {
  const [options, setoptions] = React.useState([{ _id: null, name: 'Without project' }]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    axios
      .post('/report/options')
      .then((res) => {
        setoptions((prev) => [...prev, ...res.data.projectsClientsOptions[0].projects]);
        setprojects([{ _id: null, name: 'Without project' }, ...res.data.projectsClientsOptions[0].projects]);
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
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        multiple
        options={options}
        // getOptionLabel={(option) => `${option.name} ** ${option.client?.name ?? 'No Client'} `}
        getOptionLabel={(option) => `${option.name}`}
        filterSelectedOptions
        onChange={(e, value) => {
          if (value.length !== 0) setprojects(value);
          else setprojects(options);
          console.log(value);
          console.log(options);
        }}
        renderInput={(params) => <TextField {...params} label="Select Projects" />}
      />
    </Box>
  );
}
