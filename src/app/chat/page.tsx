'use client';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhoneIcon from '@mui/icons-material/Phone';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const users = [
  { name: 'Lilly', status: 'Always on holidays', avatar: '/avatar1.png' },
  { name: 'Zoe', status: 'Zoe: Great! Good luck with your ne...', avatar: '/avatar2.png' },
  { name: 'Joe', status: 'Sleeping', avatar: '/avatar3.png' },
  { name: 'Emily', status: 'Are you there?', avatar: '/avatar4.png', unread: true },
];

const sampleChat = [
  { from: 'them', text: 'Hi Zoe!' },
  { from: 'me', text: "Hi, what's up?" },
  { from: 'them', text: 'I am pleased to announce ... chat-ui-kit-react library' },
  { from: 'me', text: "That's great news!" },
  { from: 'me', text: 'You must be very excited' },
  { from: 'them', text: 'Yes I am :)' },
  { from: 'me', text: 'I am so proud of your team :)' },
  { from: 'me', text: 'Good luck with your new product!' },
  { from: 'them', text: 'Thank You :)' },
];

export default function Home() {
  const router = useRouter();
  const [messages, setMessages] = useState(sampleChat);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<{ username: string; firstName: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      router.push('/login'); // Redirect if not logged in
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'me', text: input }]);
    setInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box width="25%" bgcolor="#e9f1f7" p={1} overflow="auto">
        <InputBase placeholder="Search..." fullWidth sx={{ px: 2, py: 1, bgcolor: '#c8dff5', borderRadius: 2 }} />
        <List>
          {users.map((user, idx) => (
            <ListItem key={idx}>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.status} />
              {user.unread && (
                <Box component="span" bgcolor="red" borderRadius="50%" width={10} height={10} />
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Section */}
      <Box width="75%" display="flex" flexDirection="column">
        {/* Header */}
        <Box
          p={2}
          borderBottom="1px solid #ddd"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#f6fafd"
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.firstName || user?.username}
            </Typography>
            <Typography variant="caption">Online now</Typography>
          </Box>
          <Box>
            <IconButton><PhoneIcon /></IconButton>
            <IconButton><VideoCallIcon /></IconButton>
            <IconButton onClick={handleLogout} title="Logout">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg, idx) => (
            <Box key={idx} display="flex" justifyContent={msg.from === 'me' ? 'flex-end' : 'flex-start'} mb={1}>
              <Paper sx={{ p: 1, px: 2, bgcolor: msg.from === 'me' ? '#3399ff' : '#d7eaff', color: msg.from === 'me' ? 'white' : 'black', maxWidth: '70%' }}>
                {msg.text}
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input */}
        <Divider />
        <Box display="flex" p={1}>
          <InputBase
            placeholder="Type message here"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            sx={{ pl: 2 }}
          />
          <IconButton onClick={handleSend} color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
