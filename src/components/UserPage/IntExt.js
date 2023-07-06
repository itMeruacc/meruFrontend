import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import { Typography, Box, Select, MenuItem, Icon } from '@mui/material';
import Switch from '@mui/material/Switch';
import SettingsIcon from '@mui/icons-material/Settings';

// ------------------------------------------------------------------

export default function IntExt({ setInternal }) {
  const ud = JSON.parse(localStorage.ud);
  const navigate = useNavigate();

  const [intColor, setintColor] = useState('black');

  const [timeZone, settimeZone] = React.useState(ud.accountInfo.timeZone ?? Intl.DateTimeFormat().resolvedOptions());

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 1 }}>
          <Typography variant="h6" sx={{ color: intColor }}>
            Show Interal Activites{' '}
          </Typography>
          <Switch
            onClick={(e) => {
              setInternal(e.target.checked);
              setintColor((prev) => (prev === 'black' ? 'primary.main' : 'black'));
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 1 }}>
          <Typography sx={{ mr: 1 }}>
            All times are GMT {timeZone}
            {/* {new Date(
              new Date().toLocaleString('en-US', {
                timeZone,
              })
            ).getTimezoneOffset()} */}
          </Typography>
          <Icon sx={{ mb: 1, cursor: 'pointer' }} onClick={() => navigate('/dashboard/profile')}>
            <SettingsIcon />
          </Icon>
        </Box>
      </Box>
    </>
  );
}
