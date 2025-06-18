'use client';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import Typography from '@mui/material';
import { Link as MuiLink } from '@mui/material';
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        alert(`Welcome ${data.firstName} ${data.lastName}`);
        // You can save token: data.token
         router.push('/chat');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };


  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Log in</Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username *"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password *"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
            label="Remember me"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#0F2C59', '&:hover': { bgcolor: '#1B3C73' } }}>
            Log in
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2} >
  <MuiLink component={Link} href="/register" underline="hover">
    Register
  </MuiLink>
</Typography>
      </Paper>
    </Container>
  );
}
