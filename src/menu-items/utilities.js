// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'terms-page',
    type: 'group',
    children: [
        {
            id: 'terms-page',
            title: 'Terms and Conditions',
            type: 'item',
            url: '/terms-page',
            icon: FolderOpenIcon,
            breadcrumbs: false
        }
    ]
};

export default utilities;
