import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// mui
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

// components
import Page from '../components/Page';
import Main from '../components/SavedReports/Main';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function SavedReports() {
  const { id } = useParams();

  const [savedReports, setsavedReports] = React.useState(null);

  React.useEffect(() => {
    const options = {
      url: id,
    };
    axios.post('report/fetch', options).then((res) => {
      setsavedReports(res.data);
    });
  }, []);
  return (
    <RootStyle title="SavedReports">
      <Container sx={{ width: '70%', mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            scroll: 'auto',
          }}
        >
          <Main savedReports={savedReports} />
        </Box>
      </Container>
    </RootStyle>
  );
}
