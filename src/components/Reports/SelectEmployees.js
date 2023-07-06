import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// -----------------------------------------------------------------

export default function SelectEmployees({ setemployees }) {
  const ud = JSON.parse(localStorage.ud);
  console.log(ud);
  const [options, setoptions] = React.useState([]);

  // get options for selection
  React.useEffect(() => {
    const source = axios.CancelToken.source();
    if (ud.role !== 'employee') {
      // get activities of current month on mount
      axios
        .post('/report/options')
        .then((res) => {
          // setoptions(res.data.projectsClientsOptions[0].members);
          setoptions(res.data.employeesOptions[0].members);
          setemployees(res.data.employeesOptions[0].members);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Axios request aborted.');
          } else {
            console.error(err);
          }
        });
    } else
      setemployees([
        {
          _id: ud._id,
          firstName: ud.firstName,
          lastName: ud.lastName,
        },
      ]);

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        disabled={ud.role === 'employee'}
        multiple
        defaultValue={
          ud.role === 'employee'
            ? [
                {
                  _id: ud._id,
                  firstName: ud.firstName,
                  lastName: ud.lastName,
                },
              ]
            : []
        }
        options={options}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        filterSelectedOptions
        onChange={(e, value) => {
          console.log(value);
          if (value.length !== 0) setemployees(value);
          else setemployees(options);
          console.log(options);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Employees"
            // placeholder="Select Employees"
          />
        )}
      />
    </Box>
  );
}
