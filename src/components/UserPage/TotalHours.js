// material
import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// helpers
import secondsToHms from '../../helpers/secondsToHms';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  margin: '5px 0 5px 0',
  width: '45%',
  padding: theme.spacing(4, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
}));

// ----------------------------------------------------------------------

export default function TotalHours({ Total }) {
  return (
    <RootStyle>
      <Typography variant="h3">{secondsToHms(Total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        TOTAL HOURS
      </Typography>
    </RootStyle>
  );
}
