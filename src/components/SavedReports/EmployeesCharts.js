import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { Box, Typography } from '@mui/material';

import secondsToHms from '../../helpers/secondsToHms';

export default function EmployeesCharts({ reports }) {
  const [chartData, setchartData] = useState([]);
  const [totalHours, settotalHours] = useState(null);
  const [totalPData, settotalPData] = useState(null);
  const [totalPRate, settotalPRate] = useState(null);

  useEffect(() => {
    const arr = reports?.reports[0]?.byEmployees?.map((emp) => {
      const o = {
        type: `${emp._id.firstName} ${emp._id.lastName}`,
        value: emp.totalHours,
      };
      return o;
    });
    setchartData(arr);
    settotalHours(reports?.reports[0]?.total[0]?.totalHours);
    settotalPData(reports?.reports[0]?.total[0]?.avgPerformanceData);
    settotalPRate(reports?.reports[0]?.total[0]?.avgPayRate);
  }, [reports]);
  const config = {
    autoFit: true,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      formatter: (datum) => `${datum.type}: ${datum.value}`,
      autoHide: true,
      type: 'spider',
      labelHeight: 28,
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.type,
        value: `${Math.trunc((datum.value * 100) / totalHours)}%`,
      }),
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <Box>
      <Box sx={{}}>
        <Typography variant="h2" sx={{ opacity: 1, textAlign: 'left' }}>
          Employees Reports
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="h3" sx={{ opacity: 0.6, textAlign: 'left' }}>
            {secondsToHms(totalHours)}
          </Typography>
          <Typography variant="h4" sx={{ opacity: 0.6, textAlign: 'left' }}>
            {Math.trunc(totalPData)}%
          </Typography>
          {true <= 1 ? (
            <Typography variant="h4" sx={{ opacity: 0.6, textAlign: 'left' }}>
              {Math.trunc((totalPRate * totalHours) / 3600)} <span>&#8377;</span>
            </Typography>
          ) : (
            ''
          )}
        </Box>
        <div>
          <Pie style={{ flexGrow: '2' }} {...config} />
        </div>
      </Box>
    </Box>
  );
}
