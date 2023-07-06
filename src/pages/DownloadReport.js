import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
import ExportPdf from '../components/Reports/Export';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function DownloadReport() {
  const { id } = useParams();
  const [savedReports, setsavedReports] = React.useState(null);

  React.useEffect(() => {
    const options = {
      url: id,
    };
    axios.post('report/fetch', options).then((res) => {
      setsavedReports(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <RootStyle title="Download Reports">
      <Container sx={{ width: '70%', mt: 8 }}>
        <Box
        // sx={{
        //   height: "5rem",
        //   mt: 2,
        //   display: "flex",
        //   flexDirection: "row",
        //   scroll: "auto",
        // }}
        >
          <ExportPdf savedReports={savedReports} />
        </Box>
      </Container>
    </RootStyle>
  );
}
