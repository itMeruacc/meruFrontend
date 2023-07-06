import React from 'react';

// mui
import { Container, Typography } from '@mui/material';

export default function Header({ title, desc }) {
  return (
    <Container disableGutters>
      <Typography variant="h3">{title}</Typography>
      <Typography sx={{ backgroundColor: '#C8DCFD', px: 1, py: 2 }}>{desc}</Typography>
    </Container>
  );
}
