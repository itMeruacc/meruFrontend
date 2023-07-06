import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, DialogContentText, FormControlLabel, Autocomplete, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

// store
import useStore from '../../store/activityStore';
import ProjectsCharts from '../Reports/ProjectsCharts';

// ------------------------------------------------------------------

export default function EditActivity({ open, setopen, act, date, id }) {
  // store
  const setActivities = useStore((state) => state.setActivities);

  const { enqueueSnackbar } = useSnackbar();
  const [startTime, setstartTime] = useState(new Date());
  const [endTime, setendTime] = useState(new Date());
  const [project, setproject] = useState(act.project ? act.project._id : 'null');
  const [note, setnote] = useState(act.note ? act.note : 'No Note');
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
    const startDate = new Date(act.startTime * 1000);
    const endDate = new Date(act.endTime * 1000);
    setstartTime(`${startDate.getHours()}:${startDate.getMinutes()}`);
    setendTime(`${endDate.getHours()}:${endDate.getMinutes()}`);
  }, [act]);

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
    setopen(false);
    setproject(act.project ? act.project._id : 'null');
    setnote(act.note ? act.note : 'No Note');
    // format startTime and endTime
    const startDate = new Date(act.startTime * 1000);
    const endDate = new Date(act.endTime * 1000);
    setstartTime(`${startDate.getHours()}:${startDate.getMinutes()}`);
    setendTime(`${endDate.getHours()}:${endDate.getMinutes()}`);
  };

  const handleSave = () => {
    // make new epoch values
    const startDate = new Date(act.startTime * 1000);
    startDate.setMinutes(startTime.split(':')[1]);
    const endDate = new Date(act.endTime * 1000);
    endDate.setHours(endTime.split(':')[0]);
    endDate.setMinutes(endTime.split(':')[1]);

    // string null coz select component cant take null value
    const pro = project === 'null' ? null : project;
    // note change
    let newNote = note.trim();
    if (newNote === '') newNote = 'No Note';
    axios
      .patch(`activity/${act._id}`, {
        project: pro,
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
      <Dialog sx={{ minWidth: 600, mt: 2 }} open={open}>
        <DialogTitle>Edit Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography gutterBottom>You can trim activity time, or edit activity project</Typography>
            <TextField
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
              <InputLabel>Project</InputLabel>
              <Select value={project} onChange={handleProjectChange} label="Project">
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
              <TextField label="Note" multiline rows={4} value={note} onChange={handleNoteChange} />
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button disabled={error} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
