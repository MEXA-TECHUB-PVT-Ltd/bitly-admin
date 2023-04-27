// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import LockIcon from '@mui/icons-material/Lock';
// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'privacy-page',
            title: 'Privacy Policy',
            type: 'item',
            url: '/privacy-page',
            icon: LockIcon,
            breadcrumbs: false
        }
    ]
};

export default other;
