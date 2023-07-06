import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScreenshotsPerHour from './ScreenshotsPerHour';
import AppsUrlTrack from './AppsUrlTrack';
import WeeklyTimeLimit from './WeeklyTimeLimit';
import AutoPause from './AutoPause';
import OfflineTime from './OfflineTime';
import NotifyUser from './NotifyUser';
import WeekStart from './WeekStart';
import CurrencySymbol from './CurrencySymbol';
import SsDelete from './SsDelete';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const ud = JSON.parse(localStorage.ud);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sidebarData = [
    {
      title: 'Screen Shot Per Hour',
      desc: 'How Frequently screenshots will be taken. This number is an average since screenshots are taken at random intervals',
    },
    {
      title: 'Apps And Url Tracking',
      desc: 'Track what application your team  members use and what website they visit',
    },
    {
      title: 'Weekly Time Limit',
      desc: 'Number of hours your employees are allowed to work. The tracking will stop when the limit is reached.The time zone for the time limit is always UTC',
    },
    {
      title: 'Auto Pause',
      desc: 'Tracking will automatically pause after the specified period of inactivity and will automatically resume when user becomes active again.',
    },
    {
      title: 'Offline Time',
      desc: 'Allow user to add time not tracked by the program to their timeline manually. It is often used to account for work away from a computer.',
    },
    {
      title: 'Notify User',
      desc: 'Every time a screenshot is taken – a small notification will pop up for a couple of seconds next to the system tray saying that a Screenshot was taken.',
    },
    {
      title: 'Week Start',
      desc: 'When does your week start? This will be used when showing totals for a week or setting weekly time limits.',
    },
    {
      title: 'Currency Symbol',
      desc: 'The symbol (e.g. $, €, £) will be shown when you set hourly pay rates for your employees and everywhere where money is shown (like total amount spent today or on a specific project).',
    },
    {
      title: 'Screenshot Delete',
      desc: 'The Screenshots of all users will be deleted after the given duration automatically.',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Tab label={sidebarData[0].title} {...a11yProps(0)} />
        <Tab label={sidebarData[1].title} {...a11yProps(1)} />
        <Tab label={sidebarData[2].title} {...a11yProps(2)} />
        <Tab label={sidebarData[3].title} {...a11yProps(3)} />
        <Tab label={sidebarData[4].title} {...a11yProps(4)} />
        <Tab label={sidebarData[5].title} {...a11yProps(5)} />
        <Tab label={sidebarData[6].title} {...a11yProps(6)} />
        <Tab label={sidebarData[7].title} {...a11yProps(7)} />
        {/* <Tab label={sidebarData[8].title} {...a11yProps(8)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <ScreenshotsPerHour teamConfig={ud.teamConfig} heading={sidebarData[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AppsUrlTrack teamConfig={ud.teamConfig} heading={sidebarData[1]} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WeeklyTimeLimit teamConfig={ud.teamConfig} heading={sidebarData[2]} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AutoPause teamConfig={ud.teamConfig} heading={sidebarData[3]} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OfflineTime teamConfig={ud.teamConfig} heading={sidebarData[4]} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <NotifyUser teamConfig={ud.teamConfig} heading={sidebarData[5]} />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <WeekStart teamConfig={ud.teamConfig} heading={sidebarData[6]} />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <CurrencySymbol teamConfig={ud.teamConfig} heading={sidebarData[7]} />
      </TabPanel>
      {/* <TabPanel value={value} index={8}>
        <SsDelete teamConfig={ud.teamConfig} heading={sidebarData[8]} />
      </TabPanel> */}
    </Box>
  );
}
