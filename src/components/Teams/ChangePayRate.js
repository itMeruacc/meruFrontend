import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

// mui
import { Box } from '@mui/material';

// ------------------------------------------------------------------

// styles
const input = {
  marginTop: '8px',
  color: '#000',
  width: 'fit-content',
  wordWrap: 'break-word',
  height: '25px',
  fontSize: '18px',
  fontWeight: 'bold',
  border: 'none',
  background: '#fff',
  transition: 'width 0.4s ease-in-out',
  '& :focus': { maxWidth: '1px' },
};

export default function ChangePayRate({ user }) {
  const [payRate, setpayRate] = useState(user.user.payRate);

  useEffect(() => {
    setpayRate(user.user.payRate);
  }, [user]);

  // to make the form focused
  const inputRef = useRef();

  // edit name, refresh users in sidebar and change local state of name
  const handleEditSubmit = (e) => {
    try {
      e.preventDefault();
      axios.patch(`/employee/edit/${user.user._id}`, { payRate }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <form
        onBlur={(e) => {
          handleEditSubmit(e);
          inputRef.current.blur();
        }}
        onSubmit={handleEditSubmit}
        style={{ display: 'inline' }}
      >
        <input ref={inputRef} onChange={(e) => setpayRate(e.target.value)} type="text" style={input} value={payRate} />
      </form>
    </Box>
  );
}
