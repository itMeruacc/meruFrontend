import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Tooltip, Button, Container, CircularProgress, Paper, Box, TextField, useStepperContext } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import NoProjectSelected from './NoProjectSelected';
import ChangeClient from './ChangeClient';
import ChangeProjectLeader from './ChangeProjectLeader';
import ChangeBudget from './ChangeBudget';
import ProjectMembers from './ProjectMembers';
import ProjectTime from './ProjectTime';

// store
import useStore from '../../store/projectStore';

//---------------------------------------------------------------

// style
// const input = {
//   color: '#000',
//   width: 'fit-content',
//   maxWidth: '50%',
//   wordWrap: 'break-word',
//   height: '30px',
//   fontSize: '30px',
//   fontWeight: 'bold',
//   border: 'none',
//   background: '#fff',
//   transition: 'width 0.4s ease-in-out',
//   '& :focus': { width: '100%' },
// };
const mainLoader = {
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};
const rootPaper = {
  overflow: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const input = {
  marginTop: '8px',
  color: '#000',
  width: 'fit-content',
  wordWrap: 'break-word',
  height: '35px',
  fontSize: '30px',
  fontWeight: 'bold',
  border: 'none',
  background: '#fff',
  transition: 'width 0.4s ease-in-out',
  '& :focus': { width: '100%' },
};

export default function Main({ projectId, setprojectId }) {
  // store
  const setClients = useStore((state) => state.setClients);
  const [project, setproject] = useState({ project: {}, loader: true });

  // for name component
  const [name, setName] = useState(project.project.name);
  const [nameHelperText, setnameHelperText] = useState('');
  const [nameError, setnameError] = useState(false);

  // fetch the data
  useEffect(() => {
    if (!projectId) return;
    // reset these
    setnameHelperText('');
    setnameError(false);

    // fetch
    axios.get(`project/${projectId}`).then((res) => {
      setproject({ project: res.data.data, loader: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    setName(project.project.name);
  }, [project]);

  // to make the form(name) focused
  const inputRef = useRef();
  // edit name, refresh clients in sidebar and change local state of name
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const value = name.trim();
    if (value === '') {
      setnameHelperText('Please enter a name to continue');
      setnameError(true);
      return;
    }
    try {
      e.preventDefault();
      axios.patch(`/project/${project.project._id}/name`, { name: value }).then((res) => {
        console.log(res);
        axios.get(`/project/byClients`).then((res) => {
          setClients(res.data.data, false);
        });
      });
      setnameHelperText('');
      setnameError(false);
    } catch (error) {
      console.log(error);
    }
  };

  // del client, set clientId to null, refresh sidebar clients(store)
  const handleDelete = () => {
    try {
      axios.delete(`/project/${projectId}`).then((res) => {
        console.log(res);
        axios.get(`/project/byClients`).then((res) => {
          setClients(res.data.data, false);
        });
        setprojectId(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!projectId) return <NoProjectSelected />;

  return (
    <>
      <Container sx={{ width: '70%', m: 1, ml: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {project.loader ? (
            <Box sx={mainLoader}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ m: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* Project Name components */}
                <form
                  onBlur={(e) => {
                    handleEditSubmit(e);
                    // inputRef.current.blur();
                  }}
                  onSubmit={(e) => handleEditSubmit(e)}
                  style={{ display: 'inline' }}
                >
                  <TextField
                    error={nameError}
                    helperText={nameHelperText}
                    size="200px"
                    sx={{ ml: 1, mb: 3 }}
                    inputProps={{ style: { fontSize: 25, fontWeight: 'bold' } }}
                    variant="standard"
                    fullWidth
                    inputRef={inputRef}
                    // ref={inputRef}
                    onMouseDown={(e) => e.preventDefault()}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                  />
                </form>
                <Box>
                  <Tooltip title="Edit Client">
                    <Button>
                      <EditIcon
                        onClick={() => {
                          console.log(inputRef);
                          inputRef.current.focus();
                        }}
                        color="action"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip onClick={handleDelete} title="Delete Client">
                    <Button>
                      <DeleteIcon color="action" />
                    </Button>
                  </Tooltip>
                </Box>
              </Box>

              {/* change client and project Leader and Budget///////////////// */}
              <Container disableGutters sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ChangeClient project={project} />
                <ChangeProjectLeader project={project} />
                <ChangeBudget project={project} />
                {/* <ProjectTime projectId={projectId} /> */}
                <ProjectMembers project={project} />
              </Container>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
