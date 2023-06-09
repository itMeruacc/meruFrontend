import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {
  FormControl,
  DialogContentText,
  FormControlLabel,
  IconButton,
  Link,
  Autocomplete,
  Checkbox,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

// store
import useStore from '../../store/activityStore';

// ------------------------------------------------------------------

export default function OfflineTime({ act, date, id }) {
  console.log(date);
  // store
  const setActivities = useStore((state) => state.setActivities);
  const { enqueueSnackbar } = useSnackbar();
  //
  const [open, setopen] = useState(false);
  const [startTime, setstartTime] = useState(new Date());
  const [endTime, setendTime] = useState(new Date());
  const [project, setproject] = useState('null');
  const [note, setnote] = useState('');
  // for selection
  const [projects, setprojects] = useState([]);
  const [error, seterror] = useState(false);
  // for dialog open close

  // get project options
  useEffect(() => {
    // get projects for editing projects
    axios.get('project').then((res) => setprojects(res.data.data));
  }, []);

  // format startTime and endTime
  useEffect(() => {
    // format startTime and endTime
    const startDate = new Date();
    const endDate = new Date();
    setstartTime(`${startDate.getHours()}:${startDate.getMinutes()}`);
    setendTime(`${endDate.getHours()}:${endDate.getMinutes()}`);
  }, []);

  const handleStartTimeChange = (e) => {
    const { value } = e.target;
    const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
    console.log(isValid);
    if (isValid) seterror(false);
    else seterror(true);
    setstartTime(value);
  };

  const handleEndTimeChange = (e) => {
    const { value } = e.target;
    const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(value);
    console.log(isValid);
    if (isValid) seterror(false);
    else seterror(true);
    setendTime(value);
  };

  const handleProjectChange = (e) => {
    const { value } = e.target;
    setproject(value);
  };

  const handleNoteChange = (e) => {
    const { value } = e.target;
    setnote(value);
  };

  const handleCancel = (e) => {
    console.log(project);
    setopen(false);
    setproject('null');
    setnote('No Note');
    // setproject(act.project ? act.project._id : 'null');
    // setnote(act.note ? act.note : 'No Note');
    // format startTime and endTime
    // const startDate = new Date(act.startTime * 1000);
    // const endDate = new Date(act.endTime * 1000);
    // setstartTime(`${startDate.getHours()}:${startDate.getMinutes()}`);
    // setendTime(`${endDate.getHours()}:${endDate.getMinutes()}`);
    const startDate = new Date();
    const endDate = new Date();
    setstartTime(`${startDate.getHours()}:${startDate.getMinutes()}`);
    setendTime(`${endDate.getHours()}:${endDate.getMinutes()}`);
    seterror(false);
  };

  const handleAddOfflineTime = () => {
    // make new epoch values
    // const startDate = new Date(act.startTime * 1000);
    const startDate = date;
    startDate.setMinutes(startTime.split(':')[1]);
    // const endDate = new Date(act.endTime * 1000);
    const endDate = date;
    endDate.setHours(endTime.split(':')[0]);
    endDate.setMinutes(endTime.split(':')[1]);

    // string null coz select component cant take null value
    const pro = project === 'null' ? null : project;
    // note change
    let newNote = note.trim();
    if (newNote === '') newNote = 'No Note';
    axios
      .post(`activity/`, {
        // clientId:pro.,
        projectId: project,
        // task,
        // startTime,
        // consumeTime,
        // endTime,
        // performanceData,
        // isInternal,
        // activityOn,
        note: newNote,
        // startTime: Math.round(startDate.getTime() / 1000),
        // endTime: Math.round(endDate.getTime() / 1000),
      })
      .then((res) => {
        setopen(false);
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
      });
  };

  return (
    <>
      <Link
        variant="h6"
        sx={{
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={() => setopen(true)}
      >
        <IconButton color="primary" size="small">
          <AddIcon />
        </IconButton>
        Add Offline time
      </Link>

      <Dialog sx={{ minWidth: 600, mt: 2 }} open={open}>
        <DialogTitle>Add offline time</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>
              Offline time range will appear on your timeline. You'll be able to delete or edit it there.
            </Typography>
            <TextField
              sx={{ mr: 2 }}
              error={error}
              value={startTime}
              onChange={handleStartTimeChange}
              label="Start time"
              variant="outlined"
            />
            <TextField
              error={error}
              value={endTime}
              onChange={handleEndTimeChange}
              label="End time"
              variant="outlined"
            />

            <Typography gutterBottom>e.g.: 7am – 9:10am or 17:30 – 20:00</Typography>
          </DialogContentText>

          {/* change project */}
          <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Project (Optional)</InputLabel>
              <Select value={project} onChange={handleProjectChange} label="Project (Optional)">
                <MenuItem value={'null'}>No Project</MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Note Change */}
          <Box sx={{ minWidth: 120, mt: 2 }}>
            <FormControl fullWidth>
              <TextField label="Note(Optional)" multiline rows={4} value={note} onChange={handleNoteChange} />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button disabled={error} onClick={handleAddOfflineTime}>
            Add offline time
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
