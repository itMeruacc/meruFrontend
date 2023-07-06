import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// mui
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// components
import Activity from './Activity';

// ------------------------------------------

export default function ScreenShots({ activities, date, isInternal, id }) {
  const [filteredActs, setfilteredActs] = useState([]);

  // filter day selected day wise and internal and external
  useEffect(() => {
    // get date filtered acts
    const arr = activities.filter((act) => {
      const date1 = new Date(act.activityOn);
      return dayjs(date1).isSame(date, 'day');
    });
    // get intExt filtered acts
    setfilteredActs(arr.filter((act) => act.isInternal === isInternal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternal, activities, date]);

  return (
    <Box component="div">
      {/* map the time ranges from user data for the particular date */}
      {filteredActs.length ? (
        filteredActs.map((act) => <Activity date={date} id={id} act={act} key={act._id} />)
      ) : (
        <Alert severity="info">
          <AlertTitle>No Activities</AlertTitle>
          Nothing was done on this day — <strong>{'NONE :('}</strong>
        </Alert>
      )}
    </Box>
  );
}
