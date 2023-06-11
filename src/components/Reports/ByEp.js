import React, { useEffect, useState } from 'react';
import { groupBy as rowGrouper, random } from 'lodash';
import DataGrid from 'react-data-grid';
import { Box, Divider, Typography } from '@mui/material';
import { fontSize } from '@mui/system';

function rowKeyGetter(row) {
  return Math.floor(Math.random() * 1000 * Math.random() * 200);
}

const options = ['employee', 'project'];

export default function ByEp({ reports }) {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([options[0]]);
  const [expandedGroupIds, setExpandedGroupIds] = useState(() => new Set(['Employees']));

  const columns = [
    {
      key: 'employee',
      name: 'Employee',
    },
    {
      key: 'project',
      name: 'Project',
    },
    {
      key: 'duration',
      name: 'Duration(hr)',
      groupFormatter({ childRows }) {
        return <>{childRows.reduce((prev, { duration }) => Number((prev + duration).toFixed(2)), 0)}</>;
      },
    },
    {
      key: 'activity',
      name: 'Activity(%)',
    },

    true <= 1
      ? {
          key: 'money',
          name: `Money ${(<span>&#8377;</span>)}`,
          groupFormatter({ childRows }) {
            return <>{childRows.reduce((prev, { money }) => Number((prev + money).toFixed(2)), 0)}</>;
          },
        }
      : '',
  ];

  React.useEffect(() => {
    // setRowData(savedReports.reports[0]?.byEP);
    const arr = [];
    // eslint-disable-next-line array-callback-return
    reports.reports[0]?.byEP?.map((emp) => {
      // eslint-disable-next-line array-callback-return
      emp.projects.map((pro) => {
        arr.push({
          id: emp._id.userId + random(100),
          employee: `${emp._id.firstName} ${emp._id.lastName}`,
          project: `${pro.project}`,
          duration: Number((pro.totalHours / 3600).toFixed(2)),

          money: Number(((pro.totalHours / 3600) * emp.payRate).toFixed(2)),
          activity: Number((pro.avgPerformanceData / 1).toFixed(0)),
        });
      });
    });
    setRows(arr);
    console.log(arr);
  }, [reports]);

  function toggleOption(option, enabled) {
    const index = selectedOptions.indexOf(option);
    if (enabled) {
      if (index === -1) {
        setSelectedOptions((options) => [...options, option]);
      }
    } else if (index !== -1) {
      setSelectedOptions((options) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        return newOptions;
      });
    }
    setExpandedGroupIds(new Set());
  }
  console.log(reports);
  return reports.reports[0].byEP.length !== 0 ? (
    <Box sx={{ mt: 3 }}>
      <Typography varinat="h3" sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
        Group by columns:
      </Typography>
      <div>
        {options.map((option) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label key={option}>
            <input
              style={{ marginLeft: '1rem' }}
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={(event) => toggleOption(option, event.target.checked)}
            />{' '}
            {option}
          </label>
        ))}
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        groupBy={selectedOptions}
        rowGrouper={rowGrouper}
        expandedGroupIds={expandedGroupIds}
        onExpandedGroupIdsChange={setExpandedGroupIds}
        defaultColumnOptions={{ resizable: true }}
        // direction={direction}
      />
    </Box>
  ) : (
    <>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', m: 10 }}>
        <Typography varinat="h1" sx={{ fontWeight: 'bold' }}>
          No tracked time found matching the criteria
        </Typography>
      </Box>
    </>
  );
}
