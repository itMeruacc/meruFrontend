import * as React from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
// mui
import { Tabs, Tab, Typography, Box, Button, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// components
import DatePicker from './DatePicker';
import Graphs from './Graphs';
import SelectEmployees from './SelectEmployees';
import SelectProjects from './SelectProjects';
import SelectClients from './SelectClients';
import SelectGroup from './SelectGroup';
import ReportsOptions from './ReportsOptions';
import SavedR from './SavedR';
import ByEp from './ByEp';
import ByPr from './ByPr';
import ByCl from './ByCL';
import ByDetailed from './ByDetailed';
import ByAppsUrl from './ByApp&Url';

// --------------------------------------------------------------

const groupReports = (group, reports) => {
  if (group[0].value === 'E') return <ByEp sx={{ height: 'auto' }} reports={reports} />;
  if (group[0].value === 'P') return <ByPr sx={{ height: 'auto' }} reports={reports} />;
  if (group[0].value === 'C') return <ByCl sx={{ height: 'auto' }} reports={reports} />;
  if (group[0].value === 'D') return <ByDetailed sx={{ height: 'auto' }} reports={reports} />;
  if (group[0].value === 'A') return <ByAppsUrl sx={{ height: 'auto' }} reports={reports} />;
};

// tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// tab panels
export default function Main() {
  const { enqueueSnackbar } = useSnackbar();
  const [reports, setreports] = React.useState({ reports: [], loader: true });
  const [employees, setemployees] = React.useState([]);
  const [clients, setclients] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [date, setdate] = React.useState([dayjs(), dayjs()]);
  const [group, setgroup] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [saveReportOptions, setsaveReportOptions] = React.useState([]);

  console.log(reports);

  // tabs and tab panels
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGenerateReports = async () => {
    try {
      const dateOne = date[0] ? new Date(date[0].format('MM/DD/YYYY')) : null;
      const dateTwo = date[1] ? new Date(date[1].format('MM/DD/YYYY')) : null;
      const userIds = employees;
      const projectIds = projects;
      const clientIds = clients;
      let groupBy = '';
      group.forEach((g) => {
        groupBy = groupBy.concat(g.value);
      });
      const options = {
        clientIds,
        projectIds,
        userIds,
        dateOne,
        dateTwo,
        groupBy,
      };
      console.log(options);

      // to send to save report module
      setsaveReportOptions(options);

      // call reports here
      // console.log(dayjs(-1));
      axios.post('/report', { ...options }).then((res) => {
        setreports({ reports: res.data.data, loader: false });
      });
    } catch (err) {
      enqueueSnackbar(
        err.message,
        { variant: 'error' },
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }
      );
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="reports-tabs">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Saved Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* generate reports panel */}
      <TabPanel value={value} index={0}>
        <DatePicker
          setdate={(newValue) => {
            setdate(newValue);
          }}
        />
        <SelectEmployees
          setemployees={(newValue) => {
            if (!newValue) {
              setemployees([]);
            } else {
              setemployees(newValue);
            }
          }}
        />

        <SelectClients
          setclients={(newValue) => {
            console.log(newValue);
            if (!newValue) {
              setclients([]);
            } else {
              setclients(newValue);
            }
          }}
        />
        <SelectProjects
          setprojects={(newValue) => {
            console.log(newValue);
            if (!newValue) {
              setprojects([]);
            } else {
              setprojects(newValue);
            }
          }}
        />
        <SelectGroup
          setgroup={(newValue) => {
            setgroup(newValue);
          }}
        />
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleGenerateReports} variant="contained" endIcon={<SendIcon />}>
            Generate Reports
          </Button>
          {!reports.loader && reports.reports[0].total.length ? (
            <ReportsOptions reports={reports} options={saveReportOptions} />
          ) : null}
        </Box>
        {!reports.loader && reports.reports[0].total.length ? (
          <>
            <Graphs date={date} reports={reports} style={{ margin: 10 }} />
            <Divider />
            {groupReports(group, reports)}
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', m: 10 }}>
              <Typography varinat="h1" sx={{ fontWeight: 'bold' }}>
                No tracked time found matching the criteria
              </Typography>
            </Box>
          </>
        )}
      </TabPanel>
      {/* saved reports panel */}
      <TabPanel value={value} index={1}>
        <SavedR />
      </TabPanel>
    </Box>
  );
}
