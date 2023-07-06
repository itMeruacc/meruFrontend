import * as React from 'react';

// mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// components
import Bar from '../SavedReports/BarChart';
import ProjectsCharts from '../SavedReports/ProjectsCharts';
import ClientsCharts from '../SavedReports/ClientsCharts';
import EmployeesCharts from '../SavedReports/EmployeesCharts';
import AppsCharts from '../SavedReports/AppsCharts';

// ----------------------------------------------------------------------------------

export default function ExportPdf({ savedReports }) {
  // variable for date, employees, and projects
  const [options, setOptions] = React.useState([]);
  const [totalPRate, settotalPRate] = React.useState(null);
  const [totalPData, settotalPData] = React.useState(null);
  const [totalHours, settotalHours] = React.useState(null);

  React.useEffect(() => {
    try {
      setOptions(savedReports?.data[0]);
      settotalHours(savedReports?.reports[0]?.total[0]?.totalHours);
      settotalPData(savedReports?.reports[0]?.total[0]?.avgPerformanceData);
      settotalPRate(savedReports?.reports[0]?.total[0]?.avgPayRate);

      // const doc = new jsPDF();
      // const pdfElement = document.getElementById("printPdf");
      // const html = htmlToPdfmake(pdfElement.innerHTML);
      // const documentDefinition = { content: html };
      // pdfMake.vfs = pdfFonts.pdfMake.vfs;
      // pdfMake.createPdf(documentDefinition).open();
      // html2pdf.from(pdfElement).save();
    } catch (err) {
      console.log(err);
    }
  }, [savedReports]);
  // tab panels value
  return (
    <div>
      {savedReports?.data[0] ? (
        <Box sx={{ width: '100%', scroll: 'visible' }}>
          {options?.user && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                heigth: '5rem',
                width: '100%',
                mb: 5,
              }}
            >
              <Button onClick={() => window.print()}>click me</Button>
              <Typography variant="h3" sx={{ color: 'color.primary' }}>
                {options.user.firstName} {options.user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h6">Name:</Typography>
                <Typography
                  varinat=""
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  {options.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h6">Date range:</Typography>
                <Typography
                  varinat=""
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  {options.options.dateOne ? `${options.options.dateOne}-` : 'Till '}
                  {options.options.dateTwo}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h6">Employees : </Typography>
                <Typography
                  varinat="h6"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  "asdfasdf"
                  {/* {options.options.userIds === []
                    ? options.options.userIds?.map((user, index) =>
                        index === lastIndexOf(options.options.userIds) - 1 ? ` ${user.name} .` : ` ${user.name} ,`
                      )
                    : 'All Employees'} */}
                  {/*  : options.options.userIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h6">Projects:</Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  {/* {options.options.projectIds === []
                    ? options.options.projectIds.map((user, index) =>
                        index === lastIndexOf(options.options.projectIds) - 1 ? ` ${user.name} .` : ` ${user.name} ,`
                      )
                    : 'All Projects'} */}
                  {/* : options.options.projectIds} */}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                <Typography variant="h6">Group by:</Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 1,
                    justifyContent: 'center',
                  }}
                >
                  {/* {options.options.groupBy === 'E'
                    ? 'Group by employee'
                    : options.options.groupBy === 'P'
                    ? 'Group by project'
                    : options.options.groupBy === 'C'
                    ? 'Group by clients '
                    : options.options.groupBy === 'A'
                    ? 'Group by apps&url'
                    : options.options.groupBy === 'D'
                    ? 'Group by details'
                    : ''} */}
                </Typography>
              </Box>
            </Box>
          )}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h3">Total hours : </Typography>
              <Typography
                variant="h3"
                sx={{
                  ml: 1,
                  display: 'flex',
                  opacity: 0.6,
                  textAlign: 'left',
                  alignItems: 'center',
                }}
              >
                {' '}
                {/* {secondsToHms(totalHours)} */}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h3">Activity level : </Typography>
              <Typography
                variant="h3"
                sx={{
                  ml: 1,
                  display: 'flex',
                  opacity: 0.6,
                  textAlign: 'left',
                  alignItems: 'center',
                }}
              >
                {Math.trunc(totalPData)} %
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h3">Money : </Typography>
              <Typography
                variant="h3"
                sx={{
                  ml: 1,
                  display: 'flex',
                  opacity: 0.6,
                  textAlign: 'left',
                  alignItems: 'center',
                }}
              >
                {Math.trunc((totalPRate * totalHours) / 3600)}
                <span>&#8377;</span>
              </Typography>
            </Box>
          </Box>

          <Bar
            reports={savedReports}
            date={[savedReports?.data[0].options.dateOne, savedReports?.data[0].options.dateTwo]}
            sx={{ mt: 5 }}
          />
          <ProjectsCharts reports={savedReports} sx={{ mt: 5 }} />
          <ClientsCharts reports={savedReports} sx={{ mt: 5 }} />
          <EmployeesCharts reports={savedReports} sx={{ mt: 5 }} />
          <AppsCharts reports={savedReports} sx={{ mt: 5 }} />
          <Box sx={{ mt: 6 }}>
            {/* {options?.options.groupBy === 'E' ? (
              <ByEp sx={{ height: 'auto' }} options={options} dowload={true} />
            ) : options?.options.groupBy === 'P' ? (
              <ByPr sx={{ height: 'auto' }} options={options} dowload={true} />
            ) : options?.options.groupBy === 'C' ? (
              <ByCl sx={{ height: 'auto' }} options={options} dowload={true} />
            ) : options?.options.groupBy === 'D' ? (
              <ByD sx={{ height: 'auto' }} options={options} dowload={true} />
            ) : options?.options.groupBy === 'A' ? (
              <ByAppUrl sx={{ height: 'auto' }} options={options} dowload />
            ) : (
              ''
            )} */}
          </Box>
        </Box>
      ) : null}
    </div>
  );
}
