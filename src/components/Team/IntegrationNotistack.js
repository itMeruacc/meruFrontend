// react and other library
import React, { useState, useEffect } from 'react';

// mui components
import Slide from '@mui/material/Slide';
import { Alert, Snackbar } from '@mui/material';

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default function IntergrationNotistack({ message, status }) {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if(message)
    setOpen(true);
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert severity={status} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
