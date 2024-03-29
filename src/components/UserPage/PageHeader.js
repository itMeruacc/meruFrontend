import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Autocomplete, TextField } from '@mui/material';

export default function PageHeader(props) {
  return (
    <Box sx={{ pb: 5 }}>
      <Typography variant="h2" sx={{ opacity: 0.6 }}>
        {props.title}
      </Typography>
    </Box>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
};
