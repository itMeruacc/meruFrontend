import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Typography, CircularProgress, Box, TextField, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { TreeItem, TreeView, LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// own components
import FloatingForm from './FloatingForm';

// store
import useStore from '../../store/teamStore';
import IntergrationNotistack from './IntegrationNotistack';

// styles
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  pt: 1,
};
const listBoxLoader = {
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};

// temprary data

const Sidebar = ({ setTeamId }) => {
  // it will be used to get data from store
  // const team = {
  //   loader: false,
  //   team: [
  //     { _id: 1, name: 'Team1' },
  //     { _id: 2, name: 'Team2' },
  //     { _id: 3, name: 'Team3' },
  //     { _id: 4, name: 'Team4' },
  //   ],
  // };
  // store
  const team = useStore((state) => state.teams);
  const setTeams = useStore((state) => state.setTeams);

  const [filteredData, setFilteredData] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [snackBarMsg, setSnackBarMsg] = useState({message:null, status:"success"});
  const [dataReached, setDataReached] = useState(true); // to set or unset loading button of add teams
  // to fetch team data
  const getTeams = async () => {
    try {
      const res = await axios.get('team/getTeam');
      if (res.data && res.status === 200) {
        setTeams(res.data.data, false);

        setFilteredData(res.data.data.map((ele) => ({ _id: ele._id, name: ele.name })));
      }
    } catch (error) {
      // need action to valid errors
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    const data = team.teams.map((ele) => ({ _id: ele._id, name: ele.name }));
    setFilteredData(data);
  }, [team]);

  // for searching teams
  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = team.team.filter((team) => {
      // if no input the return the original
      if (lowerCase === '') {
        setFilteredData(team);
        return team;
      }
      // return the item which contains the user input
      return team.name ? team.name.toLowerCase().includes(lowerCase) : team.name;
    });
    setFilteredData(data);
  };

  // to delete team
  const handleDelete = async (id) => {
    // send request to delete
    try {
      const res = await axios.delete(`team/${id}`);
      if (res.data && res.status === 202) {
        const remainTeams = team.teams.filter((ele) => ele._id !== id);
        setTeams(remainTeams, false);
        setTeamId(null);
        setSnackBarMsg({message: "Team deleted", status:"success"});
      }
    } catch (error) {
      // console.log(error);
      setSnackBarMsg({message: "Can not delete Team", status:"error"});
    }
  };

  //   to sent request to add Teams
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTeamName !== '')
      try {
        setDataReached(false);
        const res = await axios.post('team/create', { name: newTeamName });
        console.log(res);
        setDataReached(true);
        if (res.data && res.status === 201) {
          setDataReached(true);
          setSnackBarMsg({message: "Team created successful", status:"success"});
          getTeams();
        }
      } catch (error) {
        // action when errot occurs
        setSnackBarMsg({message: "No able to create new Team", status:"error"});
      }
  };

  return (
    <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search component */}
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              onChange={handleSearch}
              label="Search Team"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FloatingForm toolTip="Add Team" color="primary" icon={<AddIcon />}>
              <TextField
                label="Add new Team"
                value={newTeamName}
                onChange={(e) => {
                  setNewTeamName(e.target.value);
                }}
                fullWidth
                sx={{ mt: 2 }}
              />
              <LoadingButton
                fullWidth
                loading={!dataReached}
                loadingPosition="end"
                variant="contained"
                sx={{ my: 1 }}
                onClick={handleSubmit}
              >
                Add Team
              </LoadingButton>
            </FloatingForm>
          </Grid>
        </Grid>

        {/* -------------------------------------------------------------TreeView component -------------------------------------------------------------------------------- */}
        {team.loader ? (
          <CircularProgress sx={listBoxLoader} />
        ) : (
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '1',
              alignItems: 'flex-start',
              overflowY: 'auto',
            }}
          >
            <TreeView
              aria-label="Clients Treeview"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {filteredData.length
                ? filteredData.map((team) => (
                    <TreeItem
                      onClick={() => setTeamId(team._id)}
                      nodeId={(team._id ? team._id : 1).toString()}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                          <Typography
                            sx={{
                              color: '#637381',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              flexGrow: 1,
                            }}
                          >
                            {team._id ? team.name : 'No Teams'}
                          </Typography>
                          <DeleteIcon onClick={() => handleDelete(team._id)} />
                        </Box>
                      }
                      key={team._id}
                    />
                  ))
                : 'No Teams'}
            </TreeView>
          </Box>
        )}
      </Paper>
      <IntergrationNotistack message={snackBarMsg.message} status={snackBarMsg.status}  />
    </Container>
  );
};

export default Sidebar;

/* <Autocomplete
                multiple
                disableCloseOnSelect
                limitTags={3}
                id="multiple-limit-tags"
                onChange={handleChange}
                options={userName}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="Users" placeholder="Users" />}
                sx={{ my: 2, minWidth: '250px' }}
              /> 
*/
