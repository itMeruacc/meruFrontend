import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

// mui
import {
  Box,
  Backdrop,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import useStore from '../../store/activityStore';

// helpers
import toHhMm from '../../helpers/hhMm';

// -----------------------------------------------------------------

export default function Preview(props) {
  const setActivities = useStore((state) => state.setActivities);

  // notistack
  const { id, date } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDeleteSs = async (screenshotId) => {
    axios
      .delete('/activity/screenshot', {
        data: { screenshotId },
      })
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(
            'Screenshot deleted',
            { variant: 'success' },
            {
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            }
          );

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
        } else
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
      })
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
  // console.log(props.selectedSs);
  // const isChecked = (e) => {
  //   return !props.selectedSs.indexOf(e.target.value) !== -1;
  // };

  return (
    <>
      <Card sx={{ width: 240, maxWidth: 240, m: 1, ml: 0.5 }}>
        <Tooltip title={`${props.title}`} placement="top" followCursor>
          <CardContent
            sx={{
              pb: 0,
              mb: 0,
              mt: -2,
              ml: -1.5,
              background: '#A5B9D9',
              height: '45px',
              maxHeight: '50px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {/* use ref to checkbox, perform onClick */}
            <span>
              {/* <Checkbox
                value={props.ssId}
                aria-labelledby={props.ssId}
                checked={props.selectedSs.indexOf(props.ssId) !== -1}
                sx={{ pt: 0, pl: 0, pr: 0.5 }}
                onChange={(e) => props.setSelectedSs(e.target.checked, props.ssId)}
              /> */}

              <Box
                sx={{
                  width: '75%',
                  display: 'inline-block',
                  maxWidth: '90%',
                  typography: 'caption',
                  fontWeight: 'bold',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {props.title}
              </Box>
            </span>
            <DeleteIcon
              sx={{ float: 'right', cursor: 'pointer' }}
              fontSize="small"
              onClick={(e) => {
                handleDeleteSs(props.ssId);
                // props.setSelectedSs(false, props.act._id, props.ssId);
              }}
            />
          </CardContent>
        </Tooltip>

        <Tooltip
          title={`${toHhMm(props.activityAt)}, ${Math.ceil(props.performanceData)}%`}
          placement="top"
          followCursor
        >
          <CardActionArea onClick={handleToggle}>
            <CardMedia component="img" height="140" image={`${props.preview}`} alt="green iguana" />
          </CardActionArea>
        </Tooltip>

        <CardContent
          sx={{
            pt: 0,
            mb: -3,
            ml: -1.5,
            background: '#A5B9D9',
          }}
        >
          <Typography color="text.primary" gutterBottom variant="subtitle2">
            {`${Math.ceil(props.performanceData)}%, Taken at ${toHhMm(props.activityAt)}`}
          </Typography>
        </CardContent>
      </Card>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
        <img src={`${props.preview}`} alt="hello" />
      </Backdrop>
    </>
  );
}
