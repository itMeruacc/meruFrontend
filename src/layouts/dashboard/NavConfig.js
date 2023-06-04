// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// ud from localStorage
let ud = {
  _id: 'moveto/404',
};
console.log(JSON.stringify(localStorage.ud));
if (localStorage.ud) {
  ud = JSON.parse(localStorage.ud);
}

// eslint-disable-next-line import/no-mutable-exports
let navConfig = [];

if (ud.role === 'employee')
  navConfig = [
    {
      title: 'timeline',
      path: `/dashboard/timeline/${ud._id}`,
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'dashboard',
      path: '/dashboard/dashboard',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'Reports',
      path: '/dashboard/reports',
      icon: getIcon('eva:lock-fill'),
    },
  ];
else
  navConfig = [
    {
      title: 'timeline',
      path: `/dashboard/timeline/${ud._id}`,
      icon: getIcon('eva:pie-chart-2-fill'),
    },
    {
      title: 'dashboard',
      path: '/dashboard/dashboard',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'Reports',
      path: '/dashboard/reports',
      icon: getIcon('eva:lock-fill'),
    },
    {
      title: 'Teams',
      path: '/dashboard/teams',
      icon: getIcon('eva:lock-fill'),
    },
    {
      title: 'clients',
      path: '/dashboard/clients',
      icon: getIcon('eva:people-fill'),
    },
    {
      title: 'Projects',
      path: '/dashboard/projects',
      icon: getIcon('eva:alert-triangle-fill'),
    },
    {
      title: 'settings',
      path: '/dashboard/setting',
      icon: getIcon('ant-design:setting-filled'),
    },
  ];

export default navConfig;
