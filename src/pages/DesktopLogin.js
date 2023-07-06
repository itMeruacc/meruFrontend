import axios from 'axios';
import { replace } from 'lodash';
import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

// components
import NotFound from './Page404';

export default function DesktopLogin() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loader, setloader] = React.useState(true);
  const [error, seterror] = React.useState(false);

  React.useEffect(() => {
    axios
      .post('desktopLogin', {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('Bearer Token', res.data.token);
          localStorage.setItem('ud', JSON.stringify(res.data.user));
          setloader(false);
          seterror(false);
          setTimeout(() => navigate('/dashboard/dashboard'), 1000);
          console.log(res.data);
        } else {
          navigate(`/404`, replace);
          setloader(false);
          seterror(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        navigate('/404', true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (loader) return <div>Loading</div>;
  if (error) return <NotFound />;

  return <Navigate to="/dashboard/dashboard" />;
}
