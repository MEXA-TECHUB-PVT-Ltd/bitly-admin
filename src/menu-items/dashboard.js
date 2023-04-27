// assets
import { IconDashboard } from '@tabler/icons';
import GridViewIcon from '@mui/icons-material/GridView';
// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: GridViewIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
