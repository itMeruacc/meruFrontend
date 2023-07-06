import React, { useState, useEffect, useContext } from 'react';
// mui
import { Column } from '@ant-design/plots';
import { Box, Typography } from '@mui/material';
// helpers
import secondsToHms from '../../helpers/secondsToHms';
// -------------------------------------------------------------------

const monthNames = [
  1,
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const xAxisFormatter = (x, diffDays) => {
  if (diffDays > 31 && diffDays <= 120) {
    // weekly
    const ans = `Week ${x}`;
    return ans;
  }
  if (diffDays > 120 && diffDays <= 365) {
    // monthly
    const arr = x.split('/');
    const ans = `${monthNames[arr[0]]}, ${arr[1]}`;
    return ans;
  }
  if (diffDays > 365) {
    // yearly
    const arr = x.split('/');
    const ans = `${arr[1]}`;
    return ans;
  }
  return x;
};

export default function Bar({ reports, date }) {
  const [totalHours, settotalHours] = useState(null);
  const [totalActCount, settotalCount] = useState(null);
  const [totalPData, settotalPData] = useState(null);
  const [totalPRate, settotalPRate] = useState(null);
  const [data, setData] = useState([]);
  const [diffDays, setdiffDays] = useState(0);

  useEffect(() => {
    // calculate no. of days between the dates
    const dateOne = date[0];
    const dateTwo = date[1];
    const differenceDays = (new Date(dateTwo).getTime() - new Date(dateOne).getTime()) / (1000 * 3600 * 24);
    setdiffDays(differenceDays);
    // ----------------------------------

    let t = 0;
    reports?.reports[0]?.byScreenshots?.forEach((ss) => {
      t += ss.actCount;
    });
    const arr = reports?.reports[0]?.byScreenshots?.map((ss) => {
      const o = {
        type: `${ss._id}`,
        value: ss.actCount,
      };
      return o;
    });
    setData(reports.reports[0]?.byDates);
    // TODO - Remap the data to fill in for missing dates
    settotalHours(reports?.reports[0]?.total[0]?.totalHours);
    settotalPData(reports?.reports[0]?.total[0]?.avgPerformanceData);
    settotalCount(reports?.reports[0]?.total[0]?.actCount);
    settotalPRate(reports?.reports[0]?.total[0]?.avgPayRate);
    console.log(reports);
  }, [reports]);
  console.log(data);
  const config = {
    data,
    xField: '_id',
    yField: 'totalHours',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      formatter: (_id) => xAxisFormatter(_id, diffDays),
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      _id: {
        formatter: (_id) => xAxisFormatter(_id, diffDays),
      },
      totalHours: {
        alias: 'Total hours',
        formatter: (hours) => secondsToHms(hours),
      },
    },
  };

  // const configCustom = {
  //   data,
  //   xField: "_id",
  //   yField: "totalHours",
  //   xAxis: {
  //     label: {
  //       autoRotate: false,
  //     },
  //   },
  //   slider: {
  //     start: 0.1,
  //     end: 0.2,
  //   },
  // };

  return (
    <Box>
      <Box sx={{}}>
        <Typography variant="h2" sx={{ opacity: 1, textAlign: 'left' }}>
          Timeline
        </Typography>
      </Box>
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ opacity: 0.6, textAlign: 'left' }}>
            {secondsToHms(totalHours)}
          </Typography>
          <Typography variant="h4" sx={{ opacity: 0.6, textAlign: 'left' }}>
            {Math.trunc(totalPData)}%
          </Typography>

          {true ? (
            <Typography variant="h4" sx={{ opacity: 0.6, textAlign: 'left' }}>
              {Math.trunc((totalPRate * totalHours) / 3600)} <span>&#8377;</span>
            </Typography>
          ) : (
            ''
          )}
        </Box>
        <div>
          <Column {...config} />
        </div>
      </Box>
    </Box>
  );
}
