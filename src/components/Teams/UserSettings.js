import React from 'react';

// mui
import { Link, Typography, Box } from '@mui/material';

// ------------------------------------------------------------

const settingsLabel = {
  ScreenShotPerHour: 'Screenshots per hour',
  AllowBlur: 'Allow blur',
  AppsAndUrlTracking: 'Apps and URL tracking',
  WeeklyTimeLimit: 'Weekly time limit',
  AutoPause: 'Auto pause tracking after',
  OfflineTime: 'Allow adding offline time',
  NotifyUser: 'Notify when screenshot is taken',
};

export default function UserSettings({ user }) {
  console.log(user);

  const formatSettingsValue = (setKey) => {
    const value = user.user.settings[setKey].isTeamSetting
      ? user.user.settings[setKey].teamValue
      : user.user.settings[setKey].individualValue;

    if (setKey === 'ScreenShotPerHour') return `${value} per hour`;
    if (setKey === 'AllowBlur') return value ? 'Allow' : "Don't allow";
    if (setKey === 'AppsAndUrlTracking') return value ? 'Track' : "Don't track";
    if (setKey === 'WeeklyTimeLimit') return value ? 'Do not limit' : `${value} per week`;
    if (setKey === 'AutoPause') return `${value} minutes`;
    if (setKey === 'OfflineTime') return value ? 'Allow' : "Don't allow";
    if (setKey === 'NotifyUser') return value ? 'Notify' : "Don't notify";
  };

  return (
    <Box sx={{ width: 420, pt: 2, fontSize: '20px' }}>
      <Typography variant="h4">Effective Settings</Typography>
      {Object.keys(settingsLabel).map((setKey, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'rows', justifyContent: 'space-between' }}>
          <Typography varihant="h6" sx={{ pr: 2, fontSize: '20px', color: 'success' }}>
            {settingsLabel[setKey]}
          </Typography>
          <Link
            underline="hover"
            href="/dashboard/setting"
            sx={{ pr: 1, cursor: 'pointer', justifyContent: 'flex-start' }}
          >
            {formatSettingsValue(setKey)}
          </Link>
        </Box>
      ))}
    </Box>
  );
}
