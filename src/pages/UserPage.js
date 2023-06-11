import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// mui
import { CssBaseline, Box, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// store
import useStore from '../store/activityStore';

// components
// eslint-disable-next-line no-unused-vars
import Calendar from '../components/UserPage/Calendar';
import ChangeMonth from '../components/UserPage/ChangeMonth';
import Overview from '../components/UserPage/Overview';
import ScreenShots from '../components/UserPage/ScreenShots';
import OfflineTime from '../components/UserPage/OfflineTime';
import Timeline from '../components/UserPage/Timeline';
import PageHeader from '../components/UserPage/PageHeader';
import IntExt from '../components/UserPage/IntExt';
import Page from '../components/Page';

export default function UserPage() {
  const ud = JSON.parse(localStorage.ud);
  const navigate = useNavigate();

  // url params
  const { id } = useParams();
  // store
  const setActivities = useStore((state) => state.setActivities);
  const activities = useStore((state) => state.activities);
  console.log(activities);
  const [date, setdate] = useState(new Date());
  const [isInternal, setisInternal] = useState(false);

  // for searchBox
  const [employees, setemployees] = useState([]);
  // heading of timeline
  const [userName, setuserName] = useState('User');

  // get alll activities
  useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    const now = new Date();
    axios
      .post('/activity/getActivities', {
        userId: id,
        startTime: new Date(now.getFullYear(), now.getMonth(), 1),
        endTime: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      })
      .then((res) => {
        setActivities(res.data.data, false);
        setuserName(`${res.data.user.firstName} ${res.data.user.lastName}`);
        setdate(new Date());
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });

    axios
      .get('/employee/all')
      .then((res) => setemployees(res.data.data))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });

    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // handleSearch
  const handleSearch = (e, value) => {
    navigate(`/dashboard/timeline/${value._id}`);
  };

  // return loader while fetching data
  if (activities.loader) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexGrow: '1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ m: 2 }} />
      </Box>
    );
  }

  return (
    <Page title="Timeline">
      <Container>
        <CssBaseline>
          <Box component="div" sx={{ width: '95%', margin: 'auto', position: 'relative' }}>
            <PageHeader title={`${userName}'s Timeline`} />

            {/* search box (not for employee) */}
            {!(ud.role === 'employee') && (
              <Autocomplete
                onChange={(e, value) => handleSearch(e, value)}
                disablePortal
                id="employee-search"
                options={employees}
                getOptionLabel={(option) => option.name}
                sx={{
                  position: 'absolute',
                  width: 300,
                  right: 30,
                  top: 10,
                }}
                renderInput={(params) => <TextField {...params} label="Search Employee" />}
              />
            )}

            <ChangeMonth id={id} date={date} setdate={(date) => setdate(date)} />

            <Calendar activities={activities.activities} date={date} setdate={(date) => setdate(date)} />

            {/* overview */}
            <Overview date={date} dateObj={date} days={[]} activities={activities.activities} />

            {/* timeline */}
            <Timeline activities={activities.activities} date={date} />

            {/* Internal / External switcher */}
            <IntExt setInternal={(isInt) => setisInternal(isInt)} />

            {/* screenshots and activities */}
            <ScreenShots id={id} isInternal={isInternal} activities={activities.activities} date={date} />

            <OfflineTime date={date} id={id} />
          </Box>
        </CssBaseline>
      </Container>
    </Page>
  );
}
