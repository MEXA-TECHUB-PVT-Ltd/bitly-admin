// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

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
            icon: icons.IconKey,
            breadcrumbs: false
        }
    ]
};

export default pages;
