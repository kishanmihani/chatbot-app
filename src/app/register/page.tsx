'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import Image from 'next/image';

import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updates, setUpdates] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      alert('Registration successful!');
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          p: 5,
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} /> */}

          <InsertDriveFileIcon width={40} height={40}/>
        </Box>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          <TextField
            label="Full name"
            placeholder="Jon Snow"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            placeholder="your@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={updates}
                onChange={(e) => setUpdates(e.target.checked)}
              />
            }
            label="I want to receive updates via email."
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(to right, #141e30, #243b55)'
            }}
          >
            Sign up
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" mt={2} >
  <MuiLink component={Link} href="/login" underline="hover">
    login
  </MuiLink>
</Typography>
      </Paper>
    </Container>
  );
}
