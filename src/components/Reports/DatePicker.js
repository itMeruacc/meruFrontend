import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Typography } from '@mui/material';

// style
const typoStyle = {
  m: 1,
  opacity: 0.6,
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default function DatePicker({ setdate }) {
  const [value, setvalue] = useState([dayjs(), dayjs()]);
  const [range, setrange] = useState('Custom');

  // send the changed date back to main whenever value is chcanged
  React.useEffect(() => {
    setdate(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs(), dayjs().add(1, 'day')]);
            setrange('Today');
          }}
        >
          Today
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('week'), dayjs()]);
            setrange('This week');
          }}
        >
          This week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('month'), dayjs()]);
            setrange('This month');
          }}
        >
          This month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('year'), dayjs()]);
            setrange('This year');
          }}
        >
          This year
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().add(-1, 'day'), dayjs()]);
            setrange('Yesterday');
          }}
        >
          Yesterday
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('week').subtract(1, 'week'), dayjs().endOf('week').subtract(1, 'week')]);
            setrange('Last week');
          }}
        >
          Last week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('month').subtract(1, 'month'), dayjs().endOf('month').subtract(1, 'month')]);
            setrange('Last month');
          }}
        >
          Last month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('year').subtract(1, 'year'), dayjs().endOf('year').subtract(1, 'year')]);
            setrange('Last year');
          }}
        >
          Last year
        </Typography>
      </Box>
      {/* date one */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="From"
          value={value[0]}
          maxDate={value[1] ? value[1] : dayjs('2023-12-01')}
          onChange={(newValue) => {
            setvalue((prev) => [newValue, prev[1]]);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        {/* date two */}
        <DesktopDatePicker
          label="To"
          value={value[1]}
          minDate={value[0] ? value[0] : dayjs('2021-12-01')}
          onChange={(newValue) => {
            setvalue((prev) => [prev[0], newValue]);
          }}
          renderInput={(params) => <TextField sx={{ ml: 1 }} {...params} />}
        />
      </LocalizationProvider>

      <Typography sx={{ ml: 0.5, mb: 3, mt: 0.5 }} variant="subtitle2">
        ({range})
      </Typography>
    </>
  );
}
