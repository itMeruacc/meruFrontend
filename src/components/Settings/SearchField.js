import React, { useState } from 'react';

import { Autocomplete, TextField, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function SearchField({callback}) {
  const [userName, setUserName] = useState([...names]);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    callback(newValue)
  };

  return (
      <Autocomplete
      multiple
      limitTags={3}
      id="multiple-limit-tags"
      onChange={handleChange} 
      options={userName}
      disableCloseOnSelect
      size='medium'
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Users" placeholder="Users"/>
      )}
      sx={{my:2}}
    />
  );
}
