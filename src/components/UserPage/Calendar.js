import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Button, Box } from '@mui/material/';

import dayjs from 'dayjs';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ date, setdate, activities }) {
  const ud = JSON.parse(localStorage.ud);
  const weekStartday = ud.teamConfig.weekStartDay;
  const [value, setvalue] = useState(date.getDate());
  const [progressValues, setprogressValues] = useState([...Array(dayjs(date).daysInMonth())].fill(0));

  // just to bring the date back to first day
  useEffect(() => {
    // const arr = [...Array(dayjs(date).daysInMonth())].fill(0);
    setvalue(date.getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // to calculate only on act change(called when month changes)
  useEffect(() => {
    const arr = [...Array(dayjs(date).daysInMonth() + 1)].fill(0);
    activities.forEach((act) => {
      arr[new Date(act.activityOn).getDate()] += act.consumeTime;
    });
    console.log(arr);
    setprogressValues(arr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  const handleClick = (key) => {
    console.log(key);
    setvalue(Number(key));
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth(), Number(key)));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          minWidth: 400,
          borderRight: '0.5px solid black',
        }}

        // divider={<Divider orientation="vertical" flexItem />}
      >
        {[...Array(dayjs(date).daysInMonth())].map((element, index) => {
          const key = index + 1;
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = new Date(year, month, index + 1).getDay();

          return (
            <Box
              key={key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderLeft: day === weekStartday ? '3px solid black' : '0.5px solid black',
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  border: '0.5px solid black',
                  borderLeft: 0,
                  borderRight: 0,
                }}
                variant="subtitle2"
                align="center"
              >
                {days[day]}
              </Typography>
              <Box
                sx={{
                  cursor: 'pointer',
                  padding: ' 25% 0',
                  textAlign: 'center',
                  height: 40,
                  backgroundColor: key === value && 'primary.light',
                }}
                value={key}
                onClick={() => {
                  handleClick(key);
                }}
                vlaue={element}
                aria-label="left aligned"
              >
                {key}
              </Box>
              {/* value calculated by 5h(18k seconds) */}
              <LinearProgress
                size={20}
                thickness={20}
                sx={{ height: 6 }}
                variant="determinate"
                value={(progressValues[key] / 18000) * 100 > 100 ? 100 : (progressValues[key] / 18000) * 100}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
