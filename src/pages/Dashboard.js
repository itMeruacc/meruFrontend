import axios from 'axios';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// mui
import {
  CircularProgress,
  Link,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import PageHeader from '../components/Dashboard/PageHeader';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import UserListHead from '../components/Dashboard/UserListHead';
import UserListToolbar from '../components/Dashboard/UserListToolbar';
// helpers
import secondsToHms from '../helpers/secondsToHms';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'today', label: 'Today', alignRight: false },
  { id: 'yesterday', label: 'Yesterday', alignRight: false },
  { id: 'weekly', label: 'Week', alignRight: false },
  { id: 'monthly', label: 'Month', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Dashboard() {
  const [loader, setloader] = useState(true);
  const [userList, setuserList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // fetch data
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get('/employee/dashboard/all')
      .then((res) => {
        setuserList(res.data.data);
        console.log(res.data.data);
        setloader(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
    return () => {
      source.cancel();
    };
  }, []);

  // sort
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const getStatus = (lastActive) => {
    const now = new Date().getTime();

    const seconds = Math.floor(now - lastActive) / 1000;

    let interval = seconds / 31536000;
    if (interval > 1) {
      // years
      return `Offline`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    return `Active now`;
  };

  function formatRole(role) {
    if (role === 'projectLeader') return 'Project Leader';
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  function getStatusColor(lastActive) {
    const now = new Date().getTime();
    const seconds = Math.floor(now - lastActive) / 1000;

    let interval = seconds / 86400;
    if (interval > 1) {
      return `error`;
    }

    interval = seconds / 60;
    if (interval > 1) {
      return `primary`;
    }
    return `success`;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Dashboard">
      <Container>
        <PageHeader title="Dashboard" />

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, name, role, lastActive, time, avatar } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ ml: 1, mr: -1 }} href={avatar} alt={name} />
                            <Typography sx={{ cursor: 'pointer' }} variant="subtitle2" noWrap>
                              <Link href={`/dashboard/timeline/${_id}`} underline="hover" color="inherit">
                                {name}
                              </Link>
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={getStatusColor(lastActive)}>
                            {getStatus(lastActive)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">{formatRole(role)}</TableCell>
                        <TableCell align="left">{secondsToHms(time?.today)}</TableCell>
                        <TableCell align="left">{secondsToHms(time?.yesterday)}</TableCell>
                        <TableCell align="left">{secondsToHms(time?.weekly)}</TableCell>
                        <TableCell align="left">{secondsToHms(time?.monthly)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        {loader ? <CircularProgress /> : <SearchNotFound searchQuery={filterName} />}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
