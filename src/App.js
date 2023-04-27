import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import { GoogleOAuthProvider } from '@react-oauth/google';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <GoogleOAuthProvider clientId="737843085178-vbahjtbn1g6gre3dllk4kqs5rd3mr4rc.apps.googleusercontent.com"
        >

            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </GoogleOAuthProvider>
        // clientId="386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com">

    );
};

export default App;
