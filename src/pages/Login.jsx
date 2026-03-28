import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Container, TextField, Typography, Paper
} from '@mui/material'

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true)
      navigate('/home')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">{error}</Typography>
          )}
          <Button variant="contained" onClick={handleLogin} fullWidth>
            Iniciar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login