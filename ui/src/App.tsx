import { SyntheticEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Search } from './pages/Search';
import { Watchlist } from './pages/Watchlist';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#90caf9' },
        background: { default: '#121212', paper: '#1e1e1e' },
    },
});

function NavTabs() {
    const location = useLocation();
    const navigate = useNavigate();

    const tabIndex = location.pathname === '/watchlist' ? 1 : 0;

    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        if (newValue === 0) navigate('/');
        else if (newValue === 1) navigate('/watchlist');
    };

    return (
        <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
            aria-label="navigation tabs"
        >
            <Tab label="Search" icon={<SearchIcon />} iconPosition="start" />
            <Tab label="Watchlist" icon={<BookmarkIcon />} iconPosition="start" />
        </Tabs>
    );
}

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <AppBar position="sticky" elevation={4}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <MovieIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
                                    Movie Explorer
                                </Typography>
                            </Box>
                            <NavTabs />
                        </Toolbar>
                    </AppBar>
                    <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                        <Routes>
                            <Route path="/" element={<Search />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                        </Routes>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
