import * as React from 'react';
import {
  Paper,
  Typography,
  Link,
  Box,
  CircularProgress,
  Checkbox,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MailIcon from '@mui/icons-material/Mail';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { random } from 'lodash';
import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//-------------------------------------------------------------------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Row(props) {
  const { row, reports, setReports, setRowsData } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = React.useState(row.name ? row.name : '');
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState(row.url ? row.url : '');
  const [checked, setChecked] = React.useState([row.share ? row.share : false, '']);
  const [ssval, setSsval] = React.useState([row.includeSS, '']);
  const [moneyval, setMoneyval] = React.useState([row.includePR, '']);
  const [alval, setAlval] = React.useState([row.includeAL, '']);
  const [appurl, setAppurl] = React.useState([row.includeApps, '']);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  // console.log(value);
  const handleDelete = () => {
    try {
      axios.delete(`${axios.defaults.baseURL}report/delete/${row.url}`).then((res) => {
        enqueueSnackbar('Report deleted', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        });
        axios.get(`report/saved`).then((res) => setRowsData(res.data.data));
      });
    } catch (err) {
      enqueueSnackbar(err.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
    }
  };
  const handleClickSave = async () => {
    try {
      setOpen(false);
      const data = {
        share: checked[0],
        includeSS: ssval[0],
        includeAL: alval[0],
        includePR: moneyval[0],
        includeApps: appurl[0],
        name,
        url,
      };

      const savedData = await axios.patch('/report/edit', data);
      if (savedData.status === 200) {
        enqueueSnackbar(
          'Report saved',
          { variant: 'success' },
          {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(
        err.message,
        { variant: err.message },
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }
      );
    }
  };
  const handleChange1 = (event) => {
    setChecked([!checked[0], event.target.value]);
  };
  const handleChange2 = (event) => {
    setSsval([!ssval[0], event.target.value]);
  };

  const handleChange3 = (event) => {
    setMoneyval([!moneyval[0], event.target.value]);
  };
  const handleChange4 = (event) => {
    setAlval([!alval[0], event.target.value]);
  };
  const handleChange5 = (event) => {
    setAppurl([!appurl[0], event.target.value]);
  };
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Include screenshots"
        control={<Checkbox checked={ssval[0]} onChange={handleChange2} />}
      />
      {true <= 1 ? (
        <FormControlLabel label="Include money" control={<Checkbox checked={moneyval[0]} onChange={handleChange3} />} />
      ) : (
        ''
      )}
      <FormControlLabel
        label="Include activity level"
        control={<Checkbox checked={alval[0]} onChange={handleChange4} />}
      />

      <FormControlLabel
        label="Include Apps&Url charts"
        control={<Checkbox checked={appurl[0]} onChange={handleChange5} />}
      />
    </Box>
  );
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          <Typography>{row.name ? row.name : ''}</Typography>
        </TableCell>
        <TableCell align="left" sx={{ display: 'flex' }}>
          <Typography
            underline="hover"
            sx={{
              cursor: 'pointer',
              fontWeight: '400',
              textDecoration: 'none',
              color: 'primary.main',
              ':hover': {
                color: 'primary.darker',
                textDecoration: 'underline #000000',
              },
            }}
            onClick={() => {
              window.open(`${window.location.origin}/reports/sharedReports/${row.url}`, '_blank');
            }}
            variant="body2"
          >
            {`${window.location.origin}/reports/sharedReports/${row.url}`}
          </Typography>
          <ContentCopyIcon
            sx={{ fontSize: 'medium', cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/reports/sharedReports/${row.url}`);
              enqueueSnackbar('Link copied', {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              });
            }}
          />
        </TableCell>
        <TableCell align="left">{row.createdAt.substring(0, 10)}</TableCell>
        <TableCell>
          {
            <Box sx={{ display: 'flex' }}>
              {row.includeSS ? <ImageIcon /> : <ImageOutlinedIcon />}
              {/* eslint-disable-next-line no-nested-ternary */}
              {true <= 1 ? row.includeAL ? <PaidIcon /> : <PaidOutlinedIcon /> : ''}
              {row.share ? <ShareIcon /> : <ShareOutlinedIcon />}
              {row?.scheduled ? <MailIcon /> : <MailOutlinedIcon />}
            </Box>
          }
        </TableCell>
        <TableCell>
          <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleDelete} />
        </TableCell>
        <TableCell>
          <Link sx={{ cursor: 'pointer' }} onClick={handleOpen}>
            <Typography>Edit report </Typography>
          </Link>
          <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              Save Report
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                Date range :
                {`${props?.options?.dateOne === null ? '' : props.options?.dateOne}-${
                  props?.options?.dateTwo ? '' : props.options?.dateTwo
                }`}
              </Typography>
              <Typography gutterBottom>Description: {name}</Typography>
              <FormControl>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
              </FormControl>

              <Box sx={{ mt: 1.5 }}>
                <TextField
                  disabled={!checked[0]}
                  fullWidth
                  label="Sharing link"
                  defaultValue={`${window.location.origin}/reports/sharedReports/${url}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

              <div>
                <FormControlLabel
                  label="Share Report"
                  control={<Checkbox defaultChecked={checked} checked={checked[0]} onChange={handleChange1} />}
                />
                {checked[0] ? children : null}
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClickSave}>
                Save & Copy
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function SavedR({ reports }) {
  const [rowsData, setRowsData] = React.useState(null);

  React.useEffect(() => {
    axios.get(`report/saved`).then((res) => setRowsData(res.data.data));
  }, [reports]);

  return rowsData === null ? (
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
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Shared report link</TableCell>
            <TableCell align="left">Created on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.length !== 0 &&
            rowsData?.map((row) => (
              <Row key={row._id + random(100)} row={row} reports={reports} setRowsData={(data) => setRowsData(data)} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
