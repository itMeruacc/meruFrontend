import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';

// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, Tooltip, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
// components
import Iconify from '../../components/Iconify';
//
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const navigate = useNavigate();

  const downloadApp = async () => {
    await axios
      .post('/download')
      .then((res) => {
        FileSaver.saveAs(new Blob([res.data], { type: 'application/x-msdownload' }), 'MeruScreenshotMonitor.exe');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />
        {/* <RouterLink to="/login" replace={True}> */}
        <Box sx={{ p: 2, pt: 1.5, color: 'black' }}>
          <Button fullWidth onClick={handleLogout} color="inherit" variant="outlined">
            logout
          </Button>
        </Box>

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Tooltip title="Download App">
            <IconButton
              href="https://meru-screenshots.s3.ap-south-1.amazonaws.com/app/meru-accounting-ssm+Setup+0.0.1.exe"
              size="large"
              color="default"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
