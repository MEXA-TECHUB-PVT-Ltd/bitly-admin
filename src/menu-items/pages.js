// assets
import PeopleIcon from '@mui/icons-material/People';
// constant


// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'manage-user-page',
    type: 'group',
    children: [
        {
            id: 'manage-user-page',
            title: 'Manage Users',
            type: 'item',
            url: '/manage-user-page',
            icon: PeopleIcon,
            breadcrumbs: false
        }
    ]
};

export default pages;
