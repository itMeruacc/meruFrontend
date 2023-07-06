import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// mui
import { Box, Typography, CardContent, Card, Divider, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// components
import TotalHours from './totalHours';
import MonthlyHours from './monthlyHours';
import WeeklyHours from './weeklyHours';
import TodayHours from './todayHours';

// helpers
import secondsToHms from '../../helpers/secondsToHms';

export default function Overview({ date, activities }) {
  const [totalHours, settotalHours] = useState(0);
  const [todayHours, settodayHours] = useState(0);
  const [monthlyHours, setmonthlyHours] = useState(0);
  const [weeklyHours, setweeklyHours] = useState(0);
  const [value, setValue] = React.useState('1');
  const [tasks, settasks] = React.useState([]);
  const [apps, setapps] = React.useState([]);
  const [appsMap, setappsMap] = React.useState([]);

  // filter day selected day wise and internal and external
  useEffect(() => {
    // get date filtered acts
    const arr = activities.filter((act) => {
      const date1 = new Date(act.activityOn);
      return dayjs(date1).isSame(date, 'day');
    });

    // traverse thru acts to get time data
    let total = 0;
    let month = 0;
    let week = 0;
    let today = 0;
    activities.forEach((act) => {
      const date1 = new Date(act.activityOn);
      total += act.consumeTime;
      if (dayjs(date1).isSame(date, 'day')) today += act.consumeTime;
      if (dayjs(date1).isSame(date, 'week')) week += act.consumeTime;
      if (dayjs(date1).isSame(date, 'month')) month += act.consumeTime;
    });
    settotalHours(total);
    setweeklyHours(week);
    setmonthlyHours(month);
    settodayHours(today);

    // group by tasks(note)
    const groupByTasks = arr.reduce((group, act) => {
      const { note } = act;
      group[note] = group[note] ?? { consumeTime: 0 };
      group[note].consumeTime += act.consumeTime;
      return group;
    }, {});
    console.log(groupByTasks);
    settasks(groupByTasks);

    // group by task(projects)
    // const groupByTasks = arr.reduce((group, act) => {
    //   const { project } = act;
    //   group[project] = group[project] ?? { consumeTime: 0 };
    //   group[project].consumeTime += act.consumeTime;
    //   return group;
    // }, {});
    // console.log(groupByTasks);
    // settasks(groupByTasks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, date]);

  // toggling tasks and apps(panels)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      component="div"
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '@media (max-width: 780px)': {
          flexDirection: 'column',
        },
      }}
    >
      {/* Time cards */}
      <Box
        sx={{
          width: '40%',
          '@media (max-width: 780px)': {
            width: '100%',
            marginBottom: '10px',
          },
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <TodayHours Total={todayHours} />
        <WeeklyHours Total={weeklyHours} />
        <MonthlyHours Total={monthlyHours} />
        <TotalHours Total={totalHours} />
      </Box>

      {/* Tab panels for tasks and apps and urls */}
      <Box
        sx={{
          width: '60%',
          '@media (max-width: 780px)': {
            width: '100%',
          },
        }}
      >
        <Card
          elevation={3}
          sx={{
            minWidth: 275,
            height: '100%',
            backgroundColor: 'info.lighter',
          }}
        >
          <CardContent>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                  component="div"
                  color="text.primary"
                  sx={{
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <TabList onChange={handleChange}>
                    <Tab label="Tasks" value="1" />
                    {/* <Tab label="Apps & URL's" value="2" /> */}
                  </TabList>
                </Typography>
              </Box>
              <TabPanel value="1">
                <Box overflow={'auto'} sx={{ height: 145 }}>
                  {tasks &&
                    Object.keys(tasks).map((task, index) => (
                      <div key={index}>
                        <a
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            px: 1,
                            textDecoration: 'none',
                            color: 'black',
                          }}
                          key={index}
                        >
                          <Typography sx={{ mb: 1.5 }} variant="h5" color="text.primary">
                            {task === 'undefined' ? 'No Project' : task}
                            <br />
                            {/* <Typography color="text.primary">{project}</Typography> */}
                          </Typography>
                          <Typography variant="h4" component="div">
                            {secondsToHms(tasks[task].consumeTime)}
                          </Typography>
                        </a>
                        <Divider sx={{ backgroundColor: 'primary.dark' }} />
                      </div>
                    ))}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box overflow={'auto'} sx={{ height: 145 }}>
                  {appsMap &&
                    appsMap.map((data) => (
                      <>
                        <Box
                          key={data.app}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            px: 1,
                          }}
                        >
                          <Typography sx={{ my: 1.5 }} variant="h6" color="text.primary">
                            {data.app}
                            <br />
                          </Typography>
                          <Typography variant="h5" component="div">
                            {`${((data.usage / apps.length) * 100).toFixed(2)}%`}
                          </Typography>
                        </Box>
                        <Divider sx={{ backgroundColor: 'primary.dark' }} />
                      </>
                    ))}
                </Box>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
