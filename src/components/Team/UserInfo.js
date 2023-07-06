import React, { useState } from 'react';

import { Container, Typography, Paper, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const UserInfo = ({ userData }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Container disableGutters sx={{ border: '2px solid', my: 2 }}>
      <Container disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <Paper
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <KeyboardArrowDownIcon fontSize="large" /> : <KeyboardArrowRightIcon fontSize="large" />}
          <Typography variant="h3">{`${userData.firstName}  ${userData.lastName}`}</Typography>
        </Paper>
        <DeleteIcon fontSize="large" />
      </Container>
      {showDetails && (
        <Container>
          <Typography>Email : {userData.email}</Typography>
          {userData.role === 'manager' && (
            <Typography variant="h6">{userData.firstName} can create their team</Typography>
          )}
          {/* //////////////// PROJECT LISTS */}
          <Paper>
            <Typography variant="h3" sx={{ mt: 1, borderTop: ' 2px solid' }}>
              Projects
            </Typography>
            <Typography sx={{color:"blue", textDecorationLine:"underline"}}>{userData.projects.length ?"Remove all": "No projects"}</Typography>
            {userData.projects.map((ele) => (
              <Typography key={ele._id}><Switch defaultChecked onChange={() => {console.log(ele._id)}}/>{ele.name}</Typography>
            ))}
          </Paper>

          {/* /////////////////Settings Sections */}
          <Paper>
            <Typography variant="h3">Effective Settings </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Screen Shot Per Hour{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.ScreenShotPerHour.individualValue}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Allow Blur{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.AllowBlur.individualValue ? 'True' : 'False'}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Apps And Url Tracking{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.AppsAndUrlTracking.individualValue ? 'True' : 'False'}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Weekly Time Limit{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.WeeklyTimeLimit.individualValue}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Auto Pause{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.AutoPause.individualValue}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Offline Time{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.OfflineTime.individualValue ? 'True' : 'False'}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Notify User{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.NotifyUser.individualValue ? 'True' : 'False'}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Week Start{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.WeekStart.individualValue}
              </span>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              Currency Symbol{' '}
              <span style={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>
                {userData.settings.CurrencySymbol.individualValue}
              </span>
            </Typography>
          </Paper>
        </Container>
      )}
    </Container>
  );
};

export default UserInfo;
