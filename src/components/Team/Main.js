import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button, Container, Box, Checkbox, TextField, Autocomplete, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { teamData } from './seed';
import UserInfo from './UserInfo';
import useStore from '../../store/teamStore';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const Main = ({ teamId }) => {
  const [addMember, setAddMember] = useState(false);
  const [teamInfo, setTeamInfo] = useState([]);
  const [userName, setUserName] = useState([]);
  

  const teams = useStore( state => state.teams.teams);

  const handleChange = (event, newValue) => {
    // console.log(newValue)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await axios.patch("team/updateMember/", {teamId, employeeId: "needtoAllot"});
    setAddMember(false);

  };

  useEffect(() => {
    const filteredData = teams.filter((ele) => {
      return ele._id === teamId
    })
    setTeamInfo(...filteredData)
  }, [teamId])
  

  return (
    <Container disableGutters sx={{ py: 2 }}>
      <Box>
        <Container disableGutters>
          {addMember ? (
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags"
              onChange={handleChange}
              onBlur={handleSubmit}
              options={userName}
              disableCloseOnSelect
              size="medium"
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Users" placeholder="Users" />}
              sx={{ my: 2 }}
            />
          ) : (
            <Button variant="contained" onClick={() => setAddMember(true)}>
              Add Members
            </Button>
          )}
        </Container>

        {teamInfo.length !== 0 ?<Container disableGutters>
          {teamInfo.members.map((ele) => (
            <UserInfo userData={ele} key={ele._id} />
          ))}
        </Container> : <Typography>NO DATA IS PRESENT</Typography>}
      </Box>
    </Container>
  );
};

export default Main;
