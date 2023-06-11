import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// mui
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import { Paper } from '@mui/material';

// styles
const container = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  border: `1px solid #919EAB`,
  alignItems: 'center',
};

const cell = {
  fontSize: '0.8rem',
  margin: '0',
  flexGrow: '1',
  fontWeight: 'bold',
  padding: '0.6rem',
  textAlign: 'center',
  paddingTop: '0.2rem',
  paddingBottom: '1rem',
  position: 'relative',
  borderWidth: '0 1px 0 0',
  borderStyle: 'solid',
  borderColor: '#919EAB',
  '&:firstChild': {
    borderRadius: '5px 0 0 5px',
  },
  '&:lastChild': {
    borderStyle: 'none',
    borderRadius: '0 5px 5px 0',
  },
};

export default function Timeline({ activities, date }) {
  const ud = JSON.parse(localStorage.ud ?? '{}');
  const timeZone = ud.accountInfo.timeZone ?? Intl.DateTimeFormat().resolvedOptions();

  const [workTimes, setWorkTimes] = useState();

  useEffect(() => {
    const arr = [];

    // get date filtered acts by day
    const filteredActs = activities.filter((act) => {
      const date1 = new Date(act.activityOn);
      return dayjs(date1).isSame(date, 'day');
    });

    filteredActs?.forEach((act) => {
      const dateObj = new Date(
        new Date(act.startTime * 1000).toLocaleString('en-US', {
          timeZone,
        })
      );
      // const dateObj = new Date(act.startTime * 1000);
      const hrs = dateObj.getHours();
      const mins = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();
      const endDateObj = new Date(
        new Date(act.endTime * 1000).toLocaleString('en-US', {
          timeZone,
        })
      );
      // const endDateObj = new Date(act.endTime * 1000);
      const endHrs = endDateObj.getHours();
      const endMins = endDateObj.getMinutes();
      const endSeconds = endDateObj.getSeconds();
      if (hrs === endHrs) {
        arr.push({
          hr: hrs,
          length: ((endMins - mins) / 60 + (60 - seconds + endSeconds) / 3600) * 100,
          startGap: (mins / 60 + seconds / 3600) * 100,
        });
      } else {
        arr.push({
          hr: hrs,
          length: ((60 - mins) / 60 + (60 - seconds) / 3600) * 100,
          startGap: (mins / 60 + seconds / 3600) * 100,
        });
        arr.push({
          hr: endHrs,
          length: (endMins / 60 + endSeconds / 3600) * 100,
          startGap: 0,
        });
      }
    });
    setWorkTimes(arr);
  }, [activities, date]);

  const row = [];

  for (let i = 0; i < 24; i += 1) {
    row.push(
      <div style={cell} key={i}>
        {i !== 0 ? `${i < 12 ? `${i} AM` : `${i === 12 ? 12 : i - 12} PM`}` : `${i + 12} AM`}
        {workTimes &&
          workTimes
            .filter((el) => el.hr === i)
            .map((el, index) => (
              <Box
                key={index}
                sx={{
                  width: `${el.length}%`,
                  height: '100%',
                  backgroundColor: 'primary.light',
                  opacity: '0.5',
                  position: 'absolute',
                  bottom: '0',
                  left: `${el.startGap}%`,
                }}
              />
            ))}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', padding: '20px' }}>
      <TableContainer component={Paper} style={container} elevation={3}>
        {row.map((e) => e)}
      </TableContainer>
    </Box>
  );
}
