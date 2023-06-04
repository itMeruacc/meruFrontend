import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Avatar, IconButton, Tooltip } from '@mui/material';

// mocks_
import account from '../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const ud = JSON.parse(localStorage.ud);

  const navigate = useNavigate();
  const anchorRef = useRef(null);

  return (
    <>
      <Tooltip title="Profile">
        <IconButton
          ref={anchorRef}
          onClick={() => navigate('/dashboard/profile')}
          // sx={{
          //   p: 0,
          // }}
        >
          <Avatar src={account.photoURL} alt="photoURL" />
        </IconButton>
      </Tooltip>
    </>
  );
}
