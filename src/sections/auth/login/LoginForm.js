import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Snackbar,
  Modal,
  Checkbox,
  TextField,
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Switch,
  Typography,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [open, setopen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  // snackbar
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    errors,
    dirty,
    isValid,
    touched,
    values,
    setErrors,
    // getFieldProps,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    axios
      .post('/login', data)
      .then((res) => {
        localStorage.setItem('Bearer Token', res.data.token);
        localStorage.setItem('ud', JSON.stringify(res.data.user));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        });
      });
  };

  // Forgot Password Call
  const forgot = async () => {
    // await axios
    //   .post('/forgot', {
    //     email: { ...getFieldProps('email') }.value,
    //   })
    //   .then((res) => {
    //     enqueueSnackbar(res.data.message, {
    //       variant: 'success',
    //     });
    //     handleClose();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     enqueueSnackbar(err.message, {
    //       variant: 'info',
    //     });
    //   });
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover" sx={{ cursor: 'pointer' }} onClick={() => setopen(true)}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </FormProvider>

      {/* forgot pass modal */}
      {/* <Modal
        open={open}
        onClose={() => setopen(false)}
        sx={{
          border: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: '#fff',
            borderRadius: 2,
            border: 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            '@media (max-width: 600px)': {
              maxWidth: '80%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'primary.lighter',
              p: 2,
            }}
          >
            <Typography variant="h4" color="primary">
              Enter Your Email
            </Typography>
            <IconButton onClick={() => setopen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <RHFTextField name="forgot-email" label="Email address" />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              bgcolor: 'grey.200',
              p: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                mr: 2,
              }}
              onClick={forgot}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setopen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
}
