'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Chatbot App
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
