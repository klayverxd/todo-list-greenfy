import { Button, Container, Box, Typography } from '@mui/material';

import { HomePageProps } from '../types/HomePage';

const HomePage = ({ onLogout }: HomePageProps) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          ToDo List
        </Typography>

        <Button variant="contained" sx={{ mt: 3 }} onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
