import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

// mui
import { Box, Typography, Tooltip, Alert, AlertTitle, Toolbar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

// store
import useStore from '../../store/activityStore';

// helpers
import toHhMm from '../../helpers/hhMm';

// components
import Preview from './Preview';
import EditActivity from './EditActivity';

// ---------------------------------------------------------------------------------------------------------------------

// performance data icons
const percentIcon = (percent) =>
  // eslint-disable-next-line no-nested-ternary
  percent <= 30 ? (
    <HourglassEmptyIcon sx={{ m: -1 }} />
  ) : percent <= 70 && percent > 30 ? (
    <HourglassBottomIcon sx={{ m: -1 }} />
  ) : (
    <HourglassFullIcon sx={{ m: -1 }} />
  );

// style
const outerBox = { m: 0.5, pt: 1.5, pr: 1, pb: 1, pl: 0.5, borderRadius: 1 };

export default function Activity({ act, date, id }) {
  console.log(act.note);
  // notistack
  const { enqueueSnackbar } = useSnackbar();
  const setActivities = useStore((state) => state.setActivities);
  const [avgPerformanceData, setavgPerformanceData] = useState(0);

  // edit act
  const [openEdit, setopenEdit] = useState(false);

  React.useEffect(() => {
    let avg = 0;
    act.screenshots.forEach((ss) => {
      avg += ss.performanceData;
    });
    if (act.screenshots.length) setavgPerformanceData(avg / act.screenshots.length);
    else setavgPerformanceData(0);
  }, [act]);

  // selected ss to delete
  const [selectedSs, setselectedSs] = useState([]);

  const delSs = async (selectedSs) => {
    const array = selectedSs.map((ss) => ({ activityId: act._id, screenshotId: ss }));
  };

  const handleDeleteAct = async (activityId) => {
    axios
      .delete('/activity/', {
        data: { activityId },
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar('Activity deleted', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          });

          // refresh activities
          axios
            .post('/activity/getActivities', {
              userId: id,
              startTime: new Date(date.getFullYear(), date.getMonth(), 1),
              endTime: new Date(date.getFullYear(), date.getMonth() + 1, 1),
            })
            .then((res) => {
              setActivities(res.data.data, false);
            });
        } else enqueueSnackbar('Some Error Occured', { variant: 'error' });
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        enqueueSnackbar(
          'Some Error Occured',
          { variant: 'error' },
          {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          }
        );
      });
  };

  return (
    <Box component="div" sx={outerBox}>
      <Typography component="span" sx={{ fontWeight: 'bold', ml: 2.5 }}>
        {toHhMm(act.startTime)} - {toHhMm(act.endTime)} ||
      </Typography>
      <Tooltip title={`${Math.ceil(avgPerformanceData)}%`} placement="top" followCursor>
        <Box sx={{ m: 1, fontWeight: 'bold' }} component="span">
          {percentIcon(avgPerformanceData)}
          <span> ({Math.ceil(avgPerformanceData)}%)</span>
        </Box>
      </Tooltip>
      <Typography component="span" sx={{ m: 0, fontWeight: 'bold' }}>
        || {!act.project ? `No Project` : act.project.name}
      </Typography>
      <Typography component="span" sx={{ ml: 1, fontWeight: 'bold' }}>
        || {act.note ?? `No Note`}
      </Typography>
      <IconButton
        size="small"
        sx={{ float: 'right', color: 'primary.dark' }}
        onClick={() => {
          handleDeleteAct(act._id);
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ float: 'right', color: 'primary.dark' }}>
        <EditIcon onClick={() => setopenEdit(true)} fontSize="small" />
      </IconButton>
      <Toolbar
        sx={{
          // use this for dynamic display none
          display: 'none',
          mb: 1,
          position: 'fixed',
          borderRadius: 1,
          bottom: '0',
          width: '70%',
          zIndex: '10',
          backgroundColor: '#ebf8f2',
          ...(selectedSs.length > 0 && {
            // bgcolor: (theme) => alpha(theme.palette.primary.main),
            display: 'flex',
          }),
        }}
      >
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              delSs(selectedSs);
            }}
            size="small"
          >
            <DeleteIcon sx={{ float: 'right' }} fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          Delete {selectedSs.length} selected screenshots?
        </Typography>
      </Toolbar>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {act.screenshots.length ? (
          act.screenshots.map((ss, key) => (
            <Preview
              ss={ss}
              id={id}
              date={date}
              setSelectedSs={(isCheck, screenshotId) => {
                if (isCheck) {
                  setselectedSs((prev) => [...prev, screenshotId]);
                } else {
                  setselectedSs((prev) => selectedSs.filter((pre) => screenshotId !== pre));
                }
              }}
              takenAt={ss.takenAt}
              selectedSs={selectedSs}
              ssId={ss._id}
              act={act}
              title={ss.title}
              preview={ss.image}
              key={key}
              performanceData={ss.performanceData}
              activityAt={ss.activityAt}
            />
          ))
        ) : (
          <Alert severity="info" sx={{ m: 2, width: '100%' }} variant="string">
            <AlertTitle>No Screenshots</AlertTitle>
            Evidence was deleted — <strong>{`OOF :")`}</strong>
          </Alert>
        )}

        {/* edit act */}
        <EditActivity
          id={id}
          date={date}
          act={act}
          open={openEdit}
          setopen={(value) => {
            setopenEdit(value);
          }}
        />
      </Box>
    </Box>
  );
}
